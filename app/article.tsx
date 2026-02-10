import { Box, Text } from '@/components/restyle-components';
import { SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const { colors, activeTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);

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

  const renderAvatar = (name: string, avatar?: string) => {
    if (!avatarError && avatar) {
      return (
        <Image
          source={{ uri: avatar }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
          onError={() => setAvatarError(true)}
        />
      );
    }

    return (
      <Box
        width={48}
        height={48}
        borderRadius="round"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: getColorFromName(name) }}
      >
        <Text fontSize={20} fontWeight="600" style={{ color: '#FFFFFF' }}>
          {name.charAt(0).toUpperCase()}
        </Text>
      </Box>
    );
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
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="m"
        paddingVertical="m"
      >
        <Pressable onPress={() => router.back()} style={{ padding: SPACING.xs }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>

        <Box flexDirection="row" alignItems="center" style={{ gap: 16 }}>
          <Pressable style={{ padding: SPACING.xs }}>
            <Ionicons name="play-circle-outline" size={28} color={colors.text.secondary} />
          </Pressable>
          <Pressable style={{ padding: SPACING.xs }}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.text.secondary} />
          </Pressable>
        </Box>
      </Box>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: SPACING.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Member-only badge */}
        <Box paddingHorizontal="m" marginBottom="l">
          <Box
            flexDirection="row"
            alignItems="center"
            paddingVertical="s"
            paddingHorizontal="m"
            borderRadius="l"
            backgroundColor="surface"
            alignSelf="flex-start"
          >
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text fontSize={14} color="textSecondary" marginLeft="xs">
              Member-only story
            </Text>
          </Box>
        </Box>

        {/* Collection/Publication */}
        <Box paddingHorizontal="m" marginBottom="s">
          <Text fontSize={13} color="textSecondary" textTransform="uppercase">
            DELIGHTFUL UI BY MALEWICZ
          </Text>
        </Box>

        {/* Title */}
        <Box paddingHorizontal="m" marginBottom="m">
          <Text fontSize={28} fontWeight="400" color="textPrimary" lineHeight={36}>
            I was wrong about Liquid Glass.
          </Text>
        </Box>

        {/* Subtitle */}
        <Box paddingHorizontal="m" marginBottom="l">
          <Text fontSize={20} color="textSecondary" lineHeight={28}>
            It's actually amazing — here's why.
          </Text>
        </Box>

        {/* Meta info */}
        <Box paddingHorizontal="m" marginBottom="l">
          <Text fontSize={15} color="textSecondary">
            8 min read · Oct 20, 2025
          </Text>
        </Box>

        {/* Author info */}
        <Box paddingHorizontal="m" marginBottom="l">
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box flexDirection="row" alignItems="center" flex={1}>
              {renderAvatar('Michal Malewicz')}
              <Box marginLeft="m" flex={1}>
                <Box flexDirection="row" alignItems="center">
                  <Text fontSize={16} color="textPrimary" fontWeight="400">
                    Michal Malewicz
                  </Text>
                  <Box marginLeft="xs">
                    <Ionicons name="checkmark-circle" size={16} color="#1A8917" />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Pressable>
              <Box
                paddingVertical="s"
                paddingHorizontal="l"
                borderRadius="l"
                borderWidth={1}
                borderColor="textPrimary"
              >
                <Text fontSize={15} color="textPrimary" fontWeight="400">
                  Follow
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {/* Featured Image Placeholder */}
        <Box paddingHorizontal="m" marginBottom="xl">
          <Box
            width="100%"
            height={240}
            borderRadius="s"
            backgroundColor="surface"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="image-outline" size={48} color={colors.text.secondary} />
          </Box>
        </Box>

        {/* Article Content */}
        <Box paddingHorizontal="m">
          <Text fontSize={18} color="textPrimary" lineHeight={32} marginBottom="l">
            Article content would go here. This is a placeholder for the actual article text that would be displayed in the Medium app.
          </Text>

          <Text fontSize={18} color="textPrimary" lineHeight={32} marginBottom="l">
            The content would include multiple paragraphs, images, quotes, and other rich media elements that make up a typical Medium article.
          </Text>
        </Box>
      </ScrollView>

      {/* Bottom Actions Bar */}
      <Box
        backgroundColor="background"
        borderTopWidth={1}
        borderColor="border"
        paddingHorizontal="m"
        paddingVertical="m"
      >
        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center" style={{ gap: 24 }}>
            <Pressable>
              <Box flexDirection="row" alignItems="center">
                <Ionicons name="hand-left-outline" size={24} color={colors.text.secondary} />
                <Text fontSize={15} color="textSecondary" marginLeft="xs">
                  1.4K
                </Text>
              </Box>
            </Pressable>

            <Pressable>
              <Box flexDirection="row" alignItems="center">
                <Ionicons name="chatbubble-outline" size={22} color={colors.text.secondary} />
                <Text fontSize={15} color="textSecondary" marginLeft="xs">
                  43
                </Text>
              </Box>
            </Pressable>
          </Box>

          <Box flexDirection="row" alignItems="center" style={{ gap: 24 }}>
            <Pressable>
              <Ionicons name="bookmark-outline" size={24} color={colors.text.secondary} />
            </Pressable>

            <Pressable>
              <Ionicons name="share-outline" size={24} color={colors.text.secondary} />
            </Pressable>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}