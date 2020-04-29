import React, { useEffect, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/appStore/action';
import { withRouter, Switch, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as ROUTES from '../../router';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NewsModal from './components/NewsModal';
import MyConnect from '../MyConnect';
import Logs from '../Logs';
// import AllNews from '../AllNews';
import LogoImg from '../../assets/img/logo.png';
import { ToastContainer } from 'react-toastify';
import { StyledBackground, StyledSpinnerBox } from './StyledApp';
import { Spinner } from 'reactstrap';
const App = ({ getAccountInfoStatus, getAccountInfoAction, getNews, history }) => {
  useEffect(() => {
    getAccountInfoAction(history);
  }, [getAccountInfoAction, history]);
  useEffect(() => {
    getNews();
  }, [getNews]);
  const renderGetAccountInfo = () => {
    if (getAccountInfoStatus) {
      return (
        <Fragment>
          <Header />
          <StyledBackground>
            <Sidebar />
            <NewsModal />
            <Switch>
              {/* 所有消息 */}
              {/* <Route path={ROUTES.ALL_NEWS} component={AllNews} /> */}
              {/* 日誌 */}
              <Route path={`${ROUTES.LOGS}/:machId/:machName`} component={Logs} />
              <Route exact path={ROUTES.INDEX} component={MyConnect} />
            </Switch>
          </StyledBackground>
          <ToastContainer />
        </Fragment>
      );
    }
    const lang = (
      navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage
    ).toLowerCase();
    const renderIsLoadingString = () => {
      switch (lang) {
        case 'zh-tw': {
          return <FormattedMessage id='app.isLoadingChinese' />;
        }
        case 'zh-cn': {
          return <FormattedMessage id='app.isLoadingChinese' />;
        }
        default: {
          return <FormattedMessage id='app.isLoadingEN' />;
        }
      }
    };
    return (
      <Fragment>
        <StyledBackground>
          <StyledSpinnerBox>
            <img src={LogoImg} alt='' />
            {renderIsLoadingString()}
            <Spinner color='white' className='spinner mt-3' />
          </StyledSpinnerBox>
        </StyledBackground>
        <ToastContainer />
      </Fragment>
    );
  };
  return renderGetAccountInfo();
};

export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  ),
  withRouter
)(App);
