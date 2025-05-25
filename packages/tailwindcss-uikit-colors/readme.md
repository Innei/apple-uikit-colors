# TailwindCSS UIKit Colors

A TailwindCSS plugin that adds iOS/macOS-style semantic colors with dark mode support.

## Installation

```bash
npm install tailwindcss-uikit-colors
```

## Usage

```ts
import { withUIKit } from 'tailwindcss-uikit-colors'
// or
import { withUIKit } from 'tailwindcss-uikit-colors/macos'

export default withUIKit({
  // your existing tailwind config
})
```

Then import the colors CSS in your `main.css`:

```css
@import 'tailwindcss-uikit-colors/selector.css'

/*
  or
  @import 'tailwindcss-uikit-colors/media.css'
*/
```

Or macOS:

```css
@import 'tailwindcss-uikit-colors/macos/selector.css'

/*
  or
  @import 'tailwindcss-uikit-colors/macos/media.css'
*/
```

## For Tailwind CSS v4

[Tailwind CSS v4](./TAILWIND_V4.md)

## Colors

The plugin adds the following colors to your TailwindCSS configuration:

```ts
// tailwind.config.js

colors: {
  ...configColors,
}
```

## License

2025 © Innei, Released under the MIT License.

> [Personal Website](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)