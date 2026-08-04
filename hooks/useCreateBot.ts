import { useState, useCallback } from 'react';

export type CreateStep = 'mode' | 'beginner' | 'pro' | 'review' | 'success';
export type CreateMode = 'beginner' | 'pro' | null;

export interface BotConfig {
  mode: CreateMode;
  // Beginner fields
  dream: string;
  // Pro fields
  domain: string;
  tone: string;
  inputs: string;
  outputs: string;
  persona: string;
  // Shared
  businessName: string;
  contactEmail: string;
  selectedPlan: string;
}

const initialConfig: BotConfig = {
  mode: null,
  dream: '',
  domain: '',
  tone: '',
  inputs: '',
  outputs: '',
  persona: '',
  businessName: '',
  contactEmail: '',
  selectedPlan: 'pro',
};

export function useCreateBot() {
  const [step, setStep] = useState<CreateStep>('mode');
  const [config, setConfig] = useState<BotConfig>(initialConfig);

  const updateConfig = useCallback((fields: Partial<BotConfig>) => {
    setConfig(prev => ({ ...prev, ...fields }));
  }, []);

  const selectMode = useCallback((mode: CreateMode) => {
    updateConfig({ mode });
    setStep(mode === 'beginner' ? 'beginner' : 'pro');
  }, [updateConfig]);

  const goToReview = useCallback(() => setStep('review'), []);
  const goBack = useCallback(() => {
    if (step === 'review') setStep(config.mode === 'beginner' ? 'beginner' : 'pro');
    else if (step === 'beginner' || step === 'pro') setStep('mode');
  }, [step, config.mode]);

  const submitOrder = useCallback(() => {
    setStep('success');
  }, []);

  const reset = useCallback(() => {
    setStep('mode');
    setConfig(initialConfig);
  }, []);

  return { step, config, updateConfig, selectMode, goToReview, goBack, submitOrder, reset };
}
