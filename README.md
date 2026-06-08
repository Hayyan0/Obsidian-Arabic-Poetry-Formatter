# Arabic Poetry Formatter

An Obsidian plugin that formats selected Arabic poetry into two classic layouts. It provides fine-grained control over spacing and alignment so verses remain readable in your notes.

## Features

- **Two formatting modes**:
  1. **Paired format**: Aligns the two hemistiches (*shatr*) of a verse (*bayt*) on a single line, separated by a visually balanced central gap.
  2. **Indented format**: Places the second hemistich on a new line, indented to align with the end of the first.

- **Smart alignment**: Uses a combination of character counting and visual width estimation to create clean alignment for proportional Arabic fonts.

- **Full customization**:
  - Independently set the gap width for paired and indented modes.
  - Choose a default action for the ribbon icon to match your preferred workflow.

- **Multiple ways to use**: Access the formatters through the command palette, the right-click context menu, or the customizable ribbon icon.

## How to use

1. **Select text**: In the editor, highlight the lines of Arabic poetry you want to format. The plugin expects each hemistich to be on its own line.

2. **Choose a formatter**:
   - **Command palette**: Press `Ctrl/Cmd + P` and search for `Format Arabic poetry (paired)` or `Format Arabic poetry (indented)`.
   - **Right-click menu**: Right-click on your selected text and choose the desired format from the context menu.
   - **Ribbon icon**: Click the pencil icon in the left sidebar to apply your configured default format.

### Example

**Original text:**

```
واحر قلباه ممن قلبه شبم
ومن بجسمي وحالي عنده سقم
مالي أكتم حبا قد برى جسدي
وتدعي حب سيف الدولة الأمم
```

**Paired format output:**

```
واحر قلباه ممن قلبه شبم          ومن بجسمي وحالي عنده سقم
مالي أكتم حبا قد برى جسدي       وتدعي حب سيف الدولة الأمم
```

**Indented format output:**

```
واحر قلباه ممن قلبه شبم
                         ومن بجسمي وحالي عنده سقم
مالي أكتم حبا قد برى جسدي
                            وتدعي حب سيف الدولة الأمم
```

## Configuration

You can customize the plugin's behavior by going to **Settings -> Community plugins -> Arabic Poetry Formatter**.

- **Ribbon icon action**: Use the dropdown to select which action (`Format paired` or `Format indented`) is performed when you click the ribbon icon.
- **Paired format gap width**: Use the slider to control the size of the central gap between hemistiches in the paired format.
- **Indented format indent width**: Use the slider to control the number of extra spaces used to indent the second hemistich in the indented format.

## Privacy

Arabic Poetry Formatter works entirely inside Obsidian. It does not use the network, collect telemetry, show ads, require accounts or payments, or access files outside your vault.

## Installation

1. Install the plugin via the Obsidian community plugins browser.
2. Enable the plugin in your settings.
3. Configure the settings if you want to change the default format or spacing.

## License

This plugin is released under the MIT License. See the `LICENSE` file for more details.
