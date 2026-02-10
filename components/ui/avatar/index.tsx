import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface AvatarProps {
  name: string;
  size?: number;
  imageUrl?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 48, imageUrl }) => {
  const { colors } = useTheme(); //

  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor: colors.surface //
      }
    ]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={[styles.text, { color: colors.text.primary }]}>
          {name.charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});