import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import type { RootStackParamList, TabParamList } from '@/types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Box } from '@/components/restyle-components';

import ArticleScreen from '@/app/article';
import SettingsScreen from '@/app/settings';
import HomeScreen from '@/app/(tabs)/index';
import FollowingScreen from '@/app/(tabs)/following';
import SearchScreen from '@/app/(tabs)/search';
import LibraryScreen from '@/app/(tabs)/library';
import ProfileScreen from '@/app/(tabs)/profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function TabsNavigator() {
  const { colors } = useTheme();

  const renderIcon = (name: string, focused: boolean, color: string) => (
    <Box
      width={48}
      height={48}
      borderRadius="l"
      alignItems="center"
      justifyContent="center"
      backgroundColor={focused ? 'surface' : 'transparent'}
    >
      <Ionicons name={name as any} size={24} color={color} />
    </Box>
  );

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? 'home' : 'home-outline', focused, color),
        }}
      />
      <Tabs.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? 'people' : 'people-outline', focused, color),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? 'search' : 'search-outline', focused, color),
        }}
      />
      <Tabs.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? 'bookmark' : 'bookmark-outline', focused, color),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? 'person' : 'person-outline', focused, color),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabsNavigator} />
            <Stack.Screen name="Article" component={ArticleScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
