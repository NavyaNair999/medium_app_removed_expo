// components/ProfileHeader.tsx
import { Box, Text } from '@/components/restyle-components';
import { SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';

type Props = {
  profile: {
    name: string;
    followers?: number;
    following?: number;
  };
  onEditPress: () => void;
  onStatsPress: () => void;
  onSettingsPress: () => void;
};

export const ProfileHeader = forwardRef<View, Props>(({
  profile,
  onEditPress,
  onStatsPress,
  onSettingsPress,
}, ref) => { 
  const { colors } = useTheme();

  const getColorFromName = (name: string) => {
    const colorList = [
      '#FF6B35', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    ];
    const index = name.length % colorList.length;
    return colorList[index];
  };

  return (
    /* ADD THE REF HERE */
    <Box ref={ref} backgroundColor="background" paddingBottom="m">
      {/* Settings Icon - Top Right */}
      <Box
        position="absolute"
        style={{ top: SPACING.md, right: SPACING.md, zIndex: 10 }}
      >
        <Pressable onPress={onSettingsPress} style={{ padding: SPACING.xs }}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text.secondary}
          />
        </Pressable>
      </Box>

      {/* Avatar and Name */}
      <Box paddingHorizontal="m" paddingTop="xl">
        <Box
          width={80}
          height={80}
          borderRadius="round"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
          style={{ backgroundColor: getColorFromName(profile.name) }}
        >
          <Text fontSize={32} fontWeight="700" color="foreground">
            {profile.name.charAt(0).toUpperCase()}
          </Text>
        </Box>

        <Text 
          fontSize={24} 
          fontWeight="400" 
          color="textPrimary"
          marginBottom="xs"
        >
          {profile.name}
        </Text>

        <Text fontSize={15} color="textSecondary" marginBottom="l">
          {profile.followers ?? 0} followers · {profile.following ?? 1} following
        </Text>

        <Box flexDirection="row" style={{ gap: 12 }}>
          <Pressable onPress={onStatsPress} style={{ flex: 1 }}>
            <Box
              paddingVertical="m"
              borderRadius="l"
              alignItems="center"
              justifyContent="center"
              backgroundColor="surface"
            >
              <Text fontSize={15} fontWeight="400" color="textPrimary">
                View stats
              </Text>
            </Box>
          </Pressable>

          <Pressable onPress={onEditPress} style={{ flex: 1 }}>
            <Box
              paddingVertical="m"
              borderRadius="l"
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="textSecondary"
              backgroundColor="transparent"
            >
              <Text fontSize={15} fontWeight="400" color="textPrimary">
                Edit your profile
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
});