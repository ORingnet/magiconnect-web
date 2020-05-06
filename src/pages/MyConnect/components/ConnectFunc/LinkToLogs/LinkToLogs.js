import React from 'react';
import { withRouter } from 'react-router-dom';
import FuncBox from '../FuncBox';
import LogIcon from 'assets/img/myConnect/log.png';
import * as ROUTES from 'router';
const LinkToLogs = ({ history, machineObj }) => {
  const handleLinkToLogs = () => {
    history.push({
      pathname: `${ROUTES.LOGS}/${machineObj.mach_id}/${machineObj.mach_name}`
    });
  };
  return (
    <FuncBox
      Icon={LogIcon}
      formattedMessage='myConnect.header.log'
      clickEvent={handleLinkToLogs}
      ischecked={machineObj}
    />
  );
};

export default withRouter(LinkToLogs);
