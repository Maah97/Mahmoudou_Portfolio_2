import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLngs = {
    en: "English",
    fr: "Français",
  };

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    supportedLngs: Object.keys(supportedLngs),
    returnObjects: true,
    backend: {
      loadPath: '/public/locales/{{lng}}/translation.json'
  }
});
export default i18n;