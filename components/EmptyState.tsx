import { Box, Text } from '@/components/restyle-components';
import React from 'react';
import { Pressable } from 'react-native';

type Props = {
  title: string;
  message: string;
  actionText: string;
  onActionPress: () => void;
};

export function EmptyState({
  title,
  message,
  actionText,
  onActionPress,
}: Props) {
  return (
    <Box alignItems="center">
      <Text
        fontSize={20}
        fontWeight="500"
        textAlign="center"
        marginBottom="s"
        color="textPrimary"
      >
        {title}
      </Text>

      <Text
        fontSize={14}
        color="textSecondary"
        textAlign="center"
        marginBottom="m"
        lineHeight={20}
      >
        {message}
      </Text>

      <Pressable onPress={onActionPress}>
        <Text
          fontSize={14}
          textAlign="center"
          style={{ textDecorationLine: 'underline' }}
          color="textPrimary"
        >
          {actionText}
        </Text>
      </Pressable>
    </Box>
  );
}
