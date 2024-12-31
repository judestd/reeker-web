export const SUPPORTED_LANGUAGES = {
  VI: 'vi',
  EN: 'en'
} as const;

export const LANGUAGE_LABELS = {
  [SUPPORTED_LANGUAGES.VI]: 'Tiếng Việt',
  [SUPPORTED_LANGUAGES.EN]: 'English'
} as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.VI;