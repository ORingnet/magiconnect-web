import React from 'react';
import refreshIcon from '../../../../../assets/img/myConnect/refresh.png';
import FuncBox from '../FuncBox';
const RefreshConnect = ({ getAllMachine, getDevice, changePage, connectMachine, refreshMachine }) => {
  const handleRefresh = () => {
    refreshMachine();
    getAllMachine(connectMachine, getDevice).then(() => {
      changePage(1);
    });
  };
  return (
    <FuncBox
      Icon={refreshIcon}
      formattedMessage='myConnect.header.refresh'
      clickEvent={handleRefresh}
      ischecked={true}
    />
  );
};

export default RefreshConnect;
