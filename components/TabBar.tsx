import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress }) => {
  const translateX = useSharedValue(0);
  const tabWidth = SCREEN_WIDTH / tabs.length;
  const { colors } = useTheme();

  useEffect(() => {
    translateX.value = withSpring(activeTab * tabWidth, {
      damping: 20,
      stiffness: 90,
    });
  }, [activeTab, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <Pressable
              key={tab}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => onTabPress(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: colors.text.secondary },
                  isActive && { color: colors.text.primary },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Animated.View 
        style={[
          styles.indicator, 
          { width: tabWidth, backgroundColor: colors.text.primary }, 
          indicatorStyle
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  indicator: {
    height: 1,
  },
});