import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { PricingPlan } from '@/constants/data';
import { Language } from '@/hooks/useDemoChat';

interface PricingCardProps {
  plan: PricingPlan;
  language: Language;
  onSelect: (plan: PricingPlan) => void;
}

export function PricingCard({ plan, language, onSelect }: PricingCardProps) {
  const isEnterprise = plan.id === 'enterprise';
  const features = language === 'ar' ? plan.featuresAr : plan.featuresEn;

  return (
    <View style={[
      styles.card,
      plan.highlighted && styles.cardHighlighted,
    ]}>
      {plan.badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{plan.badge}</Text>
        </View>
      ) : null}

      <Text style={styles.planName}>{language === 'ar' ? plan.nameAr : plan.nameEn}</Text>

      <View style={styles.priceRow}>
        {isEnterprise ? (
          <Text style={styles.priceCustom}>
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </Text>
        ) : (
          <>
            <Text style={styles.price}>{plan.price}</Text>
            <View>
              <Text style={styles.currency}>{plan.currency}</Text>
              <Text style={styles.period}>{plan.period}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.features}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <MaterialIcons
              name="check-circle"
              size={16}
              color={plan.highlighted ? Colors.accent : Colors.success}
            />
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.btn,
          plan.highlighted ? styles.btnPrimary : styles.btnSecondary,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => onSelect(plan)}
      >
        <Text style={[styles.btnText, plan.highlighted && styles.btnTextPrimary]}>
          {isEnterprise
            ? (language === 'ar' ? 'تواصل الآن' : 'Contact Now')
            : (language === 'ar' ? 'اختر هذه الباقة' : 'Choose Plan')}
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
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHighlighted: {
    borderColor: Colors.accent + '99',
    backgroundColor: Colors.surfaceElevated,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  planName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  price: {
    color: Colors.textPrimary,
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    lineHeight: 38,
  },
  priceCustom: {
    color: Colors.primary,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  currency: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  period: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  features: { gap: 10 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    flex: 1,
    lineHeight: 20,
  },
  btn: {
    paddingVertical: 13,
    borderRadius: Radius.md,
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
  },
  btnPrimary: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderColor: Colors.border,
  },
  btnText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  btnTextPrimary: {
    color: Colors.textInverse,
  },
});
