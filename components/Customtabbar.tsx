import { Box } from '@/components/restyle-components';
import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text as RNText, ScrollView, View } from 'react-native';

interface CustomTabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();
  const tabRefs = useRef<Array<View | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 60 });

  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      activeTabRef.measure((_x, _y, width, _height, pageX, _pageY) => {
        setIndicatorStyle({
          left: pageX + 16,
          width: width - 32,
        });
      });
    }
  }, [activeTab]);

  const TabButton = ({ tab, index }: { tab: string; index: number }) => {
    const isActive = activeTab === index;
    const [isPressed, setIsPressed] = useState(false);

    return (
      <Pressable
        ref={(ref) => {
          tabRefs.current[index] = ref as unknown as View;
        }}
        onPress={() => onTabPress(index)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Box
          paddingVertical="m"
          paddingHorizontal="m"
          marginRight="xs"
          borderRadius="l"
          backgroundColor={isPressed ? 'surface' : 'transparent'}
          opacity={isPressed ? 0.5 : 1}
        >
          <RNText
            style={{
              fontSize: 15,
              fontWeight: isActive ? '500' : '400',
              letterSpacing: 0.2,
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
    <Box position="relative" backgroundColor="background">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Box flexDirection="row">
          {tabs.map((tab, index) => (
            <TabButton key={tab} tab={tab} index={index} />
          ))}
        </Box>
      </ScrollView>
      <Box
        position="absolute"
        bottom={0}
        height={1.5}
        backgroundColor="textPrimary"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </Box>
  );
};