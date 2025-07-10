# Architecture Documentation

This document provides an in-depth look at the architecture and design decisions behind the Apple UIKit Colors monorepo.

## Overview

The Apple UIKit Colors monorepo is designed as a layered architecture that provides Apple's native color system across multiple platforms while maintaining consistency and type safety.

## Design Principles

### 1. **Single Source of Truth**
All color definitions originate from the core `apple-uikit-colors` package, ensuring consistency across all implementations.

### 2. **Platform Agnostic Core**
The core color definitions are platform-neutral, using space-separated RGB values that work across CSS, React Native, and other platforms.

### 3. **Progressive Enhancement**
Each package builds upon the core, adding platform-specific functionality without breaking the base contract.

### 4. **Zero Runtime Dependencies**
The core package has no runtime dependencies, making it lightweight and universally compatible.

### 5. **TypeScript First**
Full TypeScript support with comprehensive type definitions for all color keys and values.

## Package Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Monorepo Structure                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                apple-uikit-colors                       │ │
│  │                   (Core Package)                        │ │
│  │                                                         │ │
│  │  • Light/Dark Palettes                                 │ │
│  │  • System Element Colors                               │ │
│  │  • Platform-Neutral RGB Values                         │ │
│  │  • TypeScript Definitions                              │ │
│  └─────────────────────────────────────────────────────────┘ │
│                            │                                │
│                            │                                │
│    ┌───────────────────────┼───────────────────────────────┐ │
│    │                       │                               │ │
│    │                       │                               │ │
│    ▼                       ▼                               │ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │             tailwindcss-uikit-colors                    │ │
│  │                                                         │ │
│  │  • Tailwind Plugin (v3)                                │ │
│  │  • CSS Variables Generation                             │ │
│  │  • v4 CSS Files                                         │ │
│  │  • Dark Mode Support                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                            │                                │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            react-native-uikit-colors                    │ │
│  │                                                         │ │
│  │  • React Native Hooks                                  │ │
│  │  • NativeWind Integration                               │ │
│  │  • Web Support                                          │ │
│  │  • Platform Detection                                   │ │
│  │  • Dynamic Color Updates                                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Core Package Design

### Color Value Format

Colors are stored as space-separated RGB values for maximum compatibility:

```typescript
// Example format
const red = "255 59 48"  // light mode
const red = "255 69 58"  // dark mode
```

**Why this format?**
- Works with modern CSS `rgb()` function
- Supports alpha composition: `rgb(255 59 48 / 0.5)`
- Compatible with React Native's color system
- Minimal parsing overhead

### Color Categories

#### 1. **Palette Colors**
Base semantic colors that match Apple's design system:
- Primary colors: red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown
- Grayscale: gray, gray2, gray3, gray4, gray5, gray6

#### 2. **Element Colors**
System UI element colors that provide semantic meaning:
- Backgrounds: systemBackground, secondarySystemBackground, etc.
- Labels: label, secondaryLabel, tertiaryLabel, quaternaryLabel
- Fills: systemFill, secondarySystemFill, etc.
- Separators: separator, opaqueSeparator, nonOpaqueSeparator

### Build System

The core package uses `tsdown` for building, which provides:
- CommonJS and ESM output
- TypeScript declaration files
- Tree-shakeable exports
- Minimal bundle size

## React Native Package Architecture

### Platform Detection

The package automatically detects the platform and provides appropriate implementations:

```typescript
// Platform detection
const IS_DOM = typeof ReactNativeWebView !== 'undefined'

// Platform-specific CSS variable handling
const buildVars = (vars: Record<string, string>) => {
  const cssVars = {} as Record<string, string>
  for (const [key, value] of Object.entries(vars)) {
    cssVars[`--color-${key}`] = value
  }
  return IS_DOM ? cssVars : vars(cssVars)
}
```

### Hook System

The package provides multiple hooks for different use cases:

1. **`useColor`** - Single color with automatic theme switching
2. **`useColors`** - All colors as RGBA strings
3. **`useColorsVariants`** - All colors as RGB values
4. **`useCurrentColorsVariants`** - CSS variables for NativeWind

### Color Conversion Pipeline

```typescript
// RGB string → RGBA conversion
"255 59 48" → "rgba(255, 59, 48, 1)"
"255 59 48 / 0.5" → "rgba(255, 59, 48, 0.5)"
```

### Web Integration

For React Native Web, the package provides:
- CSS injection hooks
- DOM-specific optimizations
- Web-compatible color formats

## Tailwind CSS Package Architecture

### Dual Version Support

The package supports both Tailwind CSS v3 and v4:

#### Tailwind v3 (Plugin-based)
```typescript
// Plugin architecture
export const withUIKit = (config: Config) => {
  config.theme.extend.colors = {
    ...config.theme.extend.colors,
    ...configColors,
  }
  return config
}
```

#### Tailwind v4 (CSS-based)
```css
/* CSS variable approach */
@theme inline {
  --color-red: 255 59 48;
  --color-system-background: 255 255 255;
}
```

### Dark Mode Strategies

The package provides multiple dark mode strategies:

1. **Media Query Based**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-system-background: 0 0 0;
  }
}
```

2. **Data Attribute Based**
```css
[data-theme="dark"] {
  --color-system-background: 0 0 0;
}
```

3. **Class Based**
```css
.dark {
  --color-system-background: 0 0 0;
}
```

### Color Generation Pipeline

```typescript
// Build-time color generation
lightPalette → CSS Variables → Tailwind Classes
darkPalette → CSS Variables → Tailwind Classes
```

## Build System Architecture

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - packages/*
```

### Build Order

The build system ensures correct dependency order:
1. `apple-uikit-colors` (core)
2. `tailwindcss-uikit-colors` (depends on core)
3. `react-native-uikit-colors` (depends on core + tailwind)

### Build Tools

- **tsdown**: Fast TypeScript bundler for core and React Native packages
- **tsx**: TypeScript execution for Tailwind CSS build scripts
- **pnpm**: Package manager with workspace support

## Type System Architecture

### Core Types

```typescript
// Color key types
type PaletteColor = keyof typeof lightPalette
type ElementColor = keyof typeof lightElements
type ColorKey = PaletteColor | ElementColor

// Color value types
type RGBString = string  // "255 59 48"
type RGBAString = string // "rgba(255, 59, 48, 1)"
```

### Type Safety

- All color keys are type-safe
- IDE autocompletion for all color names
- Compile-time validation of color usage

## Performance Considerations

### Bundle Size Optimization

1. **Tree Shaking**: Only used colors are bundled
2. **Minimal Runtime**: No heavy dependencies
3. **Code Splitting**: Platform-specific code is separated

### Runtime Performance

1. **Memoization**: Color values are memoized in React hooks
2. **Lazy Loading**: Platform detection is done once
3. **Efficient Updates**: Only re-render when color scheme changes

### Memory Management

- Colors are cached after first access
- Unused colors are garbage collected
- CSS variables are shared across components

## Extensibility

### Adding New Colors

To add new colors, modify the core package:

```typescript
// In apple-uikit-colors/index.ts
export const lightPalette = {
  // existing colors...
  newColor: '128 128 128',
}

export const darkPalette = {
  // existing colors...
  newColor: '160 160 160',
}
```

### Platform-Specific Extensions

Each platform package can extend the core with platform-specific utilities:

```typescript
// Platform-specific color utilities
export const getPlatformColor = (color: ColorKey) => {
  // Platform-specific logic
}
```

### Custom Build Targets

The build system can be extended to support additional platforms:

```typescript
// Custom build script
import { lightPalette, darkPalette } from 'apple-uikit-colors'

// Generate platform-specific format
const flutterColors = generateFlutterColors(lightPalette, darkPalette)
```

## Testing Architecture

### Unit Testing

Each package includes comprehensive unit tests:
- Color value validation
- Type checking
- Platform compatibility
- Build output verification

### Integration Testing

Cross-package integration tests ensure:
- Dependency resolution works correctly
- Color values are consistent across packages
- Build system produces correct outputs

### Visual Testing

Color accuracy is verified through:
- Pixel-perfect comparisons with Apple's design system
- Cross-platform color consistency checks
- Dark mode transition validation

## Deployment Architecture

### NPM Publishing

Each package is published independently:
- Semantic versioning
- Automated changelog generation
- Cross-package version synchronization

### CI/CD Pipeline

1. **Build Phase**: All packages built and tested
2. **Test Phase**: Unit and integration tests
3. **Publish Phase**: Automated NPM publishing
4. **Documentation**: API docs generated and deployed

This architecture ensures maintainability, scalability, and consistency across all supported platforms while providing developers with a seamless experience using Apple's native color system.