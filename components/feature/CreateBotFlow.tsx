import React from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
  TextInput, Alert, Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { Language } from '@/hooks/useDemoChat';
import { useCreateBot, CreateStep } from '@/hooks/useCreateBot';
import { BOT_DOMAINS, TONE_OPTIONS, PRICING_PLANS } from '@/constants/data';

interface Props {
  language: Language;
}

export function CreateBotFlow({ language }: Props) {
  const { step, config, updateConfig, selectMode, goToReview, goBack, submitOrder, reset } =
    useCreateBot();

  const ar = language === 'ar';

  if (step === 'mode') return <ModeSelect ar={ar} onSelect={selectMode} />;
  if (step === 'beginner') return <BeginnerForm ar={ar} config={config} update={updateConfig} onNext={goToReview} onBack={goBack} />;
  if (step === 'pro') return <ProForm ar={ar} config={config} update={updateConfig} onNext={goToReview} onBack={goBack} />;
  if (step === 'review') return <Review ar={ar} config={config} update={updateConfig} onSubmit={submitOrder} onBack={goBack} />;
  if (step === 'success') return <Success ar={ar} onReset={reset} />;
  return null;
}

// ─── Mode Selection ───────────────────────────────────────────────────────────
function ModeSelect({ ar, onSelect }: { ar: boolean; onSelect: (m: any) => void }) {
  return (
    <View style={ms.root}>
      <Text style={ms.title}>{ar ? 'كيف تريد إنشاء بوتك؟' : 'How do you want to build your bot?'}</Text>
      <Text style={ms.subtitle}>
        {ar ? 'اختر الأسلوب الذي يناسبك' : 'Choose the approach that suits you'}
      </Text>

      <Pressable
        style={({ pressed }) => [ms.card, ms.cardBeginner, pressed && { opacity: 0.85 }]}
        onPress={() => onSelect('beginner')}
      >
        <View style={ms.modeIcon}>
          <MaterialIcons name="lightbulb-outline" size={32} color={Colors.accent} />
        </View>
        <Text style={ms.cardTitle}>{ar ? 'مسار المبتدئين' : 'Beginner Path'}</Text>
        <Text style={ms.cardDesc}>
          {ar
            ? 'صف حلمك أو احتياجك بكلامك الخاص وسنبني البوت المثالي لك'
            : 'Describe your dream or need in your own words and we\'ll build the perfect bot'}
        </Text>
        <View style={ms.cardTag}>
          <MaterialIcons name="chat" size={12} color={Colors.accent} />
          <Text style={ms.cardTagText}>{ar ? 'Text-to-Bot' : 'Text-to-Bot'}</Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [ms.card, ms.cardPro, pressed && { opacity: 0.85 }]}
        onPress={() => onSelect('pro')}
      >
        <View style={[ms.modeIcon, { backgroundColor: Colors.primaryDim }]}>
          <MaterialIcons name="tune" size={32} color={Colors.primaryLight} />
        </View>
        <Text style={ms.cardTitle}>{ar ? 'مسار المحترفين' : 'Professional Path'}</Text>
        <Text style={ms.cardDesc}>
          {ar
            ? 'حدد المدخلات والمخرجات ونبرة الصوت والشخصية بدقة كاملة'
            : 'Define inputs, outputs, tone, and persona with full precision'}
        </Text>
        <View style={[ms.cardTag, { backgroundColor: Colors.primaryDim }]}>
          <MaterialIcons name="settings" size={12} color={Colors.primaryLight} />
          <Text style={[ms.cardTagText, { color: Colors.primaryLight }]}>
            {ar ? 'تخصيص كامل' : 'Full Control'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

// ─── Beginner Form ────────────────────────────────────────────────────────────
function BeginnerForm({ ar, config, update, onNext, onBack }: any) {
  const canContinue = config.dream.trim().length > 20 && config.businessName.trim().length > 1 && config.contactEmail.trim().length > 4;
  return (
    <ScrollView style={f.scroll} contentContainerStyle={f.content} showsVerticalScrollIndicator={false}>
      <StepHeader ar={ar} step="1/2" title={ar ? 'صف بوتك المثالي' : 'Describe Your Ideal Bot'} onBack={onBack} />

      <Label ar={ar} text={ar ? 'اشرح ما تريد تحقيقه من البوت:' : 'Describe what you want the bot to achieve:'} required />
      <TextInput
        style={[f.input, f.textarea]}
        value={config.dream}
        onChangeText={t => update({ dream: t })}
        placeholder={ar
          ? 'مثال: أريد بوت يرد على عملائي في قطاع العقارات بنبرة ودية ويجيب عن أسئلتهم الشائعة...'
          : 'E.g.: I want a bot that responds to my real estate clients in a friendly tone and answers their common questions...'}
        placeholderTextColor={Colors.textMuted}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <Label ar={ar} text={ar ? 'اسم نشاطك التجاري:' : 'Business Name:'} required />
      <TextInput
        style={f.input}
        value={config.businessName}
        onChangeText={t => update({ businessName: t })}
        placeholder={ar ? 'مثال: شركة النجاح' : 'E.g.: Success Company'}
        placeholderTextColor={Colors.textMuted}
      />

      <Label ar={ar} text={ar ? 'البريد الإلكتروني للتواصل:' : 'Contact Email:'} required />
      <TextInput
        style={f.input}
        value={config.contactEmail}
        onChangeText={t => update({ contactEmail: t })}
        placeholder={ar ? 'name@company.com' : 'name@company.com'}
        placeholderTextColor={Colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable
        style={({ pressed }) => [f.btn, !canContinue && f.btnDisabled, pressed && canContinue && { opacity: 0.85 }]}
        onPress={canContinue ? onNext : undefined}
        disabled={!canContinue}
      >
        <Text style={f.btnText}>{ar ? 'التالي: مراجعة الطلب' : 'Next: Review Order'}</Text>
        <MaterialIcons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </ScrollView>
  );
}

// ─── Pro Form ─────────────────────────────────────────────────────────────────
function ProForm({ ar, config, update, onNext, onBack }: any) {
  const canContinue = config.domain && config.tone && config.inputs.trim() && config.outputs.trim() && config.businessName.trim() && config.contactEmail.trim();

  return (
    <ScrollView style={f.scroll} contentContainerStyle={f.content} showsVerticalScrollIndicator={false}>
      <StepHeader ar={ar} step="1/2" title={ar ? 'ضبط البوت الاحترافي' : 'Configure Your Bot'} onBack={onBack} />

      <Label ar={ar} text={ar ? 'المجال:' : 'Domain:'} required />
      <View style={f.pills}>
        {BOT_DOMAINS.map(d => (
          <Pressable
            key={d.id}
            style={({ pressed }) => [
              f.pill,
              config.domain === d.id && { backgroundColor: d.color, borderColor: d.color },
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => update({ domain: d.id })}
          >
            <MaterialIcons name={d.icon as any} size={14} color={config.domain === d.id ? '#FFF' : Colors.textSecondary} />
            <Text style={[f.pillText, config.domain === d.id && { color: '#FFF' }]}>
              {ar ? d.nameAr : d.nameEn}
            </Text>
          </Pressable>
        ))}
      </View>

      <Label ar={ar} text={ar ? 'نبرة الصوت:' : 'Tone of Voice:'} required />
      <View style={f.pills}>
        {TONE_OPTIONS.map(t => (
          <Pressable
            key={t.id}
            style={({ pressed }) => [
              f.pill,
              config.tone === t.id && { backgroundColor: Colors.primary, borderColor: Colors.primary },
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => update({ tone: t.id })}
          >
            <MaterialIcons name={t.icon as any} size={14} color={config.tone === t.id ? '#FFF' : Colors.textSecondary} />
            <Text style={[f.pillText, config.tone === t.id && { color: '#FFF' }]}>
              {ar ? t.labelAr : t.labelEn}
            </Text>
          </Pressable>
        ))}
      </View>

      <Label ar={ar} text={ar ? 'المدخلات (ما يسأله المستخدم):' : 'Inputs (what users ask):'} required />
      <TextInput
        style={[f.input, f.textareaSm]}
        value={config.inputs}
        onChangeText={t => update({ inputs: t })}
        placeholder={ar ? 'مثال: أسئلة عن المنتجات، الأسعار، الشحن...' : 'E.g.: questions about products, prices, shipping...'}
        placeholderTextColor={Colors.textMuted}
        multiline
        textAlignVertical="top"
      />

      <Label ar={ar} text={ar ? 'المخرجات (ما يجيب به البوت):' : 'Outputs (how the bot responds):'} required />
      <TextInput
        style={[f.input, f.textareaSm]}
        value={config.outputs}
        onChangeText={t => update({ outputs: t })}
        placeholder={ar ? 'مثال: ردود مفصلة، روابط، إحالة لموظف...' : 'E.g.: detailed replies, links, escalate to agent...'}
        placeholderTextColor={Colors.textMuted}
        multiline
        textAlignVertical="top"
      />

      <Label ar={ar} text={ar ? 'شخصية البوت (اختياري):' : 'Bot Persona (optional):'} />
      <TextInput
        style={f.input}
        value={config.persona}
        onChangeText={t => update({ persona: t })}
        placeholder={ar ? 'مثال: اسمه رائد، خبير في التقنية...' : 'E.g.: Named Alex, tech-savvy expert...'}
        placeholderTextColor={Colors.textMuted}
      />

      <Label ar={ar} text={ar ? 'اسم نشاطك التجاري:' : 'Business Name:'} required />
      <TextInput
        style={f.input}
        value={config.businessName}
        onChangeText={t => update({ businessName: t })}
        placeholder={ar ? 'مثال: شركة النجاح' : 'E.g.: Success Company'}
        placeholderTextColor={Colors.textMuted}
      />

      <Label ar={ar} text={ar ? 'البريد الإلكتروني:' : 'Contact Email:'} required />
      <TextInput
        style={f.input}
        value={config.contactEmail}
        onChangeText={t => update({ contactEmail: t })}
        placeholder="name@company.com"
        placeholderTextColor={Colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable
        style={({ pressed }) => [f.btn, !canContinue && f.btnDisabled, pressed && canContinue && { opacity: 0.85 }]}
        onPress={canContinue ? onNext : undefined}
        disabled={!canContinue}
      >
        <Text style={f.btnText}>{ar ? 'التالي: مراجعة الطلب' : 'Next: Review Order'}</Text>
        <MaterialIcons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </ScrollView>
  );
}

// ─── Review ───────────────────────────────────────────────────────────────────
function Review({ ar, config, update, onSubmit, onBack }: any) {
  const selectedPlan = PRICING_PLANS.find(p => p.id === config.selectedPlan) ?? PRICING_PLANS[1];

  return (
    <ScrollView style={f.scroll} contentContainerStyle={f.content} showsVerticalScrollIndicator={false}>
      <StepHeader ar={ar} step="2/2" title={ar ? 'مراجعة الطلب' : 'Review Order'} onBack={onBack} />

      <View style={r.section}>
        <Text style={r.sectionTitle}>{ar ? 'تفاصيل الطلب' : 'Order Details'}</Text>
        <Row label={ar ? 'النوع' : 'Type'} value={config.mode === 'beginner' ? (ar ? 'مبتدئ' : 'Beginner') : (ar ? 'محترف' : 'Professional')} />
        <Row label={ar ? 'الاسم التجاري' : 'Business'} value={config.businessName} />
        <Row label={ar ? 'البريد' : 'Email'} value={config.contactEmail} />
        {config.mode === 'beginner'
          ? <Row label={ar ? 'الوصف' : 'Description'} value={config.dream.slice(0, 60) + '...'} />
          : <>
            <Row label={ar ? 'المجال' : 'Domain'} value={BOT_DOMAINS.find(d => d.id === config.domain)?.[ar ? 'nameAr' : 'nameEn'] ?? ''} />
            <Row label={ar ? 'النبرة' : 'Tone'} value={TONE_OPTIONS.find(t => t.id === config.tone)?.[ar ? 'labelAr' : 'labelEn'] ?? ''} />
          </>
        }
      </View>

      <View style={r.section}>
        <Text style={r.sectionTitle}>{ar ? 'اختر الباقة' : 'Select Plan'}</Text>
        {PRICING_PLANS.filter(p => p.id !== 'enterprise').map(plan => (
          <Pressable
            key={plan.id}
            style={[r.planRow, config.selectedPlan === plan.id && r.planRowSelected]}
            onPress={() => update({ selectedPlan: plan.id })}
          >
            <View style={[r.radio, config.selectedPlan === plan.id && r.radioSelected]}>
              {config.selectedPlan === plan.id && <View style={r.radioDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={r.planName}>{ar ? plan.nameAr : plan.nameEn}</Text>
              <Text style={r.planPrice}>{plan.price} {plan.currency}{plan.period}</Text>
            </View>
            {plan.highlighted && (
              <View style={r.planBadge}>
                <Text style={r.planBadgeText}>{ar ? 'الأفضل' : 'Best'}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={r.totalRow}>
        <Text style={r.totalLabel}>{ar ? 'الإجمالي:' : 'Total:'}</Text>
        <Text style={r.totalPrice}>{selectedPlan.price} {selectedPlan.currency}{selectedPlan.period}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [f.btn, pressed && { opacity: 0.85 }]}
        onPress={onSubmit}
      >
        <MaterialIcons name="check-circle" size={18} color="#FFF" />
        <Text style={f.btnText}>{ar ? 'تأكيد الطلب والدفع' : 'Confirm Order & Pay'}</Text>
      </Pressable>

      <Text style={r.note}>
        {ar
          ? '* سيتواصل معك فريقنا خلال ٢٤ ساعة لإتمام عملية الدفع وبدء التطوير'
          : '* Our team will contact you within 24 hours to complete payment and start development'}
      </Text>
    </ScrollView>
  );
}

// ─── Success ─────────────────────────────────────────────────────────────────
function Success({ ar, onReset }: { ar: boolean; onReset: () => void }) {
  return (
    <View style={s.root}>
      <View style={s.iconWrap}>
        <MaterialIcons name="check-circle" size={72} color={Colors.success} />
      </View>
      <Text style={s.title}>{ar ? 'تم استلام طلبك!' : 'Order Received!'}</Text>
      <Text style={s.desc}>
        {ar
          ? 'شكراً! سيتواصل معك فريقنا المتخصص خلال ٢٤ ساعة لبدء بناء بوتك المخصص.'
          : 'Thank you! Our specialized team will contact you within 24 hours to start building your custom bot.'}
      </Text>
      <View style={s.stepsCard}>
        {(ar
          ? ['استلمنا طلبك بنجاح', 'فريقنا يراجع التفاصيل', 'تواصل معك خلال ٢٤ ساعة', 'بناء البوت وتسليمه']
          : ['Order received successfully', 'Team reviews your details', 'Contact within 24 hours', 'Bot built and delivered']
        ).map((step, i) => (
          <View key={i} style={s.stepRow}>
            <View style={[s.stepNum, i === 0 && { backgroundColor: Colors.success }]}>
              {i === 0
                ? <MaterialIcons name="check" size={12} color="#FFF" />
                : <Text style={s.stepNumText}>{i + 1}</Text>}
            </View>
            <Text style={[s.stepText, i === 0 && { color: Colors.success }]}>{step}</Text>
          </View>
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [s.btn, pressed && { opacity: 0.8 }]}
        onPress={onReset}
      >
        <Text style={s.btnText}>{ar ? 'إنشاء طلب جديد' : 'Create New Order'}</Text>
      </Pressable>
    </View>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function StepHeader({ ar, step, title, onBack }: any) {
  return (
    <View style={sh.row}>
      <Pressable onPress={onBack} hitSlop={8} style={({ pressed }) => [sh.back, pressed && { opacity: 0.6 }]}>
        <MaterialIcons name="arrow-back" size={22} color={Colors.textSecondary} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={sh.step}>{ar ? `خطوة ${step}` : `Step ${step}`}</Text>
        <Text style={sh.title}>{title}</Text>
      </View>
    </View>
  );
}

function Label({ ar, text, required }: { ar: boolean; text: string; required?: boolean }) {
  return (
    <Text style={f.label}>
      {text}{required ? ' *' : ''}
    </Text>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={r.row}>
      <Text style={r.rowLabel}>{label}</Text>
      <Text style={r.rowValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const ms = StyleSheet.create({
  root: { flex: 1, padding: Spacing.md, gap: Spacing.md },
  title: { color: Colors.textPrimary, fontSize: FontSize.xxl, fontWeight: FontWeight.bold, textAlign: 'center' },
  subtitle: { color: Colors.textSecondary, fontSize: FontSize.sm, textAlign: 'center', marginBottom: 4 },
  card: {
    borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.md,
    gap: 10, backgroundColor: Colors.surface,
  },
  cardBeginner: { borderColor: Colors.accent + '55' },
  cardPro: { borderColor: Colors.primary + '55' },
  modeIcon: {
    width: 60, height: 60, borderRadius: Radius.md,
    backgroundColor: Colors.accentDim,
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
  cardDesc: { color: Colors.textSecondary, fontSize: FontSize.sm, lineHeight: 20 },
  cardTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.accentDim, paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: Radius.full, alignSelf: 'flex-start',
  },
  cardTagText: { color: Colors.accent, fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
});

const f = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.md, gap: 12, paddingBottom: 40 },
  label: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  input: {
    backgroundColor: Colors.surfaceElevated, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: Spacing.md, paddingVertical: 12,
    color: Colors.textPrimary, fontSize: FontSize.sm,
  },
  textarea: { minHeight: 120, paddingTop: 12 },
  textareaSm: { minHeight: 80, paddingTop: 12 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surfaceElevated,
  },
  pillText: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  btn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingVertical: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
  },
  btnDisabled: { backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.border },
  btnText: { color: '#FFF', fontSize: FontSize.md, fontWeight: FontWeight.semibold },
});

const r = StyleSheet.create({
  section: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.border, padding: Spacing.md, gap: 8,
  },
  sectionTitle: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: FontWeight.semibold, marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  rowLabel: { color: Colors.textMuted, fontSize: FontSize.sm },
  rowValue: { color: Colors.textPrimary, fontSize: FontSize.sm, flex: 1, textAlign: 'right' },
  planRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surfaceElevated,
  },
  planRowSelected: { borderColor: Colors.primary },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  planName: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  planPrice: { color: Colors.textSecondary, fontSize: FontSize.xs },
  planBadge: { backgroundColor: Colors.accent, borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  planBadgeText: { color: Colors.textInverse, fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 4,
  },
  totalLabel: { color: Colors.textSecondary, fontSize: FontSize.md },
  totalPrice: { color: Colors.accent, fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  note: { color: Colors.textMuted, fontSize: FontSize.xs, textAlign: 'center', lineHeight: 18 },
});

const s = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg, gap: Spacing.md },
  iconWrap: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.successDim, alignItems: 'center', justifyContent: 'center',
  },
  title: { color: Colors.textPrimary, fontSize: FontSize.xxl, fontWeight: FontWeight.bold, textAlign: 'center' },
  desc: { color: Colors.textSecondary, fontSize: FontSize.sm, textAlign: 'center', lineHeight: 22 },
  stepsCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md, gap: 12, width: '100%',
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepNum: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumText: { color: Colors.textMuted, fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  stepText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  btn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingVertical: 14, paddingHorizontal: Spacing.xl,
    alignItems: 'center', width: '100%',
  },
  btnText: { color: '#FFF', fontSize: FontSize.md, fontWeight: FontWeight.semibold },
});

const sh = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 },
  back: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.surfaceElevated, alignItems: 'center', justifyContent: 'center',
  },
  step: { color: Colors.textMuted, fontSize: FontSize.xs },
  title: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
});
