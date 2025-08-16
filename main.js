'use strict';

const { Plugin, MarkdownView, Setting, PluginSettingTab } = require('obsidian');

const DEFAULT_SETTINGS = {
    pairedGapWidth: 10,
    indentedGapWidth: 5,
    ribbonAction: 'format-arabic-poetry-paired'
};

class ArabicPoetryFormatter extends Plugin {
    ribbonIconEl = null;

    async onload() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        this.measurementCanvas = document.createElement('canvas');
        this.measurementContext = this.measurementCanvas.getContext('2d');

        this.addCommand({
            id: 'format-arabic-poetry-paired',
            name: 'Format Arabic Poetry (Paired)',
            editorCallback: (editor) => this.formatSelection(editor, 'paired')
        });

        this.addCommand({
            id: 'format-arabic-poetry-indented',
            name: 'Format Arabic Poetry (Indented)',
            editorCallback: (editor) => this.formatSelection(editor, 'indented')
        });

        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu, editor) => {
                menu.addItem((item) => {
                    item.setTitle('Format Arabic Poetry (Paired)')
                        .setIcon('pencil')
                        .onClick(() => this.formatSelection(editor, 'paired'));
                });
                menu.addItem((item) => {
                    item.setTitle('Format Arabic Poetry (Indented)')
                        .setIcon('pencil')
                        .onClick(() => this.formatSelection(editor, 'indented'));
                });
            })
        );

        this.updateRibbonIcon();

        this.addSettingTab(new PoetrySettingsTab(this.app, this));
    }

    formatSelection(editor, mode) {
        const selected = editor.getSelection();
        if (!selected) return;

        let result;
        if (mode === 'paired') {
            result = this.formatTextPaired(selected, this.settings.pairedGapWidth);
        } else {
            result = this.formatTextIndented(selected, this.settings.indentedGapWidth);
        }
        editor.replaceSelection(result);
    }

    performRibbonAction() {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;

        if (this.settings.ribbonAction === 'format-arabic-poetry-paired') {
            this.formatSelection(view.editor, 'paired');
        } else {
            this.formatSelection(view.editor, 'indented');
        }
    }

    updateRibbonIcon() {
        const isPaired = this.settings.ribbonAction === 'format-arabic-poetry-paired';
        const title = isPaired ? 'Format Arabic Poetry (Paired)' : 'Format Arabic Poetry (Indented)';

        if (!this.ribbonIconEl) {
            this.ribbonIconEl = this.addRibbonIcon('pencil', title, () => this.performRibbonAction());
        } else {
            this.ribbonIconEl.setAttribute('aria-label', title);
        }
    }

    estimateVisualWidth(text) {
        const withoutDiacritics = text.replace(/[\u064B-\u0652\u0670\u0640]/g, '');
        let width = 0;
        for (let i = 0; i < withoutDiacritics.length; i++) {
            const char = withoutDiacritics[i];
            const code = char.charCodeAt(0);
            if (code >= 0x0627 && code <= 0x06FF) {
                if ('مومنوهـوي'.includes(char)) { width += 1.2; }
                else { width += 1.0; }
            } else if ((code >= 0x0020 && code <= 0x007F) || (code >= 0x0030 && code <= 0x0039)) {
                width += 0.6;
            } else { width += 1.0; }
        }
        return Math.ceil(width);
    }

    formatTextPaired(text, gapWidth) {
        const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const pairs = [];
        for (let i = 0; i < rawLines.length; i += 2) {
            pairs.push([rawLines[i], rawLines[i + 1] || null]);
        }

        const maxLeftWidth = Math.max(...pairs.map(p => this.estimateVisualWidth(p[0] || '')));
        const maxRightWidth = Math.max(...pairs.map(p => this.estimateVisualWidth(p[1] || '')));

        const space = '\u00A0';
        return pairs.map(([left, right]) => {
            if (right) {
                const leftWidth = this.estimateVisualWidth(left);
                const leftPadding = Math.max(0, maxLeftWidth - leftWidth);
                return left + space.repeat(leftPadding + gapWidth) + right;
            } else {
                const leftWidth = this.estimateVisualWidth(left);
                const totalWidth = maxLeftWidth + gapWidth + maxRightWidth;
                const totalPadding = Math.max(0, totalWidth - leftWidth);
                const leftPad = Math.floor(totalPadding / 2);
                const rightPad = Math.ceil(totalPadding / 2);
                return space.repeat(leftPad) + left + space.repeat(rightPad);
            }
        }).join('\n');
    }

    formatTextIndented(text, gapWidth) {
        const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const result = [];
        for (let i = 0; i < rawLines.length; i += 2) {
            if (i + 1 < rawLines.length) {
                const left = rawLines[i];
                const right = rawLines[i + 1];
                const indentLength = left.length + gapWidth;
                const spacing = '\u00A0'.repeat(indentLength);
                result.push(left, spacing + right);
            } else {
                result.push(rawLines[i]);
            }
        }
        return result.join('\n');
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class PoetrySettingsTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h3', { text: 'Arabic Poetry Formatter Settings' });

        new Setting(containerEl)
            .setName('Ribbon icon action')
            .setDesc('Choose the default format to apply when clicking the ribbon icon in the left sidebar.')
            .addDropdown(dropdown => {
                dropdown
                    .addOption('format-arabic-poetry-paired', 'Format Paired')
                    .addOption('format-arabic-poetry-indented', 'Format Indented')
                    .setValue(this.plugin.settings.ribbonAction)
                    .onChange(async (value) => {
                        this.plugin.settings.ribbonAction = value;
                        await this.plugin.saveSettings();
                        this.plugin.updateRibbonIcon();
                    });
            });

        new Setting(containerEl)
            .setName('Paired format gap width')
            .setDesc('Controls the number of spaces in the center column for the "Paired" format.')
            .addSlider(slider => {
                slider.setLimits(2, 50, 1)
                    .setValue(this.plugin.settings.pairedGapWidth)
                    .onChange(async (val) => {
                        this.plugin.settings.pairedGapWidth = val;
                        await this.plugin.saveSettings();
                    });
                slider.setDynamicTooltip();
            });

        new Setting(containerEl)
            .setName('Indented format indent width')
            .setDesc('Controls the number of spaces used to indent the second hemistich in the "Indented" format.')
            .addSlider(slider => {
                slider.setLimits(0, 50, 1)
                    .setValue(this.plugin.settings.indentedGapWidth)
                    .onChange(async (val) => {
                        this.plugin.settings.indentedGapWidth = val;
                        await this.plugin.saveSettings();
                    });
                slider.setDynamicTooltip();
            });
    }
}

module.exports = ArabicPoetryFormatter;