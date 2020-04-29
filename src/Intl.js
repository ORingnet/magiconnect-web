import React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import RootRouter from './rootRouter';
addLocaleData([...en, ...zh]);

const Intl = ({ locale, messages }) => {
  return (
    <IntlProvider key={locale} locale={locale} messages={messages}>
      <RootRouter />
    </IntlProvider>
  );
};

export default connect(({ lang: { locale, messages } }) => ({
  locale,
  messages
}))(Intl);
