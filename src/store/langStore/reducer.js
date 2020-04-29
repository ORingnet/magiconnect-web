import * as actionTypes from './actionTypes';
import { twMessages, enMessages, cnMessages } from '../../i18n';
const detectLanguage = (
  navigator.language ||
  navigator.userLanguage ||
  navigator.browserLanguage ||
  navigator.systemLanguage
).toLowerCase();
const language = () => {
  switch (detectLanguage) {
    case 'zh-tw': {
      return {
        locale: 'zh',
        type: 'tw',
        messages: twMessages
      };
    }
    case 'zh-cn': {
      return {
        locale: 'zh',
        type: 'cn',
        messages: cnMessages
      };
    }
    case 'en': {
      return {
        locale: 'en',
        type: 'en',
        messages: enMessages
      };
    }
    default: {
      return {
        locale: 'en',
        type: 'en',
        messages: enMessages
      };
    }
  }
};
const { locale, messages, type } = language();
const initialState = {
  locale,
  type,
  messages,
  changeStatus: false
};
const mapLang = lang => {
  switch (lang) {
    case 'tw':
      return { locale: 'zh', type: 'tw', messages: twMessages, changeStatus: true };
    case 'cn':
      return { locale: 'zh', type: 'cn', messages: cnMessages, changeStatus: true };
    case 'en':
      return { locale: lang, type: 'en', messages: enMessages, changeStatus: true };
    default:
      return { locale: lang, type: 'en', messages: enMessages };
  }
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANG: {
      return { ...mapLang(action.lang) };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
