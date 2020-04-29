import * as actionTypes from './actionTypes';
export const actionCreators = {
  changeLang: lang => dispath => {
    dispath({ type: actionTypes.CHANGE_LANG, lang });
  }
};
