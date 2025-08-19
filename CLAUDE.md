# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing Apple UIKit color libraries for multiple platforms and frameworks. The repository provides accurate Apple UIKit colors for iOS and macOS in TypeScript, React Native, and Tailwind CSS formats.

## Repository Structure

This is a pnpm workspace with three main packages:

- `packages/uikit-colors` - Core Apple UIKit colors in TypeScript (published as `apple-uikit-colors`)
- `packages/react-native-uikit-colors` - React Native bindings with NativeWind support  
- `packages/tailwindcss-uikit-colors` - Tailwind CSS plugin with v3 and v4 support

## Build System

The repository uses pnpm workspaces with TypeScript and tsdown for building:

### Core Commands
- `pnpm build` - Builds all packages in dependency order
- `pnpm --filter=<package-name> run build` - Build specific package
- `pnpm bump` - Version bump using nbump

### Individual Package Commands
- `packages/uikit-colors`: `tsdown` for building
- `packages/react-native-uikit-colors`: `tsdown` for building  
- `packages/tailwindcss-uikit-colors`: Multiple build commands:
  - `tsx build.ts` - Main build
  - `tsx build-css.ts` - CSS generation
  - `tsx build-tailwind4-css.ts` - Tailwind v4 CSS
  - `tsx generate-tailwind-config.ts` - Config generation

## Architecture

### Color System Design
- **Core colors**: Light and dark palettes with RGB values (space-separated format)
- **System colors**: UI element colors (backgrounds, labels, separators, etc.)
- **Adaptive colors**: Automatically switch between light/dark based on system preference
- **Platform variants**: iOS and macOS specific color implementations

### Package Dependencies
- `react-native-uikit-colors` depends on both `apple-uikit-colors` and `tailwindcss-uikit-colors`
- `tailwindcss-uikit-colors` depends on `apple-uikit-colors`
- All packages use workspace references (`workspace:*`)

### Color Value Format
Colors are stored as space-separated RGB values (e.g., `"255 59 48"`) to work with modern CSS color functions and alpha compositing.

## Tailwind CSS Integration

The project supports both Tailwind CSS v3 and v4:

### v3 Integration
- Plugin-based approach with `withUIKit()` function
- CSS variables with `rgb()` and `rgba()` functions
- Automatic dark mode via media queries and data attributes

### v4 Integration  
- CSS imports: `@import 'tailwindcss-uikit-colors/v4/ios.css'`
- New `@theme inline` syntax
- Selector-based dark mode switching

## React Native Integration

- NativeWind v4+ support with proper peer dependencies
- Web compatibility through separate web entry point
- Tailwind config export for easy integration

## Development Workflow

1. Make changes to core colors in `packages/uikit-colors`
2. Run builds to propagate changes to dependent packages
3. Test changes across all platform implementations
4. Use `pnpm bump` for version management across workspace

## Key Files

- `packages/uikit-colors/index.ts` - Core color definitions
- `packages/uikit-colors/macos.ts` - macOS-specific colors  
- `packages/react-native-uikit-colors/src/colors.ts` - React Native color exports
- `packages/tailwindcss-uikit-colors/src/tailwind.ts` - Tailwind v3 plugin
- `packages/tailwindcss-uikit-colors/src/v4/` - Tailwind v4 CSS files