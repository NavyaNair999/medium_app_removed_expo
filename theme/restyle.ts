import { createTheme } from '@shopify/restyle';

const palette = {
  // Light theme colors
  white: '#FFFFFF',
  lightGray: '#F8F8F8',
  mediumGray: '#E6E6E6',
  darkGray: '#6B6B6B',
  black: '#000000',

  // Dark theme colors
  darkestBlack: '#0A0A0A',
  darkSurface: '#1A1A1A',
  darkBorder: '#2A2A2A',
  lightGray2: '#B3B3B3',

  // Accent
  green: '#1A8917',

  // Additional colors
  red: '#FF6B6B',
  teal: '#4ECDC4',
  blue: '#45B7D1',
  coral: '#FFA07A',
  mint: '#98D8C8',
  yellow: '#F7DC6F',
  purple: '#BB8FCE',
  skyBlue: '#85C1E2',
};

export const lightTheme = createTheme({
  colors: {
    background: palette.white,
    foreground: palette.black,
    surface: palette.lightGray,
    textPrimary: palette.black,
    textSecondary: palette.darkGray,
    border: palette.mediumGray,
    accent: palette.green,
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadii: {
    xs: 2,
    s: 4,
    m: 8,
    l: 20,
    xl: 24,
    round: 999,
  },
  textVariants: {
    h1: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 40,
    },
    h2: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 32,
    },
    h3: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 28,
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontSize: 13,
      fontWeight: '400',
    },
    defaults: {},
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

// Declare the type AFTER lightTheme so it can infer from it
export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    background: palette.darkestBlack,
    foreground: palette.white,
    surface: palette.darkSurface,
    textPrimary: palette.white,
    textSecondary: palette.lightGray2,
    border: palette.darkBorder,
    accent: palette.green,
    transparent: 'transparent',
  },
};