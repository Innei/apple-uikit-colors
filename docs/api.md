# API Reference

This document provides comprehensive API documentation for all packages in the Apple UIKit Colors monorepo.

## apple-uikit-colors

Core TypeScript package providing Apple UIKit color definitions.

### Color Palettes

#### `lightPalette`
Light mode color palette with space-separated RGB values.

```typescript
export const lightPalette: {
  red: string        // '255 59 48'
  orange: string     // '255 149 0'
  yellow: string     // '255 204 0'
  green: string      // '52 199 89'
  mint: string       // '0 199 190'
  teal: string       // '48 176 190'
  cyan: string       // '50 173 200'
  blue: string       // '0 122 255'
  indigo: string     // '88 86 214'
  purple: string     // '175 82 222'
  pink: string       // '255 45 85'
  brown: string      // '162 132 94'
  gray: string       // '142 142 147'
  gray2: string      // '172 172 178'
  gray3: string      // '199 199 204'
  gray4: string      // '209 209 214'
  gray5: string      // '229 229 234'
  gray6: string      // '242 242 247'
}
```

#### `darkPalette`
Dark mode color palette with space-separated RGB values.

```typescript
export const darkPalette: {
  red: string        // '255 69 58'
  orange: string     // '255 175 113'
  yellow: string     // '255 214 10'
  green: string      // '48 209 88'
  mint: string       // '99 230 226'
  teal: string       // '64 200 244'
  cyan: string       // '100 210 255'
  blue: string       // '10 132 255'
  indigo: string     // '94 92 230'
  purple: string     // '191 90 242'
  pink: string       // '255 55 95'
  brown: string      // '172 142 104'
  gray: string       // '142 142 147'
  gray2: string      // '99 99 102'
  gray3: string      // '72 72 74'
  gray4: string      // '58 58 60'
  gray5: string      // '44 44 46'
  gray6: string      // '28 28 30'
}
```

### System Elements

#### `lightElements`
Light mode system UI element colors.

```typescript
export const lightElements: {
  placeholderText: string           // '199 199 204'
  separator: string                 // '84 84 86 / 0.34'
  opaqueSeparator: string          // '198 198 200'
  nonOpaqueSeparator: string       // '84 84 86 / 0.34'
  link: string                     // '0 122 255'
  
  // Backgrounds
  systemBackground: string              // '255 255 255'
  secondarySystemBackground: string     // '242 242 247'
  tertiarySystemBackground: string      // '255 255 255'
  
  // Grouped backgrounds
  systemGroupedBackground: string           // '242 242 247'
  secondarySystemGroupedBackground: string  // '255 255 255'
  tertiarySystemGroupedBackground: string   // '242 242 247'
  
  // Fills
  systemFill: string           // '120 120 128 / 0.2'
  secondarySystemFill: string  // '120 120 128 / 0.16'
  tertiarySystemFill: string   // '120 120 128 / 0.12'
  quaternarySystemFill: string // '120 120 128 / 0.08'
  
  // Text colors
  label: string           // '0 0 0'
  text: string            // '0 0 0'
  secondaryLabel: string  // '60 60 67 / 0.6'
  tertiaryLabel: string   // '60 60 67 / 0.3'
  quaternaryLabel: string // '60 60 67 / 0.18'
}
```

#### `darkElements`
Dark mode system UI element colors.

```typescript
export const darkElements: {
  placeholderText: string           // '122 122 122'
  separator: string                 // '84 84 86 / 0.6'
  opaqueSeparator: string          // '56 56 58'
  nonOpaqueSeparator: string       // '84 84 86 / 0.6'
  link: string                     // '10 132 255'
  
  // Backgrounds
  systemBackground: string              // '0 0 0'
  secondarySystemBackground: string     // '28 28 30'
  tertiarySystemBackground: string      // '44 44 46'
  
  // Grouped backgrounds
  systemGroupedBackground: string           // '0 0 0'
  secondarySystemGroupedBackground: string  // '28 28 30'
  tertiarySystemGroupedBackground: string   // '44 44 46'
  
  // Fills
  systemFill: string           // '120 120 128 / 0.36'
  secondarySystemFill: string  // '120 120 128 / 0.32'
  tertiarySystemFill: string   // '120 120 128 / 0.24'
  quaternarySystemFill: string // '120 120 128 / 0.19'
  
  // Text colors
  label: string           // '255 255 255'
  text: string            // '255 255 255'
  secondaryLabel: string  // '235 235 245 / 0.6'
  tertiaryLabel: string   // '235 235 245 / 0.3'
  quaternaryLabel: string // '235 235 245 / 0.18'
}
```

---

## react-native-uikit-colors

React Native package with hooks and utilities for using Apple UIKit colors.

### Types

#### `Colors`
Type definition for all available color keys.

```typescript
type Colors = typeof mergedLightColors
```

### Hooks

#### `useColor(color: keyof Colors) => string`
Returns the current color value as an RGBA string based on the system color scheme.

```typescript
import { useColor } from 'react-native-uikit-colors'

function MyComponent() {
  const backgroundColor = useColor('systemBackground')
  const textColor = useColor('label')
  
  return (
    <View style={{ backgroundColor }}>
      <Text style={{ color: textColor }}>Hello World</Text>
    </View>
  )
}
```

#### `useColors() => Record<keyof Colors, string>`
Returns all colors as RGBA strings for the current color scheme.

```typescript
import { useColors } from 'react-native-uikit-colors'

function MyComponent() {
  const colors = useColors()
  
  return (
    <View style={{ backgroundColor: colors.systemBackground }}>
      <Text style={{ color: colors.label }}>Hello World</Text>
    </View>
  )
}
```

#### `useColorsVariants() => Record<keyof Colors, string>`
Returns all colors as space-separated RGB values for the current color scheme.

```typescript
import { useColorsVariants } from 'react-native-uikit-colors'

function MyComponent() {
  const colorVariants = useColorsVariants()
  
  // Returns: { systemBackground: '255 255 255', label: '0 0 0', ... }
  return <View>{/* ... */}</View>
}
```

#### `useCurrentColorsVariants() => StyleProp<ViewStyle>`
Returns CSS variables for the current color scheme, optimized for NativeWind.

```typescript
import { useCurrentColorsVariants } from 'react-native-uikit-colors'

function App() {
  const currentThemeColors = useCurrentColorsVariants()
  
  return (
    <View style={currentThemeColors} className="flex-1">
      <Text className="text-label">Styled with NativeWind</Text>
    </View>
  )
}
```

### Utilities

#### `getColor(color: keyof Colors) => string`
Synchronously gets a color value as RGBA string for the current system theme.

```typescript
import { getColor } from 'react-native-uikit-colors'

const backgroundColor = getColor('systemBackground')
// Returns: 'rgba(255, 255, 255, 1)' in light mode
```

#### `getSystemBackgroundColor() => string`
Convenience function that returns the system background color.

```typescript
import { getSystemBackgroundColor } from 'react-native-uikit-colors'

const bgColor = getSystemBackgroundColor()
```

#### `getCurrentColors() => StyleProp<ViewStyle>`
Synchronously gets all color CSS variables for the current system theme.

```typescript
import { getCurrentColors } from 'react-native-uikit-colors'

const currentColors = getCurrentColors()
// Returns style object with CSS variables
```

#### `rgbStringToRgb(input: string) => string`
Converts space-separated RGB values to RGBA string format.

```typescript
import { rgbStringToRgb } from 'react-native-uikit-colors'

const rgba = rgbStringToRgb('255 59 48')
// Returns: 'rgba(255, 59, 48, 1)'

const rgbaWithAlpha = rgbStringToRgb('255 59 48 / 0.5')
// Returns: 'rgba(255, 59, 48, 0.5)'
```

### Web Support

#### `useCSSInjection()`
React hook that injects CSS variables for web platforms. Use with 'use dom' directive.

```typescript
'use dom'

import { useCSSInjection } from 'react-native-uikit-colors/web'

function App() {
  useCSSInjection()
  return <YourApp />
}
```

---

## tailwindcss-uikit-colors

Tailwind CSS plugin that adds Apple UIKit colors to your Tailwind configuration.

### Plugin Functions

#### `withUIKit(config: Config) => Config`
Extends a Tailwind CSS configuration with Apple UIKit colors.

```typescript
import { withUIKit } from 'tailwindcss-uikit-colors'
import type { Config } from 'tailwindcss'

export default withUIKit({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Your custom theme extensions
    }
  }
} satisfies Config)
```

#### `colors`
Exported color configuration object for manual integration.

```typescript
import { colors } from 'tailwindcss-uikit-colors'

export default {
  theme: {
    extend: {
      colors: {
        ...colors,
        // Your custom colors
      }
    }
  }
}
```

### Available CSS Classes

The plugin adds the following color classes to Tailwind:

#### Background Colors
- `bg-system-background`
- `bg-secondary-system-background`
- `bg-tertiary-system-background`
- `bg-system-grouped-background`
- `bg-secondary-system-grouped-background`
- `bg-tertiary-system-grouped-background`

#### Text Colors
- `text-label`
- `text-secondary-label`
- `text-tertiary-label`
- `text-quaternary-label`

#### Semantic Colors
- `bg-red`, `text-red`, `border-red`
- `bg-orange`, `text-orange`, `border-orange`
- `bg-yellow`, `text-yellow`, `border-yellow`
- `bg-green`, `text-green`, `border-green`
- `bg-mint`, `text-mint`, `border-mint`
- `bg-teal`, `text-teal`, `border-teal`
- `bg-cyan`, `text-cyan`, `border-cyan`
- `bg-blue`, `text-blue`, `border-blue`
- `bg-indigo`, `text-indigo`, `border-indigo`
- `bg-purple`, `text-purple`, `border-purple`
- `bg-pink`, `text-pink`, `border-pink`
- `bg-brown`, `text-brown`, `border-brown`

#### Gray Scale
- `bg-gray`, `text-gray`, `border-gray`
- `bg-gray2`, `text-gray2`, `border-gray2`
- `bg-gray3`, `text-gray3`, `border-gray3`
- `bg-gray4`, `text-gray4`, `border-gray4`
- `bg-gray5`, `text-gray5`, `border-gray5`
- `bg-gray6`, `text-gray6`, `border-gray6`

#### Fill Colors
- `bg-system-fill`
- `bg-secondary-system-fill`
- `bg-tertiary-system-fill`
- `bg-quaternary-system-fill`

#### Separator Colors
- `bg-separator`
- `bg-opaque-separator`
- `bg-non-opaque-separator`

#### Interactive Colors
- `text-link`
- `text-placeholder-text`

### Dark Mode Support

All colors automatically switch between light and dark variants based on:
- System preference (`@media (prefers-color-scheme: dark)`)
- Manual dark mode (`[data-theme="dark"]`)

### Explicit Light/Dark Variants

For explicit control, use the light/dark suffixed classes:
- `bg-red-light` / `bg-red-dark`
- `text-label-light` / `text-label-dark`
- `bg-system-background-light` / `bg-system-background-dark`

### Tailwind CSS v4 Support

Import CSS files directly for Tailwind v4:

```css
@import 'tailwindcss-uikit-colors/v4/ios.css';
@import 'tailwindcss-uikit-colors/v4/macos.css';
```

---

## Color Value Format

All colors are stored as space-separated RGB values (e.g., `"255 59 48"`) to support modern CSS color functions and alpha compositing:

```css
/* CSS Variables */
--color-red: 255 59 48;

/* Usage with alpha */
background-color: rgb(var(--color-red) / 0.5);
background-color: rgba(var(--color-red), 0.5);
```

This format provides maximum flexibility for alpha compositing while maintaining compatibility with both CSS and React Native styling systems.