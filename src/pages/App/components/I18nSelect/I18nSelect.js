import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/langStore/action';
import { actionCreators as appActionCreators } from '../../../../store/appStore/action';
import { Input } from 'reactstrap';
const langData = [
  {
    id: 'tw',
    text: '繁體中文'
  },
  {
    id: 'cn',
    text: '简体中文'
  },
  {
    id: 'en',
    text: 'English'
  }
];
const I18nSelect = ({ langActionCreators, appActionCreators, locale, type }) => {
  const handleLang = e => {
    const { value } = e.target;
    langActionCreators.changeLang(value);
    if (window.innerWidth < 1024) {
      appActionCreators.toggleSiderbar();
    }
  };
  const renderLang = langData.map(lang => (
    <option key={lang.id} value={lang.id}>
      {lang.text}
    </option>
  ));
  return (
    <Input type='select' onChange={handleLang} value={type}>
      {renderLang}
    </Input>
  );
};

export default connect(
  state => state.lang,
  dispatch => ({
    langActionCreators: bindActionCreators(actionCreators, dispatch),
    appActionCreators: bindActionCreators(appActionCreators, dispatch)
  })
)(I18nSelect);
