import { Theme } from '@/theme/restyle';
import { BoxProps, createBox, createText } from '@shopify/restyle';
import React from 'react';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

type StackProps = BoxProps<Theme> & {
  children?: React.ReactNode;
};

// VStack: vertical flex container (flexDirection: 'column')
export const VStack: React.FC<StackProps> = ({ children, ...props }) => (
  <Box flexDirection="column" {...props}>
    {children}
  </Box>
);

// HStack: horizontal flex container (flexDirection: 'row')
export const HStack: React.FC<StackProps> = ({ children, ...props }) => (
  <Box flexDirection="row" {...props}>
    {children}
  </Box>
);