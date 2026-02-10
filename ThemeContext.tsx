import tamaguiConfig from '@/tamagui.config';
import {
    darkTheme as restyleDarkTheme,
    lightTheme as restyleLightTheme,
    Theme as RestyleTheme,
} from '@/theme/restyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { TamaguiProvider } from 'tamagui';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = '@app_theme';

export interface ThemeColors {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
  };
  border: string;
  accent: string;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#F8F8F8',
  text: {
    primary: '#000000',
    secondary: '#6B6B6B',
  },
  border: '#E6E6E6',
  accent: '#1A8917',
};

const darkColors: ThemeColors = {
  background: '#0A0A0A',
  surface: '#1A1A1A',
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
  },
  border: '#2A2A2A',
  accent: '#1A8917',
};

// React Native Paper theme customization
const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A8917',
    background: '#FFFFFF',
    surface: '#F8F8F8',
    surfaceVariant: '#E6E6E6',
    onSurface: '#000000',
    onSurfaceVariant: '#6B6B6B',
    elevation: {
      level0: 'transparent',
      level1: '#F8F8F8',
      level2: '#F0F0F0',
      level3: '#E8E8E8',
      level4: '#E0E0E0',
      level5: '#D8D8D8',
    },
  },
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1A8917',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    surfaceVariant: '#2A2A2A',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#B3B3B3',
    elevation: {
      level0: 'transparent',
      level1: '#1A1A1A',
      level2: '#202020',
      level3: '#252525',
      level4: '#2A2A2A',
      level5: '#2F2F2F',
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  activeTheme: 'light' | 'dark';
  colors: ThemeColors;
  paperTheme: typeof customLightTheme | typeof customDarkTheme;
  restyleTheme: RestyleTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (
        savedTheme &&
        (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')
      ) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getActiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return theme;
  };

  const activeTheme = getActiveTheme();
  const colors = activeTheme === 'light' ? lightColors : darkColors;
  const paperTheme = activeTheme === 'light' ? customLightTheme : customDarkTheme;
  const restyleTheme = activeTheme === 'light' ? restyleLightTheme : restyleDarkTheme;

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colors, activeTheme, paperTheme, restyleTheme, setTheme }}
    >
      <TamaguiProvider config={tamaguiConfig} defaultTheme={activeTheme}>
        <RestyleThemeProvider theme={restyleTheme}>
          <PaperProvider theme={paperTheme}>{children}</PaperProvider>
        </RestyleThemeProvider>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};