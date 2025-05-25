import * as iosColors from 'apple-uikit-colors'
import * as macOSColors from 'apple-uikit-colors/macos'
import fs from 'fs/promises'
import { format } from 'prettier'

const buildTailwindV4CSS = async (
  colors: {
    palette: {
      light: Record<string, string>
      dark: Record<string, string>
    }
    elements: {
      light: Record<string, string>
      dark: Record<string, string>
    }
  },
  target: {
    outputPath: string
    prefix?: string
  },
) => {
  const { palette, elements } = colors
  const { outputPath, prefix = '' } = target

  // Convert hex colors to RGB values (without rgb() wrapper for CSS variables)
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return hex

    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)

    return `${r} ${g} ${b}`
  }

  // Convert camelCase to kebab-case for CSS property names
  const camelToKebab = (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }

  // Determine if a color has alpha channel
  const hasAlpha = (hex: string): boolean => {
    // Check if the color contains alpha information (like rgba values)
    return hex.includes('/') || hex.includes('rgba') || hex.includes('hsla')
  }

  // Combine palette and elements
  const allLightColors = { ...palette.light, ...elements.light }
  const allDarkColors = { ...palette.dark, ...elements.dark }

  // Get all unique color keys
  const allKeys = new Set([
    ...Object.keys(allLightColors),
    ...Object.keys(allDarkColors),
  ])

  // Build theme colors for @theme inline
  const themeColors: string[] = []
  const lightModeColors: string[] = []
  const darkModeColors: string[] = []

  for (const key of allKeys) {
    const lightValue = allLightColors[key]
    const darkValue = allDarkColors[key]
    const kebabKey = camelToKebab(key)

    if (lightValue && darkValue) {
      const lightRgb = hexToRgb(lightValue)
      const darkRgb = hexToRgb(darkValue)
      const useRgba = hasAlpha(lightValue) || hasAlpha(darkValue)
      const colorFunction = useRgba ? 'rgba' : 'rgb'

      // Add to theme colors (references to CSS variables)
      themeColors.push(
        `  --color-${kebabKey}: ${colorFunction}(var(--color-${key}));`,
      )

      // Add light and dark variants
      themeColors.push(
        `  --color-${kebabKey}-light: ${colorFunction}(var(--color-${key}-light));`,
      )
      themeColors.push(
        `  --color-${kebabKey}-dark: ${colorFunction}(var(--color-${key}-dark));`,
      )

      // Add to light mode colors (actual RGB values)
      lightModeColors.push(`    --color-${key}: ${lightRgb};`)
      lightModeColors.push(`    --color-${key}-light: ${lightRgb};`)

      // Add to dark mode colors (actual RGB values)
      darkModeColors.push(`    --color-${key}: ${darkRgb};`)
      darkModeColors.push(`    --color-${key}-dark: ${darkRgb};`)
    } else if (lightValue) {
      const lightRgb = hexToRgb(lightValue)
      const useRgba = hasAlpha(lightValue)
      const colorFunction = useRgba ? 'rgba' : 'rgb'

      themeColors.push(
        `  --color-${kebabKey}: ${colorFunction}(var(--color-${key}));`,
      )
      themeColors.push(
        `  --color-${kebabKey}-light: ${colorFunction}(var(--color-${key}-light));`,
      )

      lightModeColors.push(`    --color-${key}: ${lightRgb};`)
      lightModeColors.push(`    --color-${key}-light: ${lightRgb};`)
    } else if (darkValue) {
      const darkRgb = hexToRgb(darkValue)
      const useRgba = hasAlpha(darkValue)
      const colorFunction = useRgba ? 'rgba' : 'rgb'

      themeColors.push(
        `  --color-${kebabKey}: ${colorFunction}(var(--color-${key}));`,
      )
      themeColors.push(
        `  --color-${kebabKey}-dark: ${colorFunction}(var(--color-${key}-dark));`,
      )

      darkModeColors.push(`    --color-${key}: ${darkRgb};`)
      darkModeColors.push(`    --color-${key}-dark: ${darkRgb};`)
    }
  }

  // Build media query overrides for automatic dark mode
  const mediaQueryOverrides: string[] = []
  for (const key of allKeys) {
    const darkValue = allDarkColors[key]
    if (darkValue) {
      mediaQueryOverrides.push(
        `      --color-${key}: var(--color-${key}-dark);`,
      )
    }
  }

  // Build selector overrides for manual dark mode
  const selectorOverrides: string[] = []
  for (const key of allKeys) {
    const darkValue = allDarkColors[key]
    if (darkValue) {
      selectorOverrides.push(`    --color-${key}: var(--color-${key}-dark);`)
    }
  }

  // Generate the Tailwind v4 CSS
  const tailwindV4CSS = `@import 'tailwindcss';

@theme inline {
  /* UIKit Colors - Auto-generated */
${themeColors.join('\n')}
}

/* Define color values */
@layer base {
  :root {
    /* Light mode colors (default) */
${lightModeColors.join('\n')}
${darkModeColors.join('\n')}
  }

  /* Dark mode overrides using media query */
  @media (prefers-color-scheme: dark) {
    :root {
${mediaQueryOverrides.join('\n')}
    }
  }

  /* Dark mode overrides using data attribute */
  [data-theme='dark'] {
${selectorOverrides.join('\n')}
  }
}

/* Custom variants for light/dark colors */
@custom-variant light (&:where([data-theme="light"], [data-theme="light"] *));
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));`

  // Clean up existing file
  try {
    await fs.unlink(outputPath)
  } catch (e) {
    // File doesn't exist, that's fine
  }

  // Write the new CSS file
  await fs.writeFile(
    outputPath,
    await format(
      `/* This file is auto-generated by tailwindcss-uikit-colors for Tailwind v4 */\n${tailwindV4CSS}`,
      {
        parser: 'css',
      },
    ),
  )

  console.log(`✅ Generated Tailwind v4 CSS: ${outputPath}`)
}

export async function buildV4() {
  // Create output directory
  await fs.mkdir('./src/v4', { recursive: true })

  // Build iOS colors
  {
    const { darkElements, darkPalette, lightElements, lightPalette } = iosColors
    await buildTailwindV4CSS(
      {
        palette: {
          light: lightPalette,
          dark: darkPalette,
        },
        elements: { light: lightElements, dark: darkElements },
      },
      {
        outputPath: './src/v4/ios.css',
      },
    )
  }

  // Build macOS colors
  {
    const { darkElements, darkPalette, lightElements, lightPalette } =
      macOSColors
    await buildTailwindV4CSS(
      {
        palette: {
          light: lightPalette,
          dark: darkPalette,
        },
        elements: { light: lightElements, dark: darkElements },
      },
      {
        outputPath: './src/v4/macos.css',
      },
    )
  }
}

// When this file is run directly, execute the build
if (require.main === module) {
  buildV4().catch(console.error)
}
