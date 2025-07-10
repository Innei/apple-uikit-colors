# Usage Examples

This document provides comprehensive examples for using Apple UIKit Colors across different platforms and frameworks.

## React Native Examples

### Basic Usage with StyleSheet

```tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColor, useColors } from 'react-native-uikit-colors'

function BasicExample() {
  const backgroundColor = useColor('systemBackground')
  const textColor = useColor('label')
  const colors = useColors()

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Hello World
      </Text>
      <Text style={[styles.subtitle, { color: colors.secondaryLabel }]}>
        This adapts to light/dark mode
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
})
```

### React Native with NativeWind

```tsx
import React from 'react'
import { View, Text } from 'react-native'
import { useCurrentColorsVariants } from 'react-native-uikit-colors'

function NativeWindExample() {
  const currentThemeColors = useCurrentColorsVariants()

  return (
    <View style={currentThemeColors} className="flex-1 justify-center items-center">
      <View className="bg-secondary-system-background rounded-lg p-6 m-4">
        <Text className="text-label text-xl font-bold mb-2">
          Card Title
        </Text>
        <Text className="text-secondary-label text-base">
          This card uses Apple UIKit colors with NativeWind classes.
        </Text>
        <View className="bg-system-fill rounded-md p-3 mt-4">
          <Text className="text-label text-sm">
            Fill background example
          </Text>
        </View>
      </View>
    </View>
  )
}
```

### Animated Colors with Reanimated

```tsx
import React from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated'
import { useColor } from 'react-native-uikit-colors'

function AnimatedExample() {
  const pressed = useSharedValue(0)
  const normalColor = useColor('secondarySystemBackground')
  const pressedColor = useColor('systemFill')

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        [normalColor, pressedColor]
      ),
      transform: [
        {
          scale: withSpring(pressed.value ? 0.95 : 1),
        },
      ],
    }
  })

  return (
    <Pressable
      onPressIn={() => (pressed.value = withSpring(1))}
      onPressOut={() => (pressed.value = withSpring(0))}
    >
      <Animated.View style={[animatedStyle, { padding: 20, borderRadius: 8 }]}>
        <Text style={{ color: useColor('label') }}>
          Press me for animated colors!
        </Text>
      </Animated.View>
    </Pressable>
  )
}
```

### Complex UI Components

```tsx
import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useColor, useColors } from 'react-native-uikit-colors'

function ComplexUIExample() {
  const colors = useColors()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.systemBackground }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          backgroundColor: colors.secondarySystemBackground,
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.separator,
        }}>
          <Text style={{
            color: colors.label,
            fontSize: 28,
            fontWeight: 'bold',
          }}>
            Settings
          </Text>
        </View>

        {/* Settings Groups */}
        <View style={{ marginTop: 20 }}>
          <SettingsGroup title="General" colors={colors}>
            <SettingsItem title="Account" detail="john@example.com" colors={colors} />
            <SettingsItem title="Notifications" detail="On" colors={colors} />
          </SettingsGroup>

          <SettingsGroup title="Appearance" colors={colors}>
            <SettingsItem title="Theme" detail="Auto" colors={colors} />
            <SettingsItem title="Text Size" detail="Medium" colors={colors} />
          </SettingsGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function SettingsGroup({ title, children, colors }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        color: colors.secondaryLabel,
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginLeft: 20,
        marginBottom: 8,
      }}>
        {title}
      </Text>
      <View style={{
        backgroundColor: colors.secondarySystemBackground,
        marginHorizontal: 20,
        borderRadius: 8,
      }}>
        {children}
      </View>
    </View>
  )
}

function SettingsItem({ title, detail, colors }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.separator,
    }}>
      <Text style={{ color: colors.label, fontSize: 16 }}>
        {title}
      </Text>
      <Text style={{ color: colors.secondaryLabel, fontSize: 16 }}>
        {detail}
      </Text>
    </View>
  )
}
```

## Tailwind CSS Examples

### Basic Web Component

```tsx
import React from 'react'

function WebExample() {
  return (
    <div className="min-h-screen bg-system-background text-label">
      <header className="bg-secondary-system-background border-b border-separator">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-label">
            Apple UIKit Colors
          </h1>
          <p className="text-secondary-label mt-2">
            Authentic Apple colors for your web app
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary-system-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-label mb-4">
              Color Palette
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-red h-12 rounded"></div>
              <div className="bg-orange h-12 rounded"></div>
              <div className="bg-yellow h-12 rounded"></div>
              <div className="bg-green h-12 rounded"></div>
              <div className="bg-mint h-12 rounded"></div>
              <div className="bg-teal h-12 rounded"></div>
              <div className="bg-cyan h-12 rounded"></div>
              <div className="bg-blue h-12 rounded"></div>
              <div className="bg-indigo h-12 rounded"></div>
              <div className="bg-purple h-12 rounded"></div>
              <div className="bg-pink h-12 rounded"></div>
              <div className="bg-brown h-12 rounded"></div>
            </div>
          </div>

          <div className="bg-secondary-system-background rounded-lg p-6">
            <h2 className="text-xl font-semibold text-label mb-4">
              Typography
            </h2>
            <div className="space-y-2">
              <p className="text-label">Primary label text</p>
              <p className="text-secondary-label">Secondary label text</p>
              <p className="text-tertiary-label">Tertiary label text</p>
              <p className="text-quaternary-label">Quaternary label text</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

### Complex Dashboard

```tsx
import React from 'react'

function DashboardExample() {
  return (
    <div className="min-h-screen bg-system-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-secondary-system-background border-r border-separator">
        <div className="p-6">
          <h1 className="text-lg font-semibold text-label">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-label bg-system-fill">
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-secondary-label hover:bg-quaternary-system-fill">
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-secondary-label hover:bg-quaternary-system-fill">
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-label">Overview</h1>
          <p className="text-secondary-label mt-1">
            Welcome back to your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary-system-background rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-label text-sm">Total Users</p>
                <p className="text-label text-2xl font-bold">12,345</p>
              </div>
              <div className="bg-blue w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary-system-background rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-label text-sm">Revenue</p>
                <p className="text-label text-2xl font-bold">$45,678</p>
              </div>
              <div className="bg-green w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary-system-background rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-label text-sm">Orders</p>
                <p className="text-label text-2xl font-bold">1,234</p>
              </div>
              <div className="bg-orange w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-secondary-system-background rounded-lg">
          <div className="p-6 border-b border-separator">
            <h2 className="text-lg font-semibold text-label">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-tertiary-system-background">
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-label uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-label uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-label uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-label uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-separator">
                <tr>
                  <td className="px-6 py-4 text-sm text-label">#12345</td>
                  <td className="px-6 py-4 text-sm text-label">John Doe</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-green text-white px-2 py-1 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-label">$99.99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-label">#12346</td>
                  <td className="px-6 py-4 text-sm text-label">Jane Smith</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-orange text-white px-2 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-label">$149.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
```

## Tailwind CSS v4 Examples

### Basic Setup

```css
/* styles.css */
@import 'tailwindcss-uikit-colors/v4/ios.css';

.my-component {
  background-color: rgb(var(--color-system-background));
  color: rgb(var(--color-label));
}

/* Dark mode override */
[data-theme="dark"] .my-component {
  background-color: rgb(var(--color-system-background));
  color: rgb(var(--color-label));
}
```

### Custom CSS with Variables

```css
/* Custom components using UIKit colors */
.card {
  background-color: rgb(var(--color-secondary-system-background));
  border: 1px solid rgba(var(--color-separator));
  border-radius: 8px;
  padding: 1rem;
}

.button-primary {
  background-color: rgb(var(--color-blue));
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 600;
}

.button-secondary {
  background-color: rgb(var(--color-secondary-system-fill));
  color: rgb(var(--color-label));
  border: 1px solid rgba(var(--color-separator));
  border-radius: 6px;
  padding: 0.5rem 1rem;
}

.text-muted {
  color: rgb(var(--color-secondary-label));
}

.divider {
  height: 1px;
  background-color: rgba(var(--color-separator));
  margin: 1rem 0;
}
```
 