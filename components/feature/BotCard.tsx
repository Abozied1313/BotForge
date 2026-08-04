import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { BotDomain } from '@/constants/data';
import { Language } from '@/hooks/useDemoChat';

interface BotCardProps {
  bot: BotDomain;
  language: Language;
  onTryDemo: (bot: BotDomain) => void;
}

export function BotCard({ bot, language, onTryDemo }: BotCardProps) {
  return (
    <View style={[styles.card, { borderColor: bot.color + '33' }]}>
      <View style={styles.topRow}>
        <Image source={bot.image} style={styles.avatar} contentFit="cover" transition={200} />
        <View style={[styles.iconBadge, { backgroundColor: bot.color + '22', borderColor: bot.color + '55' }]}>
          <MaterialIcons name={bot.icon as any} size={18} color={bot.color} />
        </View>
      </View>

      <Text style={styles.name}>{language === 'ar' ? bot.nameAr : bot.nameEn}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {language === 'ar' ? bot.descriptionAr : bot.descriptionEn}
      </Text>

      <View style={styles.tags}>
        {bot.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: bot.color + '18' }]}>
            <Text style={[styles.tagText, { color: bot.color }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.demoBtn,
          { backgroundColor: bot.color },
          pressed && { opacity: 0.82, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => onTryDemo(bot)}
      >
        <MaterialIcons name="play-circle-outline" size={18} color="#FFF" />
        <Text style={styles.demoBtnText}>
          {language === 'ar' ? 'جرّب الديمو' : 'Try Demo'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  tagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: Radius.md,
    marginTop: 4,
  },
  demoBtnText: {
    color: '#FFF',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
});
