import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { Language } from '@/hooks/useDemoChat';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export function AppHeader({ language, onToggleLanguage }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <View style={styles.logoBox}>
          <MaterialIcons name="auto-awesome" size={20} color={Colors.accent} />
        </View>
        <View>
          <Text style={styles.brandName}>BotForge</Text>
          <Text style={styles.tagline}>
            {language === 'ar' ? 'منصة إنشاء الوكلاء الذكية' : 'AI Agent Builder Platform'}
          </Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [styles.langBtn, pressed && { opacity: 0.7 }]}
        onPress={onToggleLanguage}
        hitSlop={8}
      >
        <Text style={styles.langText}>{language === 'ar' ? 'EN' : 'AR'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  brandName: {
    color: Colors.textPrimary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  tagline: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
  },
  langBtn: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
});
