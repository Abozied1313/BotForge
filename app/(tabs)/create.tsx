import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants/theme';
import { CreateBotFlow } from '@/components/feature/CreateBotFlow';
import { AppHeader } from '@/components/layout/AppHeader';
import { Language } from '@/hooks/useDemoChat';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<Language>('ar');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader language={language} onToggleLanguage={() => setLanguage(l => l === 'ar' ? 'en' : 'ar')} />
      <View style={styles.titleBar}>
        <Text style={styles.pageTitle}>
          {language === 'ar' ? 'إنشاء بوت مخصص' : 'Create Custom Bot'}
        </Text>
        <Text style={styles.pageSubtitle}>
          {language === 'ar' ? 'التسليم خلال ٢٤ ساعة مضمون' : 'Guaranteed 24-hour delivery'}
        </Text>
      </View>
      <View style={styles.flow}>
        <CreateBotFlow language={language} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  titleBar: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  pageTitle: { color: Colors.textPrimary, fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  pageSubtitle: { color: Colors.textSecondary, fontSize: FontSize.sm },
  flow: { flex: 1 },
});
