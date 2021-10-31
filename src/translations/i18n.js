import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";
import { translations } from './translations';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: "en", // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;
