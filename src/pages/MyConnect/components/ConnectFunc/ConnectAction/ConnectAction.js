import React from 'react';
import connectIcon from '../../../../../assets/img/myConnect/connect.svg';
import FuncBox from '../FuncBox';
const ConnectAction = ({ ischecked, machineObj, connectMachine, changePage }) => {
  const handleConnect = () => {
    connectMachine(machineObj.mach_id, machineObj.mach_name, machineObj.mach_status).then(() => {
      changePage(1);
    });
  };
  return (
    <FuncBox
      Icon={connectIcon}
      formattedMessage='myConnect.header.connect'
      clickEvent={handleConnect}
      ischecked={ischecked}
    />
  );
};
export default ConnectAction;
