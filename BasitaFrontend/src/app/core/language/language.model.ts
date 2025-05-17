export type LanguageCode = 'en' | 'ar' | 'tr';

export interface LanguageModel {
    code: LanguageCode;
    label: string;
    direction: 'ltr' | 'rtl';
  }