import React from 'react';
import * as ROUTES from '../../../../router';
import { withRouter } from 'react-router-dom';
import { FormattedHTMLMessage } from 'react-intl';
import backIcon from '../../../../assets/img/information/icon-back.png';
import filterIcon from '../../../../assets/img/information/icon-search.png';
import exportIcon from '../../../../assets/img/information/icon-export.png';
import undoIcon from '../../../../assets/img/information/icon-undo.png';
import { StyledBackground, StyledFuncBox } from './StyledLogsHeader';
const LogsHeader = ({ toggleFilterModal, history, machId, setSearchValue }) => {
  const handleReturnConnect = () => {
    history.push(ROUTES.INDEX);
  };
  const handleUndoSearch = () => {
    setSearchValue({
      action: '',
      endTime: '',
      level: '',
      startTime: ''
    });
  };
  return (
    <StyledBackground>
      <StyledFuncBox onClick={handleReturnConnect}>
        <img src={backIcon} alt='' />
        <FormattedHTMLMessage tagName='p' id='logAndNews.back' />
      </StyledFuncBox>
      <StyledFuncBox onClick={toggleFilterModal}>
        <img src={filterIcon} alt='' />
        <FormattedHTMLMessage tagName='p' id='logAndNews.filters' />
      </StyledFuncBox>
      <StyledFuncBox>
        <a href={`${process.env.REACT_APP_API_URL}/machines/${machId}/logs/download/`}>
          <img src={exportIcon} alt='' />
          <FormattedHTMLMessage tagName='p' id='logAndNews.export' />
        </a>
      </StyledFuncBox>
      <StyledFuncBox onClick={handleUndoSearch}>
        <img src={undoIcon} alt='' />
        <FormattedHTMLMessage tagName='p' id='logAndNews.undo' />
      </StyledFuncBox>
    </StyledBackground>
  );
};

export default withRouter(LogsHeader);
