import { Box, Text } from '@/components/restyle-components';
import { SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LIBRARY_TABS = ['Your lists', 'Saved lists', 'Digest', 'Highlights'];

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { colors, activeTheme } = useTheme();

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

  const renderReadingList = () => (
    <Box
      marginHorizontal="m"
      marginBottom="m"
      padding="l"
      borderRadius="m"
      borderWidth={1}
      borderColor="border"
      backgroundColor="background"
    >
      {/* Header */}
      <Box flexDirection="row" alignItems="center" marginBottom="m">
        <Box
          width={24}
          height={24}
          borderRadius="xs"
          alignItems="center"
          justifyContent="center"
          marginRight="xs"
          style={{ backgroundColor: getColorFromName('Neha Jadhav') }}
        >
          <Text fontSize={12} fontWeight="600" style={{ color: '#FFFFFF' }}>
            N
          </Text>
        </Box>
        <Text fontSize={14} color="textSecondary" fontWeight="400">
          Neha Jadhav
        </Text>
      </Box>

      {/* Title */}
      <Text fontSize={22} fontWeight="400" color="textPrimary" marginBottom="m">
        Reading List
      </Text>

      {/* Stats and Actions */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="m"
      >
        <Box flexDirection="row" alignItems="center">
          <Text fontSize={14} color="textSecondary">
            No stories
          </Text>
          <Box marginLeft="xs">
            <Ionicons name="lock-closed" size={14} color={colors.text.secondary} />
          </Box>
        </Box>

        <Box flexDirection="row" alignItems="center" style={{ gap: 8 }}>
          <Pressable onPress={() => console.log('Download')}>
            <Ionicons
              name="arrow-down-circle-outline"
              size={24}
              color={colors.text.primary}
            />
          </Pressable>
          <Pressable onPress={() => console.log('More options')}>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={colors.text.primary}
            />
          </Pressable>
        </Box>
      </Box>

      {/* Placeholder thumbnails */}
      <Box flexDirection="row" style={{ gap: 8 }}>
        <Box flex={1} height={80} borderRadius="xs" backgroundColor="surface" />
        <Box flex={1} height={80} borderRadius="xs" backgroundColor="surface" />
        <Box flex={1} height={80} borderRadius="xs" backgroundColor="surface" />
      </Box>
    </Box>
  );

  const renderContent = () => {
    if (activeTab === 0) {
      return (
        <Box paddingTop="l">
          {renderReadingList()}
        </Box>
      );
    } else {
      return (
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          style={{ paddingVertical: SPACING.xl * 3 }}
        >
          <Text fontSize={16} color="textSecondary" textAlign="center">
            {activeTab === 1 && 'No saved lists yet'}
            {activeTab === 2 && 'No digest stories yet'}
            {activeTab === 3 && 'No highlights yet'}
          </Text>
        </Box>
      );
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

      {/* Header */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="m"
        paddingVertical="m"
      >
        <Text fontSize={32} fontWeight="400" color="textPrimary">
          Your library
        </Text>
        
        <Pressable onPress={() => console.log('New list')}>
          <Box
            paddingHorizontal="l"
            paddingVertical="s"
            borderRadius="l"
            backgroundColor="accent"
          >
            <Text fontSize={15} fontWeight="400" style={{ color: '#FFFFFF' }}>
              New list
            </Text>
          </Box>
        </Pressable>
      </Box>

      {/* Tabs */}
      <Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md }}
        >
          {LIBRARY_TABS.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <Pressable key={tab} onPress={() => setActiveTab(index)}>
                <Box
                  paddingVertical="m"
                  paddingHorizontal="s"
                  marginRight="l"
                  position="relative"
                >
                  <Text
                    fontSize={15}
                    fontWeight="400"
                    color={isActive ? 'textPrimary' : 'textSecondary'}
                  >
                    {tab}
                  </Text>
                  {isActive && (
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      height={1}
                      backgroundColor="textPrimary"
                    />
                  )}
                </Box>
              </Pressable>
            );
          })}
        </ScrollView>
        <Box height={1} backgroundColor="border" />
      </Box>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
