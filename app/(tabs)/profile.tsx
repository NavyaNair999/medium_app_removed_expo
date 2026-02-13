import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ProfileHeader } from '@/components/ProfileHeader';
import { TabBar } from '@/components/TabBar';
import { Box, Text } from '@/components/restyle-components';
import { DUMMY_PROFILE, SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import type { RootStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE_TABS = ['Stories', 'Lists', 'About'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(0);
  const { colors, activeTheme } = useTheme();

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const getColorFromName = (name: string) => {
    const colorList = [
      '#FF6B35',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
    ];
    const index = name.length % colorList.length;
    return colorList[index];
  };

  const renderDraftStory = () => (
    <Box
      marginTop="m"
      marginHorizontal="m"
      padding="m"
      borderRadius="m"
      borderWidth={1}
      borderColor="border"
      backgroundColor="background"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="m"
      >
        <Box flexDirection="row" alignItems="center">
          <Box
            width={24}
            height={24}
            borderRadius="xs"
            alignItems="center"
            justifyContent="center"
            marginRight="s"
            style={{ backgroundColor: getColorFromName(DUMMY_PROFILE.name) }}
          >
            <Text fontSize={12} fontWeight="600" style={{ color: '#FFFFFF' }}>
              {DUMMY_PROFILE.name.charAt(0).toUpperCase()}
            </Text>
          </Box>
          <Text fontSize={14} color="textPrimary" fontWeight="400">
            {DUMMY_PROFILE.name}
          </Text>
        </Box>
        <Pressable style={{ padding: SPACING.xs }}>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.text.secondary}
          />
        </Pressable>
      </Box>
      <Text fontSize={18} fontWeight="400" color="textPrimary">
        Untitled story
      </Text>
    </Box>
  );

  const renderStoriesContent = () => (
    <Box flex={1}>
      <Box paddingHorizontal="m" paddingVertical="l">
        <Pressable>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="m"
          >
            <Text fontSize={18} fontWeight="400" color="textPrimary">
              Draft
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.text.primary}
            />
          </Box>
        </Pressable>
      </Box>
      {renderDraftStory()}
    </Box>
  );

  const renderListsContent = () => (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      style={{ paddingVertical: SPACING.xl * 2 }}
    >
      <Text fontSize={16} color="textSecondary" textAlign="center">
        No lists yet
      </Text>
    </Box>
  );

  const renderAboutContent = () => (
    <Box
      flex={1}
      alignItems="center"
      paddingHorizontal="m"
      style={{ paddingVertical: SPACING.xl * 2 }}
    >
      <Text fontSize={16} color="textSecondary" textAlign="center">
        Tell readers about yourself
      </Text>
    </Box>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return renderStoriesContent();
      case 1:
        return renderListsContent();
      case 2:
        return renderAboutContent();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <ProfileHeader
          profile={DUMMY_PROFILE}
          onEditPress={() => console.log('Edit profile')}
          onStatsPress={() => console.log('View stats')}
          onSettingsPress={handleSettingsPress}
        />

        <Box backgroundColor="background">
          <TabBar
            tabs={PROFILE_TABS}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        </Box>

        {renderContent()}
      </ScrollView>

      <FloatingActionButton onPress={() => console.log('Create new story')} />
    </SafeAreaView>
  );
}
