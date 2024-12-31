import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '../locales';
import { DEFAULT_LANGUAGE } from '../constants/languages';

const i18nConfig = {
  resources,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
};

export const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig);

  return i18n;
};