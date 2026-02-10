import { ArticleCard } from '@/components/ArticleCard';
import { Box, Text } from '@/components/restyle-components';
import { DUMMY_ARTICLES, SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOPIC_TAGS = [
  'Self Improvement',
  'Cryptocurrency',
  'Writing',
  'Technology',
  'Design',
  'Business',
  'Productivity',
  'AI',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, activeTheme } = useTheme();

  const trendingArticles = DUMMY_ARTICLES.slice(0, 2);

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
      <Box paddingHorizontal="m" paddingVertical="m">
        <Text 
          fontSize={32} 
          fontWeight="400" 
          color="textPrimary"
          marginBottom="l"
        >
          Explore
        </Text>

        {/* Search Bar */}
        <Box
          flexDirection="row"
          alignItems="center"
          backgroundColor="surface"
          borderRadius="l"
          paddingHorizontal="m"
          paddingVertical="s"
        >
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            placeholder="Search Medium"
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 16,
              color: colors.text.primary,
              paddingVertical: 8,
            }}
          />
        </Box>
      </Box>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: SPACING.xl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Tags */}
        <Box paddingVertical="m">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SPACING.md,
            }}
          >
            {TOPIC_TAGS.map((tag, index) => (
              <Pressable key={tag} onPress={() => console.log(`Pressed ${tag}`)}>
                <Box
                  paddingVertical="s"
                  paddingHorizontal="l"
                  marginRight="s"
                  borderRadius="l"
                  backgroundColor="surface"
                  borderWidth={1}
                  borderColor="border"
                >
                  <Text fontSize={15} color="textSecondary" fontWeight="400">
                    {tag}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </ScrollView>
        </Box>

        {/* Trending Section */}
        <Box paddingTop="l">
          <Text
            fontSize={20}
            fontWeight="400"
            color="textPrimary"
            paddingHorizontal="m"
            marginBottom="l"
          >
            Trending on Medium
          </Text>

          {trendingArticles.map((article, index) => (
            <Box key={article.id} paddingHorizontal="m" paddingVertical="m">
              <Box flexDirection="row" style={{ gap: 16 }}>
                {/* Number */}
                <Text 
                  fontSize={32} 
                  fontWeight="300" 
                  color="textSecondary"
                  style={{ width: 40 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Text>

                {/* Content */}
                <Box flex={1}>
                  {/* Author and Collection */}
                  <Box flexDirection="row" alignItems="center" marginBottom="s">
                    {article.collection?.icon && (
                      <Text fontSize={16} marginRight="xs">
                        {article.collection.icon}
                      </Text>
                    )}
                    <Text fontSize={13} color="textSecondary">
                      In {article.collection?.name || 'General'} by{' '}
                    </Text>
                    <Text fontSize={13} color="textPrimary" fontWeight="600">
                      {article.author.name}
                    </Text>
                  </Box>

                  {/* Title */}
                  <Pressable
                    onPress={() => router.push(`/article?id=${article.id}`)}
                  >
                    <Text
                      fontSize={16}
                      fontWeight="700"
                      color="textPrimary"
                      lineHeight={22}
                      marginBottom="s"
                    >
                      {article.title}
                    </Text>
                  </Pressable>

                  {/* Date */}
                  <Text fontSize={13} color="textSecondary">
                    {article.date}
                  </Text>
                </Box>

                {/* Thumbnail */}
                {article.thumbnail && (
                  <Box
                    width={56}
                    height={56}
                    borderRadius="xs"
                    backgroundColor="surface"
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Recommended Articles */}
        <Box paddingTop="xl">
          <Text
            fontSize={20}
            fontWeight="400"
            color="textPrimary"
            paddingHorizontal="m"
            marginBottom="l"
          >
            Recommended for you
          </Text>
          {DUMMY_ARTICLES.slice(2, 5).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onPress={() => router.push(`/article?id=${article.id}`)}
            />
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}