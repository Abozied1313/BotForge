import { useState, useCallback } from 'react';
import { DemoMessage, DomainKey, DEMO_CONVERSATIONS } from '@/constants/data';

export type Language = 'ar' | 'en';

export function useDemoChat(domain: DomainKey, language: Language) {
  const predefined = DEMO_CONVERSATIONS[domain];
  const [messages, setMessages] = useState<DemoMessage[]>([predefined[0]]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text?: string) => {
    const msgText = text ?? inputText.trim();
    if (!msgText) return;

    const userMsg: DemoMessage = {
      id: Date.now().toString(),
      role: 'user',
      textAr: msgText,
      textEn: msgText,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot reply from predefined flow
    const nextStep = step + 1;
    const nextBotStep = nextStep + 1;
    const botReply = predefined[nextBotStep] ?? {
      id: 'fallback',
      role: 'bot' as const,
      textAr: 'شكراً على رسالتك! هذا الوكيل يعمل بنظام AI كامل في النسخة المخصصة.',
      textEn: 'Thanks for your message! This agent runs on full AI in the custom version.',
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
      setStep(nextBotStep);
    }, 1200);
  }, [inputText, step, predefined]);

  const resetChat = useCallback(() => {
    setMessages([predefined[0]]);
    setStep(0);
    setInputText('');
    setIsTyping(false);
  }, [predefined]);

  const getSuggestedReply = useCallback(() => {
    const nextUserStep = step + 1;
    return predefined[nextUserStep]?.role === 'user'
      ? (language === 'ar' ? predefined[nextUserStep].textAr : predefined[nextUserStep].textEn)
      : null;
  }, [step, predefined, language]);

  return { messages, inputText, setInputText, sendMessage, resetChat, isTyping, getSuggestedReply };
}
