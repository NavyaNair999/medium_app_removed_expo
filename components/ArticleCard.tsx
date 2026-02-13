import { SPACING, TYPOGRAPHY } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { Article } from '@/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import { MotiView } from 'moti';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  const { colors } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  const getColorFromName = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const renderAvatar = () => {
    if (!avatarError && article.author.avatar) {
      return (
        <Image
          source={{ uri: article.author.avatar }}
          style={styles.avatar}
          onError={() => setAvatarError(true)}
        />
      );
    }

    return (
      <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: getColorFromName(article.author.name) }]}>
        <Text style={[styles.avatarText, { color: '#FFFFFF' }]}>
          {article.author.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderThumbnail = () => {
    if (!article.thumbnail) return null;

    if (!thumbnailError) {
      return (
        <Image
          source={{ uri: article.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          onError={() => setThumbnailError(true)}
        />
      );
    }

    return (
      <Surface style={[styles.thumbnail, styles.thumbnailFallback]} elevation={0}>
        <Ionicons name="image-outline" size={32} color={colors.text.secondary} />
      </Surface>
    );
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <MotiView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
        animate={{ scale: pressed ? 0.98 : 1, opacity: pressed ? 0.8 : 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <View style={styles.header}>
          <View style={styles.authorContainer}>
            {renderAvatar()}
            <View style={styles.authorInfo}>
              <View style={styles.authorNameRow}>
                <Text style={[styles.authorName, { color: colors.text.primary }]}>
                  {article.author.name}
                </Text>
                {article.author.verified && (
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.accent}
                    style={styles.verifiedIcon}
                  />
                )}
              </View>
              {article.collection && (
                <View style={styles.collectionBadge}>
                  <Text style={[styles.collectionIcon, { color: colors.text.primary, backgroundColor: colors.accent }]}>
                    {article.collection.icon}
                  </Text>
                  <Text style={[styles.collectionText, { color: colors.text.secondary }]}>
                    In {article.collection.name}
                  </Text>
                  <Text style={[styles.collectionBy, { color: colors.text.secondary }]}> by </Text>
                  <Text style={[styles.collectionAuthor, { color: colors.text.primary }]}>
                    {article.author.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <IconButton
            icon="dots-horizontal"
            size={20}
            iconColor={colors.text.secondary}
            onPress={() => console.log('More options')}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={3}>
              {article.title}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={2}>
              {article.subtitle}
            </Text>
          </View>
          {renderThumbnail()}
        </View>

        <View style={styles.footer}>
          <IconButton
            icon="thumb-down-outline"
            size={18}
            iconColor={colors.text.secondary}
            style={styles.dislikeButton}
            onPress={() => console.log('Dislike')}
          />
          
          <View style={styles.metaContainer}>
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>{article.date}</Text>
            <Ionicons name="hand-left" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>
              {formatNumber(article.claps)}
            </Text>
            <Ionicons name="chatbubble" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>{article.comments}</Text>
          </View>
        </View>
      </MotiView>
    </Pressable>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  collectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  collectionIcon: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 4,
  },
  collectionText: {
    fontSize: 13,
  },
  collectionBy: {
    fontSize: 13,
  },
  collectionAuthor: {
    fontSize: 13,
  },
  content: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  textContent: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    lineHeight: 22,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  thumbnailFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dislikeButton: {
    margin: 0,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
  },
  iconSpacing: {
    marginLeft: 8,
    marginRight: 4,
  },
});
