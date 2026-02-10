import { Box } from '@/components/restyle-components';
import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text as RNText, View } from 'react-native';

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress }) => {
  const { colors } = useTheme();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Array<View | null>>([]);
  const animatedLeft = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      activeTabRef.measure((_x, _y, width, _height, pageX, _pageY) => {
        const newLeft = pageX;
        const newWidth = width;

        Animated.parallel([
          Animated.spring(animatedLeft, {
            toValue: newLeft,
            useNativeDriver: false,
            tension: 100,
            friction: 10,
          }),
          Animated.spring(animatedWidth, {
            toValue: newWidth,
            useNativeDriver: false,
            tension: 100,
            friction: 10,
          }),
        ]).start();

        setIndicatorStyle({ left: newLeft, width: newWidth });
      });
    }
  }, [activeTab, animatedLeft, animatedWidth]);

  const TabButton = ({ tab, index }: { tab: string; index: number }) => {
    const isActive = activeTab === index;

    return (
      <Pressable
        ref={(ref) => {
          tabRefs.current[index] = ref as unknown as View;
        }}
        onPress={() => onTabPress(index)}
      >
        <Box
          paddingVertical="m"
          paddingHorizontal="l"
        >
          <RNText
            style={{
              fontSize: 16,
              fontWeight: isActive ? '400' : '400',
              color: isActive ? colors.text.primary : colors.text.secondary,
            }}
          >
            {tab}
          </RNText>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box 
      backgroundColor="background"
      position="relative"
    >
      <Box flexDirection="row" paddingHorizontal="m">
        {tabs.map((tab, index) => (
          <TabButton key={tab} tab={tab} index={index} />
        ))}
      </Box>
      
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 1,
          backgroundColor: colors.text.primary,
          left: animatedLeft,
          width: animatedWidth,
        }}
      />
      
      <Box
        height={1}
        backgroundColor="border"
        width="100%"
      />
    </Box>
  );
};