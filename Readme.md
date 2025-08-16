# Arabic Poetry Formatter for Obsidian

An Obsidian plugin to intelligently format Arabic poetry into two distinct, classic styles. It provides fine-grained control over spacing and alignment to make your notes beautiful and readable.

## Features

- **Two Formatting Modes**:
  1. **Paired Format**: Aligns the two hemistiches (*shatr*) of a verse (*bayt*) on a single line, separated by a visually balanced central gap.
  2. **Indented Format**: Places the second hemistich on a new line, indented to align perfectly with the end of the first.

- **Smart Alignment**: Uses a combination of character counting and visual width estimation to create clean, professional-looking alignment for proportional Arabic fonts.

- **Full Customization**:
  - Independently set the gap width for both "Paired" and "Indented" modes.
  - Choose a default action for the ribbon (left sidebar) icon to match your preferred workflow.

- **Multiple Ways to Use**: Access the formatters via the Command Palette, the right-click context menu, or the customizable ribbon icon.

## How to Use

1. **Select Text**: In the Obsidian editor, highlight the lines of Arabic poetry you want to format. The plugin expects each hemistich to be on its own line.

2. **Choose a Formatter**:
   - **Via Command Palette**: Press `Ctrl/Cmd + P` and search for `Format Arabic Poetry (Paired)` or `Format Arabic Poetry (Indented)`.
   - **Via Right-Click Menu**: Right-click on your selected text and choose the desired format from the context menu.
   - **Via Ribbon Icon**: Click the "pencil" icon in the left sidebar to apply your pre-configured default format.

### Example

**Original Text:**
```
واحرَّ قَلباهُ مِمَّن قَلبُهُ شَبِمُ
وَمَن بِجِسمي وَحالي عِندَهُ سَقَمُ
مالي أكَتِّمُ حُبّاً قَد بَرى جَسَدي
وتَدَّعي حبَّ سيفِ الدَولَةِ الأمَمُ
```

**Paired Format Output:**
```
واحرَّ قَلباهُ مِمَّن قَلبُهُ شَبِمُ          وَمَن بِجِسمي وَحالي عِندَهُ سَقَمُ
مالي أكَتِّمُ حُبّاً قَد بَرى جَسَدي          وتَدَّعي حبَّ سيفِ الدَولَةِ الأمَمُ
```

**Indented Format Output:**
```
واحرَّ قَلباهُ مِمَّن قَلبُهُ شَبِمُ
          وَمَن بِجِسمي وَحالي عِندَهُ سَقَمُ
مالي أكَتِّمُ حُبّاً قَد بَرى جَسَدي
          وتَدَّعي حبَّ سيفِ الدَولَةِ الأمَمُ
```

## Configuration

You can customize the plugin's behavior by going to **Settings -> Community Plugins -> Arabic Poetry Formatter**.

- **Ribbon icon action**: Use the dropdown to select which action (`Format Paired` or `Format Indented`) is performed when you click the ribbon icon.
- **Paired format gap width**: Use the slider to control the size of the central gap between hemistiches in the Paired format.
- **Indented format indent width**: Use the slider to control the number of extra spaces used to indent the second hemistich in the Indented format.

## Installation

1. Install the plugin via the Obsidian **Community Plugins** browser.
2. Enable the plugin in your settings.
3. (Optional) Configure the settings to your liking.

## License

This plugin is released under the MIT License. See the `LICENSE` file for more details.