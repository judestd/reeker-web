import { TFunction } from 'i18next';

export const formatTranslationKey = (key: string, namespace?: string): string => {
  return namespace ? `${namespace}:${key}` : key;
};

export const translateWithFallback = (
  t: TFunction,
  key: string,
  fallback: string,
  options?: Record<string, any>
): string => {
  const translation = t(key, options);
  return translation === key ? fallback : translation;
};