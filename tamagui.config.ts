import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui({
  ...config,

  themes: {
    light: {
      background: '#FFFFFF',
      backgroundHover: '#F8F8F8',
      backgroundPress: '#E6E6E6',
      backgroundFocus: '#F8F8F8',
      color: '#000000',
      colorHover: '#000000',
      colorPress: '#000000',
      colorFocus: '#000000',
      borderColor: '#E6E6E6',
      borderColorHover: '#6B6B6B',
      borderColorFocus: '#1A8917',
      borderColorPress: '#1A8917',
      placeholderColor: '#6B6B6B',
    },
    dark: {
      background: '#0A0A0A',
      backgroundHover: '#1A1A1A',
      backgroundPress: '#2A2A2A',
      backgroundFocus: '#1A1A1A',
      color: '#FFFFFF',
      colorHover: '#FFFFFF',
      colorPress: '#FFFFFF',
      colorFocus: '#FFFFFF',
      borderColor: '#2A2A2A',
      borderColorHover: '#B3B3B3',
      borderColorFocus: '#1A8917',
      borderColorPress: '#1A8917',
      placeholderColor: '#B3B3B3',
    },
  },

  tokens: {
    ...config.tokens,

    space: {
      ...config.tokens.space,
      xs: 4,
      sm: 8,
      md: 16,
      true: 16,
      lg: 24,
      xl: 32,
    },

    size: {
      ...config.tokens.size,
      xs: 4,
      sm: 8,
      md: 16,
      true: 16,
      lg: 24,
      xl: 32,
    },

    radius: {
      ...config.tokens.radius,
      xs: 2,
      sm: 4,
      md: 8,
      lg: 20,
      xl: 24,
      round: 999,
    },
  },
})

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
