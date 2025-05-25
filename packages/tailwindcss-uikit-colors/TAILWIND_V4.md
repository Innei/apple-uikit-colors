# Tailwind CSS v4 UIKit Colors

This package now supports Tailwind CSS v4 with the new `@theme inline` syntax. The v4 CSS files use selector-based dark mode switching with CSS variables.

## Usage

1. Install the package:

```bash
npm install tailwindcss-uikit-colors
```

2. Import the CSS file in your main CSS file:

iOS Colors:

```css
@import 'tailwindcss-uikit-colors/v4/ios.css';
```

macOS Colors:

```css
@import 'tailwindcss-uikit-colors/v4/macos.css';
```

3. Use the colors in your HTML:

```html
<div class="bg-red text-system-background">Hello World</div>
```

## Dark Mode Support

The package supports both automatic and manual dark mode switching:

### Automatic (Media Query)

Colors automatically switch based on system preference using `@media (prefers-color-scheme: dark)`.

### Manual (Data Attribute)

You can manually control dark mode by adding `data-theme="dark"` to your HTML:

```html
<html data-theme="dark">
  <!-- Dark mode colors will be applied -->
</html>
```

### Custom Variants

The package also includes custom variants for explicit light/dark usage:

```html
<div class="bg-red light:bg-red-light dark:bg-red-dark">
  Explicit light/dark colors
</div>
```

## Available Colors

The package includes all Apple UIKit colors with automatic kebab-case conversion:

### Palette Colors

- `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`
- `gray`, `gray2`, `gray3`, `gray4`, `gray5`, `gray6`

### System Colors

- `system-background`, `secondary-system-background`, `tertiary-system-background`
- `system-grouped-background`, `secondary-system-grouped-background`, `tertiary-system-grouped-background`
- `label`, `secondary-label`, `tertiary-label`, `quaternary-label`
- `text`, `text-secondary`, `text-tertiary`, `text-quaternary`, `text-quinary`
- `system-fill`, `secondary-system-fill`, `tertiary-system-fill`, `quaternary-system-fill`
- `separator`, `opaque-separator`, `non-opaque-separator`
- `link`, `placeholder-text`

### macOS Specific Colors (in combined.css)

- `fill`, `fill-secondary`, `fill-tertiary`, `fill-quaternary`, `fill-quinary`
- `fill-vibrant`, `fill-vibrant-secondary`, `fill-vibrant-tertiary`, `fill-vibrant-quaternary`, `fill-vibrant-quinary`
- `text-vibrant`, `text-vibrant-secondary`, `text-vibrant-tertiary`, `text-vibrant-quaternary`, `text-vibrant-quinary`
- `material-*` colors for blur effects
- `control-*` colors for UI controls
- `selection-*` colors for selections

### Light/Dark Variants

Each color also has explicit light and dark variants:

- `red-light`, `red-dark`
- `system-background-light`, `system-background-dark`
- etc.
