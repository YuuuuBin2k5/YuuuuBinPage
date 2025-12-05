import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../locales/translations";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = (path) => {
    return t(language, path);
  };

  return { t: translate, language };
};
