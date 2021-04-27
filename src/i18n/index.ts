import i18n, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

// for browser use http backend to load translations and browser lng detector
if (process && !process.release) {
    i18n
      .use(Backend)
      .use(initReactI18next)
      .use(LanguageDetector);
  }


  
export const Init = (locale: string | undefined): Promise<TFunction> => i18n.init({
    fallbackLng: 'en',
    debug: true,
    lng: locale || "",
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    }
});


export default i18n;