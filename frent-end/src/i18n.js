import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    languages: {
      ar: { dir: 'rtl' },
      en: { dir: 'ltr' },
      fr: { dir: 'ltr' },
      gr: { dir: 'ltr' },
      sp: { dir: 'ltr' }
    }
  });

// Handle language direction changes
i18n.on('languageChanged', (lng) => {
  // Store the language preference
  localStorage.setItem('i18nextLng', lng);
  
  // Set the direction based on the language
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
