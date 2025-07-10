# Apple UIKit Colors

Accurate Apple UIKit color system for iOS and macOS with comprehensive platform support. This monorepo provides native Apple colors for TypeScript, React Native, and Tailwind CSS with automatic light/dark mode switching.

## 📦 Packages

| Package | Description | Platform Support |
|---------|-------------|-------------------|
| **[apple-uikit-colors](./packages/uikit-colors)** | Core UIKit colors in TypeScript | Universal |
| **[react-native-uikit-colors](./packages/react-native-uikit-colors)** | React Native bindings with NativeWind integration | iOS, Android, Web |
| **[tailwindcss-uikit-colors](./packages/tailwindcss-uikit-colors)** | Tailwind CSS plugin with v3 & v4 support | Web, React Native Web |

## ✨ Features

- 🎨 **Authentic Apple Colors** - Pixel-perfect iOS and macOS system colors
- 🌓 **Automatic Dark Mode** - Colors adapt to system theme preferences
- 🔄 **Cross-Platform** - Works on iOS, Android, Web, and React Native
- 🎯 **TypeScript Ready** - Full type safety and IntelliSense support
- ⚡ **Multiple Integration Options** - Hooks, CSS variables, Tailwind classes
- 🎪 **Tailwind CSS v3 & v4** - Support for both current and next-gen Tailwind

## 🚀 Quick Start

### For React Native Projects

```bash
npm install react-native-uikit-colors
```

```tsx
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

### For Tailwind CSS Projects

```bash
npm install tailwindcss-uikit-colors
```

```js
// tailwind.config.js
import { withUIKit } from 'tailwindcss-uikit-colors'

export default withUIKit({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // ... your config
})
```

```css
/* Import colors CSS */
@import 'tailwindcss-uikit-colors/selector.css';
```

```html
<div class="bg-system-background text-label">
  <h1 class="text-secondary-label">Hello World</h1>
</div>
```

### For TypeScript Projects

```bash
npm install apple-uikit-colors
```

```ts
import { lightPalette, darkPalette } from 'apple-uikit-colors'

const theme = {
  light: lightPalette,
  dark: darkPalette
}
```

## 🎨 Available Colors

### System Colors
- Background: `system-background`, `secondary-system-background`, `tertiary-system-background`
- Grouped: `system-grouped-background`, `secondary-system-grouped-background`, `tertiary-system-grouped-background`
- Labels: `label`, `secondary-label`, `tertiary-label`, `quaternary-label`
- Fills: `system-fill`, `secondary-system-fill`, `tertiary-system-fill`, `quaternary-system-fill`
- Separators: `separator`, `opaque-separator`, `non-opaque-separator`

### Semantic Colors
- Core: `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`
- Grays: `gray`, `gray2`, `gray3`, `gray4`, `gray5`, `gray6`
- Interactive: `link`, `placeholder-text`

### Platform-Specific Colors
- **iOS**: Complete iOS system color palette
- **macOS**: Extended macOS colors including vibrant fills, materials, and controls

## 🔧 Advanced Usage

### React Native with NativeWind

```tsx
import { withUIKit } from 'react-native-uikit-colors/tailwind'
import { useCurrentColorsVariants } from 'react-native-uikit-colors'

// Configure Tailwind
export default withUIKit({
  content: ['./src/**/*.{js,jsx,ts,tsx}']
})

// Use in components
function App() {
  const currentThemeColors = useCurrentColorsVariants()
  
  return (
    <View style={currentThemeColors} className="flex-1">
      <Text className="text-label text-lg">Native + Web</Text>
    </View>
  )
}
```

### Tailwind CSS v4

```css
/* Import v4 colors */
@import 'tailwindcss-uikit-colors/v4/ios.css';
/* or */
@import 'tailwindcss-uikit-colors/v4/macos.css';
```

### Dynamic Color Updates

```tsx
import { useColor, useColorScheme } from 'react-native-uikit-colors'

function ThemedComponent() {
  const { colorScheme } = useColorScheme()
  const backgroundColor = useColor('systemBackground')
  
  // Colors automatically update when system theme changes
  return (
    <View style={{ backgroundColor }}>
      <Text>Current theme: {colorScheme}</Text>
    </View>
  )
}
```

## 🏗️ Architecture

This monorepo uses a clean dependency hierarchy:

```
apple-uikit-colors (core)
├── react-native-uikit-colors (depends on core + tailwind)
└── tailwindcss-uikit-colors (depends on core)
```

Colors are stored as space-separated RGB values (`"255 59 48"`) for optimal compatibility with modern CSS color functions and alpha compositing.

## 📚 Documentation

- [React Native Package](./packages/react-native-uikit-colors/readme.md)
- [Tailwind CSS Package](./packages/tailwindcss-uikit-colors/readme.md)
- [Tailwind CSS v4 Guide](./packages/tailwindcss-uikit-colors/TAILWIND_V4.md)
- [API Reference](./docs/api.md)

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

2025 © Innei, Released under the MIT License.

> [Personal Website](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)
