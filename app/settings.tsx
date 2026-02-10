import { Box, Text } from '@/components/restyle-components';
import { SPACING } from '@/constants';
import { Theme, useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { colors, theme, activeTheme, setTheme } = useTheme();
  const [showThemeDialog, setShowThemeDialog] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setShowThemeDialog(false);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System Default';
      default:
        return 'Dark';
    }
  };

  const SettingsItem = ({ 
    label, 
    onPress, 
    rightElement 
  }: { 
    label: string; 
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <>
      <Pressable onPress={onPress}>
        <Box
          paddingHorizontal="m"
          paddingVertical="l"
          backgroundColor="background"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize={16} color="textSecondary" fontWeight="400">
            {label}
          </Text>
          {rightElement}
        </Box>
      </Pressable>
      <Box height={1} backgroundColor="border" marginLeft="m" />
    </>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="m"
        paddingVertical="m"
        position="relative"
      >
        <Pressable 
          onPress={handleBack} 
          style={{ position: 'absolute', left: SPACING.md, padding: SPACING.xs }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text fontSize={18} fontWeight="400" color="textPrimary">
          Settings
        </Text>
      </Box>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <Box marginBottom="l">
          <Text
            fontSize={18}
            fontWeight="400"
            color="textPrimary"
            paddingHorizontal="m"
            paddingVertical="l"
          >
            Account
          </Text>

          <SettingsItem
            label="Become a Medium Member"
            rightElement={<Text fontSize={24}>✨</Text>}
            onPress={() => console.log('Become a member')}
          />

          <SettingsItem
            label="Story stats"
            onPress={() => console.log('Story stats')}
          />

          <SettingsItem
            label="Account"
            onPress={() => console.log('Account')}
          />
        </Box>

        {/* Configure Medium Section */}
        <Box marginBottom="l">
          <Text
            fontSize={18}
            fontWeight="400"
            color="textPrimary"
            paddingHorizontal="m"
            paddingVertical="l"
          >
            Configure Medium
          </Text>

          <SettingsItem
            label="Refine recommendations"
            onPress={() => console.log('Refine recommendations')}
          />

          <SettingsItem
            label="Theme"
            onPress={() => setShowThemeDialog(true)}
            rightElement={
              <Text fontSize={16} color="textPrimary" fontWeight="400">
                {getThemeLabel()}
              </Text>
            }
          />

          <SettingsItem
            label="Push notifications"
            onPress={() => console.log('Push notifications')}
          />

          <SettingsItem
            label="Email notifications"
            onPress={() => console.log('Email notifications')}
          />

          <SettingsItem
            label="Custom app icon"
            onPress={() => console.log('Custom app icon')}
          />

          <SettingsItem
            label="Downloaded content"
            onPress={() => console.log('Downloaded content')}
          />
        </Box>

        {/* Social Section */}
        <Box>
          <Text
            fontSize={18}
            fontWeight="400"
            color="textPrimary"
            paddingHorizontal="m"
            paddingVertical="l"
          >
            Social
          </Text>
          <Text
            fontSize={15}
            color="textSecondary"
            paddingHorizontal="m"
            lineHeight={22}
            marginBottom="l"
          >
            We will never post to X or Facebook without your permission.
          </Text>
        </Box>
      </ScrollView>

      {/* THEME DIALOG */}
      <Modal
        visible={showThemeDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowThemeDialog(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SPACING.xl,
          }}
          onPress={() => setShowThemeDialog(false)}
        >
          <Pressable 
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: SPACING.xl,
              width: '100%',
              maxWidth: 400,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text 
              fontSize={22} 
              fontWeight="400" 
              color="textPrimary"
              marginBottom="xl"
            >
              Theme
            </Text>

            {['system', 'light', 'dark'].map((themeOption) => (
              <Pressable
                key={themeOption}
                onPress={() => handleThemeChange(themeOption as Theme)}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  paddingVertical="m"
                >
                  <Box
                    width={24}
                    height={24}
                    borderRadius="round"
                    borderWidth={2}
                    borderColor={theme === themeOption ? 'textPrimary' : 'textSecondary'}
                    alignItems="center"
                    justifyContent="center"
                    marginRight="m"
                  >
                    {theme === themeOption && (
                      <Box
                        width={12}
                        height={12}
                        borderRadius="round"
                        backgroundColor="textPrimary"
                      />
                    )}
                  </Box>
                  <Text fontSize={16} color="textPrimary" fontWeight="400">
                    {themeOption === 'system' ? 'System Default' : 
                     themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </Text>
                </Box>
              </Pressable>
            ))}

            <Box marginTop="l" alignItems="flex-end">
              <Pressable
                onPress={() => setShowThemeDialog(false)}
                style={{ padding: SPACING.sm }}
              >
                <Text fontSize={16} color="textPrimary" fontWeight="400">
                  Cancel
                </Text>
              </Pressable>
            </Box>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}