import { Fab, FabIcon } from '@/components/ui/fab';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Bottom tab bar height
  const TAB_BAR_HEIGHT = 60;

  return (
    <Fab
      size="lg"
      placement="bottom right"
      onPress={onPress}
      className="bg-success-500 active:bg-success-700"
      style={{
        position: 'absolute',
        bottom: TAB_BAR_HEIGHT + insets.bottom + 16,
        right: 16,
        zIndex: 999,
      }}
    >
      <FabIcon>
        <Ionicons
          name="create-outline"
          size={28}
          color={colors.background}
        />
      </FabIcon>
    </Fab>
  );
};
