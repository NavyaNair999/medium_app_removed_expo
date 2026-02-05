import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ArticleCard } from '@/components/ArticleCard';
import { TabBar } from '@/components/TabBar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY, DUMMY_ARTICLES } from '@/constants';
import { Article } from '@/types';

const TABS = ['For you', 'Featured'];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Article>);

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollY = useSharedValue(0);
  const { colors, theme, toggleTheme } = useTheme();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const filteredArticles =
    activeTab === 0
      ? DUMMY_ARTICLES
      : DUMMY_ARTICLES.filter((article) => article.featured);

  const renderHeader = () => (
    <View style={[styles.stickyHeader, { backgroundColor: colors.background }]}>
      <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.logo, { color: colors.text.primary }]}>Medium</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={styles.themeButton}
            onPress={toggleTheme}
          >
            <Ionicons 
              name={theme === 'light' ? 'moon' : 'sunny'} 
              size={24} 
              color={colors.text.secondary} 
            />
          </Pressable>
          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text.secondary} />
          </Pressable>
        </View>
      </View>
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={() => console.log('Article pressed:', item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      {renderHeader()}

      <AnimatedFlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FloatingActionButton onPress={() => console.log('Create new story')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  logo: {
    fontSize: 32,
    fontFamily: 'serif',
    fontWeight: '400',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    padding: SPACING.xs,
    marginRight: SPACING.xs,
  },
  notificationButton: {
    padding: SPACING.xs,
  },
  listContent: {
    paddingBottom: 100,
  },
});