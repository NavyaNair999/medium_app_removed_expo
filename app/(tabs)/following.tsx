import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { Box, Text } from '@/components/restyle-components';
import { useTheme } from '@/context/ThemeContext';

const FILTER_TABS = ['Writers and publications', 'Topics'];

export default function FollowingScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const { colors, activeTheme } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* Title */}
      <Box paddingHorizontal="m" paddingTop="l" paddingBottom="m">
        <Text fontSize={32} fontWeight="400" color="textPrimary">
          Following
        </Text>
      </Box>

      {/* Filter Tabs */}
      <Box
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="m"
        paddingBottom="l"
      >
        {FILTER_TABS.map((tab, index) => {
          const isActive = activeFilter === index;

          return (
            <Pressable key={tab} onPress={() => setActiveFilter(index)}>
              <Box
                paddingVertical="s"
                paddingHorizontal="l"
                marginRight="s"
                borderRadius="xl"
                borderWidth={1}
                borderColor={isActive ? 'textPrimary' : 'border'}
                backgroundColor={isActive ? 'textPrimary' : 'transparent'}
              >
                <Text
                  fontSize={15}
                  fontWeight="400"
                  style={{
                    color: isActive
                      ? colors.background
                      : colors.text.secondary,
                  }}
                >
                  {tab}
                </Text>
              </Box>
            </Pressable>
          );
        })}

        {/* Plus Button */}
        <Pressable style={{ marginLeft: 'auto' }}>
          <Box
            width={44}
            height={44}
            borderRadius="round"
            borderWidth={1}
            borderColor="border"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="add" size={22} color={colors.text.primary} />
          </Box>
        </Pressable>
      </Box>

      {/* Empty State (Centered) */}
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="xl"
        style={{ marginTop: -60 }} // Adjust to center properly
      >
        <EmptyState
          title="No stories yet"
          message="Once a writer or publication you follow publishes a recent story, you'll see it here."
          actionText="See suggestions"
          onActionPress={() => console.log('See suggestions')}
        />
      </Box>
    </SafeAreaView>
  );
}
