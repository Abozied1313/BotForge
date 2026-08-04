// Static Data — Demo Bots, Pricing, Templates

export type DomainKey = 'customer' | 'education' | 'medical' | 'sales';

export interface BotDomain {
  id: DomainKey;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  image: any;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  currency: string;
  period: string;
  featuresAr: string[];
  featuresEn: string[];
  highlighted: boolean;
  badge?: string;
}

export interface DemoMessage {
  id: string;
  role: 'user' | 'bot';
  textAr: string;
  textEn: string;
}

export const BOT_DOMAINS: BotDomain[] = [
  {
    id: 'customer',
    nameAr: 'خدمة العملاء',
    nameEn: 'Customer Service',
    descriptionAr: 'وكيل ذكي يتعامل مع استفسارات عملائك بنبرة بشرية دافئة على مدار الساعة',
    descriptionEn: 'Smart agent handling customer inquiries with a warm human tone 24/7',
    icon: 'headset-mic',
    color: '#7C3AED',
    image: require('@/assets/images/bot-customer.png'),
    tags: ['دعم ٢٤/٧', 'ردود تلقائية', 'تصعيد ذكي'],
  },
  {
    id: 'education',
    nameAr: 'تعليم وتدريب',
    nameEn: 'Education & Training',
    descriptionAr: 'مدرّب رقمي يشرح المفاهيم ويجيب على أسئلة الطلاب بأسلوب تفاعلي مبسّط',
    descriptionEn: 'Digital trainer explaining concepts and answering student questions interactively',
    icon: 'school',
    color: '#0EA5E9',
    image: require('@/assets/images/bot-education.png'),
    tags: ['تفاعلي', 'متعدد المواد', 'تتبع التقدم'],
  },
  {
    id: 'medical',
    nameAr: 'طبي وصحي',
    nameEn: 'Medical & Health',
    descriptionAr: 'مساعد صحي يجيب على الاستفسارات الأولية ويوجّه المرضى بمسؤولية وأمان',
    descriptionEn: 'Health assistant answering initial queries and guiding patients safely',
    icon: 'local-hospital',
    color: '#10B981',
    image: require('@/assets/images/bot-medical.png'),
    tags: ['إرشاد آمن', 'أولويات طبية', 'سرية تامة'],
  },
  {
    id: 'sales',
    nameAr: 'مبيعات وتسويق',
    nameEn: 'Sales & Marketing',
    descriptionAr: 'وكيل إقناع يتفاعل مع العملاء المحتملين ويحوّلهم إلى صفقات مكتملة',
    descriptionEn: 'Persuasive agent engaging prospects and converting them into closed deals',
    icon: 'trending-up',
    color: '#F59E0B',
    image: require('@/assets/images/bot-sales.png'),
    tags: ['تحويل عالي', 'متابعة تلقائية', 'تحليل الاهتمام'],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    nameAr: 'المبدئي',
    nameEn: 'Starter',
    price: 299,
    currency: 'SAR',
    period: '/شهر',
    featuresAr: [
      'بوت واحد مخصص',
      'حتى ١٠٠٠ محادثة / شهر',
      'مجال واحد',
      'دعم عبر البريد',
      'تسليم خلال ٤٨ ساعة',
    ],
    featuresEn: [
      '1 Custom Bot',
      'Up to 1,000 chats / month',
      '1 Domain',
      'Email support',
      'Delivery within 48 hours',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    nameAr: 'الاحترافي',
    nameEn: 'Professional',
    price: 799,
    currency: 'SAR',
    period: '/شهر',
    featuresAr: [
      '٣ بوتات مخصصة',
      'حتى ١٠٠٠٠ محادثة / شهر',
      'جميع المجالات',
      'دعم أولوية',
      'تسليم خلال ٢٤ ساعة',
      'تعديلات مجانية',
    ],
    featuresEn: [
      '3 Custom Bots',
      'Up to 10,000 chats / month',
      'All Domains',
      'Priority support',
      'Delivery within 24 hours',
      'Free revisions',
    ],
    highlighted: true,
    badge: 'الأكثر طلباً',
  },
  {
    id: 'enterprise',
    nameAr: 'المؤسسي',
    nameEn: 'Enterprise',
    price: 0,
    currency: 'SAR',
    period: '',
    featuresAr: [
      'بوتات غير محدودة',
      'محادثات غير محدودة',
      'تكامل API مخصص',
      'مدير حساب مخصص',
      'SLA مضمون',
    ],
    featuresEn: [
      'Unlimited Bots',
      'Unlimited Conversations',
      'Custom API Integration',
      'Dedicated Account Manager',
      'Guaranteed SLA',
    ],
    highlighted: false,
  },
];

export const DEMO_CONVERSATIONS: Record<DomainKey, DemoMessage[]> = {
  customer: [
    { id: '1', role: 'bot', textAr: 'أهلاً! أنا هنا لمساعدتك. كيف يمكنني خدمتك اليوم؟', textEn: 'Hello! I\'m here to help. How can I assist you today?' },
    { id: '2', role: 'user', textAr: 'لم أستلم طلبيتي منذ أسبوع', textEn: 'I haven\'t received my order for a week' },
    { id: '3', role: 'bot', textAr: 'أفهم إحباطك تماماً، وأنا آسف على هذا التأخير. لو تكرمت أعطني رقم الطلب وسأتابعه فوراً مع الفريق المختص وأعطيك تحديثاً دقيقاً.', textEn: 'I completely understand your frustration, and I\'m sorry for this delay. If you could give me your order number, I\'ll follow up with our team right away and get you an accurate update.' },
    { id: '4', role: 'user', textAr: 'رقم الطلب: ORD-2024-5891', textEn: 'Order number: ORD-2024-5891' },
    { id: '5', role: 'bot', textAr: 'شكراً! ظهر لي أن الطلب في مرحلة الشحن ومتوقع وصوله خلال يومين. سأرسل لك رابط التتبع الآن على بريدك الإلكتروني. هل هناك شيء آخر تحتاج مساعدة فيه؟', textEn: 'Thank you! I can see the order is in shipping and expected within 2 days. I\'ll send you a tracking link to your email now. Is there anything else I can help you with?' },
  ],
  education: [
    { id: '1', role: 'bot', textAr: 'مرحباً بك! أنا مدرّبك الرقمي. عن أي موضوع تريد التعلم اليوم؟', textEn: 'Welcome! I\'m your digital trainer. What topic would you like to learn about today?' },
    { id: '2', role: 'user', textAr: 'أريد أن أفهم كيف تعمل الشبكات العصبية', textEn: 'I want to understand how neural networks work' },
    { id: '3', role: 'bot', textAr: 'سؤال ممتاز! تخيّل الشبكة العصبية كمجموعة موظفين في شركة، كل موظف يأخذ معلومة ويمررها بعد معالجتها للآخر. الموظف الأول يستقبل البيانات الخام، والأخير يعطيك النتيجة النهائية. هل تريد أبدأ بمثال عملي بسيط؟', textEn: 'Excellent question! Imagine a neural network as a group of employees in a company. Each employee takes information, processes it, and passes it to the next. The first receives raw data, the last gives you the final result. Want to start with a simple practical example?' },
    { id: '4', role: 'user', textAr: 'نعم من فضلك', textEn: 'Yes please' },
    { id: '5', role: 'bot', textAr: 'لنفترض أنك تريد تعليم الذكاء الاصطناعي التمييز بين صور القطط والكلاب. الشبكة تأخذ كل بكسل في الصورة كمدخل، تمرره عبر طبقات من الحسابات، وفي النهاية تقول: "هذه قطة بنسبة ٩٣٪". هل تريد أعمّق في طريقة التدريب؟', textEn: 'Let\'s say you want to teach AI to distinguish between cats and dogs. The network takes each pixel as input, passes it through calculation layers, and finally says: "This is a cat with 93% confidence." Want me to go deeper into training?' },
  ],
  medical: [
    { id: '1', role: 'bot', textAr: 'مرحباً، أنا مساعدك الصحي. أنا هنا للإرشاد والمعلومات العامة. لأي استفسار طارئ يُرجى التواصل مع الطبيب مباشرة.', textEn: 'Hello, I\'m your health assistant. I\'m here for guidance and general information. For any emergency, please contact a doctor directly.' },
    { id: '2', role: 'user', textAr: 'عندي صداع شديد من يومين', textEn: 'I\'ve had a severe headache for two days' },
    { id: '3', role: 'bot', textAr: 'أفهم أن ذلك مزعج جداً. الصداع المستمر ليومين يستحق الانتباه. بضعة أسئلة تساعدني في توجيهك: هل يصاحبه حمى أو غثيان؟ وهل تأثّرت رؤيتك؟', textEn: 'I understand that must be very uncomfortable. A headache lasting two days deserves attention. A few questions to help guide you: Is it accompanied by fever or nausea? Has your vision been affected?' },
    { id: '4', role: 'user', textAr: 'لا حمى، لكن فيه غثيان خفيف', textEn: 'No fever, but there is mild nausea' },
    { id: '5', role: 'bot', textAr: 'الجمع بين الصداع الشديد والغثيان قد يدل على الشقيقة (الصداع النصفي). أنصحك بالراحة في غرفة هادئة ومعتمة، وشرب كميات وافرة من الماء. إذا لم يتحسن الوضع خلال ٢٤ ساعة أو تفاقم، يُفضّل مراجعة طبيب متخصص.', textEn: 'The combination of severe headache and nausea may indicate a migraine. I recommend resting in a quiet, dark room and drinking plenty of water. If it doesn\'t improve within 24 hours or worsens, it\'s best to see a specialist.' },
  ],
  sales: [
    { id: '1', role: 'bot', textAr: 'أهلاً! سعيد بتواصلك معنا. أي منتجاتنا أثار اهتمامك؟', textEn: 'Hello! Glad you reached out. Which of our products caught your interest?' },
    { id: '2', role: 'user', textAr: 'أنا مهتم بالباقة الاحترافية لكن السعر مرتفع شوي', textEn: 'I\'m interested in the Pro package but the price is a bit high' },
    { id: '3', role: 'bot', textAr: 'أقدر تفكيرك تماماً. في الحقيقة معظم عملائنا قالوا نفس الكلام في البداية! لو حسبنا معاً: الباقة الاحترافية توفر لك ١٠ آلاف محادثة شهرياً. لو كل محادثة حوّلت عميلاً بمتوسط ١٠٠ ريال... العائد يغطي التكلفة عشر مرات. هل تريد نرى حسبة مخصصة لنشاطك؟', textEn: 'I completely understand your thinking. In fact, most of our clients said the same thing initially! If we calculate together: the Pro plan gives you 10,000 chats/month. If each chat converts a customer at 100 SAR average... the return covers the cost 10 times over. Want to see a custom calculation for your business?' },
    { id: '4', role: 'user', textAr: 'فكرة جيدة، نشاطي هو متجر إلكتروني', textEn: 'Good idea, my business is an e-commerce store' },
    { id: '5', role: 'bot', textAr: 'ممتاز! المتاجر الإلكترونية هي أكثر من يستفيد من بوتات المبيعات. عميل واحد من كل عشر محادثات = ١٠٠٠ عميل جديد شهرياً. بمتوسط قيمة طلب ٢٠٠ ريال، هذا ٢٠٠,٠٠٠ ريال إضافية مقابل ٧٩٩ ريال. هل نضع جلسة توضيحية مجانية هذا الأسبوع؟', textEn: 'Excellent! E-commerce stores benefit most from sales bots. One customer per 10 chats = 1,000 new customers monthly. At 200 SAR average order value, that\'s 200,000 SAR extra for 799 SAR. Shall we schedule a free demo session this week?' },
  ],
};

export const TONE_OPTIONS = [
  { id: 'formal', labelAr: 'رسمي واحترافي', labelEn: 'Formal & Professional', icon: 'business' },
  { id: 'friendly', labelAr: 'ودود وحيوي', labelEn: 'Friendly & Energetic', icon: 'mood' },
  { id: 'empathetic', labelAr: 'متعاطف وداعم', labelEn: 'Empathetic & Supportive', icon: 'favorite' },
  { id: 'concise', labelAr: 'مختصر ومباشر', labelEn: 'Concise & Direct', icon: 'flash-on' },
];
