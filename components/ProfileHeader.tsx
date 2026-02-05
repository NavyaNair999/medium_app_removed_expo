import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

interface ProfileHeaderProps {
  profile: Profile;
  onEditPress?: () => void;
  onStatsPress?: () => void;
  onSettingsPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditPress,
  onStatsPress,
  onSettingsPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Pressable onPress={onSettingsPress} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={colors.text.secondary} />
        </Pressable>
      </View>

      <View style={styles.profileInfo}>
        <Image source={{ uri: profile.avatar }} style={[styles.avatar, { backgroundColor: colors.accent }]} />
        <Text style={[styles.name, { color: colors.text.primary }]}>{profile.name}</Text>
        <Text style={[styles.stats, { color: colors.text.secondary }]}>
          {profile.followers} followers · {profile.following} following
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable style={[styles.statsButton, { backgroundColor: colors.surface }]} onPress={onStatsPress}>
          <Text style={[styles.statsButtonText, { color: colors.text.primary }]}>View stats</Text>
        </Pressable>
        <Pressable 
          style={[styles.editButton, { borderColor: colors.text.primary }]} 
          onPress={onEditPress}
        >
          <Text style={[styles.editButtonText, { color: colors.text.primary }]}>Edit your profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  spacer: {
    width: 24,
  },
  settingsButton: {
    padding: SPACING.xs,
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xs,
  },
  stats: {
    ...TYPOGRAPHY.body,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statsButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  editButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
});