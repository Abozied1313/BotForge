import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Pressable, FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { BOT_DOMAINS, BotDomain } from '@/constants/data';
import { BotCard } from '@/components/feature/BotCard';
import { DemoChatModal } from '@/components/feature/DemoChatModal';
import { AppHeader } from '@/components/layout/AppHeader';
import { Language } from '@/hooks/useDemoChat';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<Language>('ar');
  const [selectedBot, setSelectedBot] = useState<BotDomain | null>(null);
  const ar = language === 'ar';

  const toggleLanguage = () => setLanguage(l => l === 'ar' ? 'en' : 'ar');

  const stats = [
    { value: '+٢٠٠', label: ar ? 'بوت مُسلَّم' : '200+ Bots Delivered', icon: 'smart-toy' as const },
    { value: '٢٤س', label: ar ? 'وقت التسليم' : '24h Delivery', icon: 'timer' as const },
    { value: '٩٨٪', label: ar ? 'رضا العملاء' : 'Client Satisfaction', icon: 'star' as const },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader language={language} onToggleLanguage={toggleLanguage} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/hero-banner.png')}
            style={styles.heroBg}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <MaterialIcons name="auto-awesome" size={13} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>
                {ar ? 'منصة وكلاء AI متخصصة' : 'Specialized AI Agent Platform'}
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              {ar ? 'بوتك الذكي\nجاهز خلال ٢٤ ساعة' : 'Your AI Bot\nReady in 24 Hours'}
            </Text>
            <Text style={styles.heroSubtitle}>
              {ar
                ? 'نبني وكلاء AI بنبرة بشرية طبيعية لنشاطك التجاري — بدون تعقيد'
                : 'We build AI agents with a natural human tone for your business — without complexity'}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <MaterialIcons name={s.icon} size={22} color={Colors.accent} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{ar ? 'معرض الديمو' : 'Demo Gallery'}</Text>
          <Text style={styles.sectionSub}>
            {ar ? 'جرّب بوت من كل مجال' : 'Try a bot from each domain'}
          </Text>
        </View>

        {/* Bot Cards */}
        <View style={styles.grid}>
          {BOT_DOMAINS.map(bot => (
            <BotCard key={bot.id} bot={bot} language={language} onTryDemo={setSelectedBot} />
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaBanner}>
          <MaterialIcons name="bolt" size={28} color={Colors.accent} />
          <Text style={styles.ctaTitle}>
            {ar ? 'جاهز لبوتك المخصص؟' : 'Ready for Your Custom Bot?'}
          </Text>
          <Text style={styles.ctaDesc}>
            {ar
              ? 'ابدأ الآن من تبويب الإنشاء واستلم بوتك خلال ٢٤ ساعة فقط'
              : 'Start now from the Create tab and receive your bot within 24 hours'}
          </Text>
        </View>

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>

      <DemoChatModal
        visible={!!selectedBot}
        bot={selectedBot}
        language={language}
        onClose={() => setSelectedBot(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { gap: Spacing.md },

  // Hero
  hero: { marginHorizontal: Spacing.md, marginTop: Spacing.md, borderRadius: Radius.xl, overflow: 'hidden', minHeight: 200 },
  heroBg: { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute', width: '100%', height: '100%',
    backgroundColor: 'rgba(8,11,20,0.6)',
  },
  heroContent: { padding: Spacing.lg, gap: 10 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.accentDim, paddingHorizontal: 12,
    paddingVertical: 4, borderRadius: Radius.full, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: Colors.accent + '55',
  },
  heroBadgeText: { color: Colors.accent, fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
  heroTitle: {
    color: Colors.textPrimary, fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold, lineHeight: 40,
  },
  heroSubtitle: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 22 },

  // Stats
  statsRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.md, gap: Spacing.sm,
  },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.sm, alignItems: 'center', gap: 4,
  },
  statValue: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  statLabel: { color: Colors.textMuted, fontSize: 10, textAlign: 'center', lineHeight: 14 },

  // Section
  sectionHeader: { paddingHorizontal: Spacing.md, gap: 2 },
  sectionTitle: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
  sectionSub: { color: Colors.textSecondary, fontSize: FontSize.sm },
  grid: { paddingHorizontal: Spacing.md, gap: Spacing.sm },

  // CTA
  ctaBanner: {
    marginHorizontal: Spacing.md, backgroundColor: Colors.primaryDim,
    borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.primary + '55',
    padding: Spacing.md, alignItems: 'center', gap: 8,
  },
  ctaTitle: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.bold, textAlign: 'center' },
  ctaDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, textAlign: 'center', lineHeight: 20 },
});
