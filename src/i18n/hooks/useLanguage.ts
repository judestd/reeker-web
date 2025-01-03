import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../constants/languages";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: keyof typeof SUPPORTED_LANGUAGES) => {
    i18n.changeLanguage(SUPPORTED_LANGUAGES[lang]);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isReady: i18n.isInitialized,
  };
};
