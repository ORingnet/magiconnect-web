import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage } from 'react-intl';
import * as ROUTERS from 'router';
import Moment from 'react-moment';
import newsIcon from 'assets/img/newsModal/icon-f-all.png';
import closeIcon from 'assets/img/header/icon-f-close.png';
import { StyledLogDialog, StyledLogContent, StyledLogFooter, StyledLogFooterBtn, StyledBadge } from './StyledNewsModal';
const NewsModal = ({ newsDialogs, showNewsIsOpen, toggleNews, history }) => {
  const handleLinkToAllNews = () => {
    history.push(ROUTERS.ALL_NEWS);
    toggleNews();
  };
  const renderLevel = level => {
    if (level === 'INFO') {
      return 'primary';
    } else if (level === 'WARNING') {
      return 'warning';
    } else if (level === 'ERROR') {
      return 'danger';
    } else if (level === 'CRITICAL') {
      return 'dark';
    }
  };

  const renderLogContent = () => {
    if (newsDialogs.length > 0) {
      return newsDialogs.map((news, i) => (
        <li key={i}>
          <Moment format='YYYY/MM/DD'>{news.timestamp}</Moment>
          <StyledBadge color={renderLevel(news.level)}>
            <FormattedMessage id={`common.${news.level}`} />
          </StyledBadge>
          <StyledBadge>
            <FormattedMessage id={`common.${news.action}`} />
          </StyledBadge>
          <p>{news.msg}</p>
        </li>
      ));
    }
    return <FormattedMessage id='newsModal.noNews' />;
  };
  return (
    <StyledLogDialog isOpen={showNewsIsOpen}>
      <StyledLogContent>
        <ul>{renderLogContent()}</ul>
      </StyledLogContent>
      <StyledLogFooter>
        <StyledLogFooterBtn onClick={handleLinkToAllNews}>
          <img src={newsIcon} alt='all news' />
          <FormattedMessage id='newsModal.allNews' />
        </StyledLogFooterBtn>
        <StyledLogFooterBtn onClick={toggleNews}>
          <img src={closeIcon} alt='' />
        </StyledLogFooterBtn>
      </StyledLogFooter>
    </StyledLogDialog>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  ),
  withRouter
)(NewsModal);
