import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import PL from './pl.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  pl: PL
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'pl',

    keySeparator: '.', // separator used to move inside nesting: COMPONENTS.SEARCH.SUBMIT_BUTTON_LABEL

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
