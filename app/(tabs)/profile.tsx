import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ProfileHeader } from '@/components/ProfileHeader';
import { TabBar } from '@/components/TabBar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY, DUMMY_PROFILE } from '@/constants';

const PROFILE_TABS = ['Stories', 'Lists', 'About'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { colors, theme } = useTheme();

  const renderDraftStory = () => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(100)}
      style={[
        styles.draftCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.draftHeader}>
        <View style={styles.draftInfo}>
          <View style={[styles.draftAvatar, { backgroundColor: colors.accent }]}>
            <Text style={[styles.draftAvatarText, { color: colors.background }]}>
              {DUMMY_PROFILE.name.charAt(0)}
            </Text>
          </View>
          <Text style={[styles.draftAuthor, { color: colors.text.primary }]}>
            {DUMMY_PROFILE.name}
          </Text>
        </View>
        <Pressable style={styles.draftMenu}>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.text.secondary}
          />
        </Pressable>
      </View>
      <Text style={[styles.draftTitle, { color: colors.text.primary }]}>Untitled story</Text>
    </Animated.View>
  );

  const renderContent = () => {
    if (activeTab === 0) {
      // Stories tab
      return (
        <View style={styles.storiesContent}>
          <View style={styles.draftSection}>
            <Pressable style={styles.draftHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Draft</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.text.primary}
              />
            </Pressable>
            {renderDraftStory()}
          </View>
        </View>
      );
    } else if (activeTab === 1) {
      // Lists tab
      return (
        <View style={styles.emptyContent}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            No lists yet
          </Text>
        </View>
      );
    } else {
      // About tab
      return (
        <View style={styles.aboutContent}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Tell readers about yourself
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <ProfileHeader
          profile={DUMMY_PROFILE}
          onEditPress={() => console.log('Edit profile')}
          onStatsPress={() => console.log('View stats')}
          onSettingsPress={() => console.log('Settings')}
        />

        <View style={[styles.tabBarWrapper, { backgroundColor: colors.background }]}>
          <TabBar
            tabs={PROFILE_TABS}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        </View>

        {renderContent()}
      </ScrollView>

      <FloatingActionButton onPress={() => console.log('Create new story')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tabBarWrapper: {},
  storiesContent: {
    flex: 1,
  },
  draftSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
  },
  draftCard: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  draftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  draftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draftAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  draftAvatarText: {
    fontSize: 16,
    fontWeight: '600',
  },
  draftAuthor: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  draftMenu: {
    padding: SPACING.xs,
  },
  draftTitle: {
    ...TYPOGRAPHY.h3,
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  aboutContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
  },
});