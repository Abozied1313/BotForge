// BotForge Design System — Theme Tokens

export const Colors = {
  // Base
  background: '#080B14',
  surface: '#0F1525',
  surfaceElevated: '#16203A',
  border: '#1E2D4A',
  borderSubtle: '#131D33',

  // Brand
  primary: '#7C3AED',       // Purple
  primaryLight: '#9D5FF3',
  primaryDim: '#2D1B69',
  accent: '#F59E0B',        // Gold
  accentLight: '#FCD34D',
  accentDim: '#451A03',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  textInverse: '#080B14',

  // Semantic
  success: '#10B981',
  successDim: '#064E3B',
  warning: '#F59E0B',
  warningDim: '#451A03',
  error: '#EF4444',
  errorDim: '#450A0A',
  info: '#3B82F6',
  infoDim: '#1E3A8A',

  // Domain Colors
  customer: '#7C3AED',
  customerDim: '#2D1B69',
  education: '#0EA5E9',
  educationDim: '#0C4A6E',
  medical: '#10B981',
  medicalDim: '#064E3B',
  sales: '#F59E0B',
  salesDim: '#451A03',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
