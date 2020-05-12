import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import FuncBox from '../FuncBox';
import LogIcon from 'assets/img/myConnect/log.svg';
import * as ROUTES from 'router';
import { pad } from 'utility/app/rwd';
import { FormattedMessage } from 'react-intl';
import { StyledDropdownItem } from '../StyledConnectTable';
const LinkToLogs = ({ history, machineObj, windowWidth }) => {
  const handleLinkToLogs = () => {
    history.push({
      pathname: `${ROUTES.LOGS}/${machineObj.mach_id}/${machineObj.mach_name}`
    });
  };
  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={LogIcon} clickFunc={handleLinkToLogs} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <StyledDropdownItem onClick={handleLinkToLogs}>
        <FormattedMessage id='myConnect.header.log' />
      </StyledDropdownItem>
    </Fragment>
  );
};

export default withRouter(LinkToLogs);
