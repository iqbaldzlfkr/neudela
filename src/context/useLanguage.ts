import { useContext } from 'react';
import { Language, translations } from '../i18n/translations';
import { LanguageContext, LanguageContextType } from './LanguageContext';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations['en']
    };
  }
  return context;
};
