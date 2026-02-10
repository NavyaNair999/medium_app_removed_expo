import { ArticleCard } from '@/components/ArticleCard';
import { CustomTabBar } from '@/components/Customtabbar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Box, Text } from '@/components/restyle-components';
import { DUMMY_ARTICLES, SPACING } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { Article } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const TABS = ['For you', 'Featured'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { colors, activeTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const forYouArticles = DUMMY_ARTICLES;
  const featuredArticles = DUMMY_ARTICLES.filter(a => a.featured);
  const displayFeaturedArticles =
    featuredArticles.length > 0 ? featuredArticles : DUMMY_ARTICLES;

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={() => router.push(`/article?id=${item.id}`)}
    />
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
      <Box backgroundColor="background">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical="l"
        >
          <Text
            fontSize={36}
            fontWeight="400"
            color="textPrimary"
            style={{ fontFamily: 'serif', letterSpacing: -0.5 }}
          >
            Medium
          </Text>

          <Pressable style={{ padding: SPACING.xs }}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text.secondary}
            />
          </Pressable>
        </Box>

        <CustomTabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </Box>

      {/* Content Pages */}
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <View
          style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH * 2,
            transform: [{ translateX: -activeTab * SCREEN_WIDTH }],
          }}
        >
          {[forYouArticles, displayFeaturedArticles].map((data, index) => (
            <View key={index} style={{ width: SCREEN_WIDTH }}>
              <FlatList
                data={data}
                renderItem={renderArticle}
                keyExtractor={(item) => `${index}-${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: insets.bottom + 80, // Tab bar + extra space
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <FloatingActionButton
        onPress={() => console.log('Create new story')}
      />
    </SafeAreaView>
  );
}