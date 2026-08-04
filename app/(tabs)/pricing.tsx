import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert, Platform, Modal,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { PRICING_PLANS, PricingPlan } from '@/constants/data';
import { PricingCard } from '@/components/feature/PricingCard';
import { AppHeader } from '@/components/layout/AppHeader';
import { Language } from '@/hooks/useDemoChat';

export default function PricingScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<Language>('ar');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const ar = language === 'ar';

  const handleSelect = (plan: PricingPlan) => {
    const msg = plan.id === 'enterprise'
      ? (ar ? 'سيتواصل معك فريقنا لمناقشة باقة مؤسسية مخصصة.' : 'Our team will contact you to discuss a custom enterprise plan.')
      : (ar
        ? `تم اختيار باقة "${ar ? plan.nameAr : plan.nameEn}". انتقل لتبويب الإنشاء لإكمال طلبك.`
        : `"${plan.nameEn}" plan selected. Go to the Create tab to complete your order.`);

    if (Platform.OS === 'web') {
      setAlertMsg(msg);
      setAlertVisible(true);
    } else {
      Alert.alert(ar ? 'تم الاختيار' : 'Plan Selected', msg);
    }
  };

  const faqs = ar ? [
    { q: 'هل تشمل الأسعار مفاتيح API؟', a: 'نعم، جميع الباقات تشمل مفاتيح API والبنية التحتية الكاملة.' },
    { q: 'كيف أطلب تعديلاً بعد التسليم؟', a: 'تواصل معنا عبر البريد الإلكتروني وسنعالج طلبك خلال ٢٤ ساعة.' },
    { q: 'هل يمكنني ترقية باقتي لاحقاً؟', a: 'نعم، يمكنك الترقية في أي وقت مع احتساب الفارق بالتناسب.' },
  ] : [
    { q: 'Do prices include API keys?', a: 'Yes, all plans include API keys and full infrastructure.' },
    { q: 'How do I request changes after delivery?', a: 'Contact us via email and we will process your request within 24 hours.' },
    { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade anytime with prorated billing.' },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader language={language} onToggleLanguage={() => setLanguage(l => l === 'ar' ? 'en' : 'ar')} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{ar ? 'باقات الأسعار' : 'Pricing Plans'}</Text>
          <Text style={styles.subtitle}>
            {ar ? 'شفافية كاملة — بدون رسوم خفية' : 'Full transparency — no hidden fees'}
          </Text>
        </View>

        {PRICING_PLANS.map(plan => (
          <PricingCard key={plan.id} plan={plan} language={language} onSelect={handleSelect} />
        ))}

        {/* Guarantee banner */}
        <View style={styles.guarantee}>
          <MaterialIcons name="verified-user" size={28} color={Colors.success} />
          <View style={{ flex: 1 }}>
            <Text style={styles.guaranteeTitle}>
              {ar ? 'ضمان الاسترداد ١٤ يوماً' : '14-Day Money Back Guarantee'}
            </Text>
            <Text style={styles.guaranteeText}>
              {ar
                ? 'إذا لم تكن راضياً عن البوت خلال ١٤ يوماً، نسترد لك كامل المبلغ'
                : 'If you are not satisfied within 14 days, we will refund you in full'}
            </Text>
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.faqTitle}>{ar ? 'الأسئلة الشائعة' : 'FAQ'}</Text>
        {faqs.map((f, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQ}>{f.q}</Text>
            <Text style={styles.faqA}>{f.a}</Text>
          </View>
        ))}

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>

      {/* Web Alert */}
      {Platform.OS === 'web' && (
        <Modal visible={alertVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>{ar ? 'تم الاختيار' : 'Plan Selected'}</Text>
              <Text style={styles.modalMsg}>{alertMsg}</Text>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setAlertVisible(false)}
              >
                <Text style={styles.modalBtnText}>{ar ? 'حسناً' : 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  header: { gap: 4 },
  title: { color: Colors.textPrimary, fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  subtitle: { color: Colors.textSecondary, fontSize: FontSize.sm },
  guarantee: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.successDim, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.success + '44', padding: Spacing.md,
  },
  guaranteeTitle: { color: Colors.success, fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  guaranteeText: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20, marginTop: 2 },
  faqTitle: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.semibold },
  faqItem: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, padding: Spacing.md, gap: 6,
  },
  faqQ: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  faqA: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: Colors.surfaceElevated, padding: 24, borderRadius: Radius.lg, width: 300, gap: 12, borderWidth: 1, borderColor: Colors.border },
  modalTitle: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  modalMsg: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 22 },
  modalBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, padding: 12, alignItems: 'center' },
  modalBtnText: { color: '#FFF', fontWeight: FontWeight.semibold },
});
