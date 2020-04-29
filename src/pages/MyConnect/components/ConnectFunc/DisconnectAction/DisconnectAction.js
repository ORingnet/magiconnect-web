import React, { Fragment } from 'react';
import disconnectIcon from '../../../../../assets/img/myConnect/disconnect.svg';
import FuncBox from '../FuncBox';
import FixedLoading from '../../../../../components/FixedLoading';
const DisconnectAction = ({ ischecked, machineObj, disconnectMachine, disconnectMachineIsLoading }) => {
  const handleDisconnect = () => {
    disconnectMachine(machineObj.mach_id);
  };
  const renderIsLoading = () => {
    if (disconnectMachineIsLoading) {
      return <FixedLoading />;
    }
  };
  return (
    <Fragment>
      <FuncBox
        Icon={disconnectIcon}
        formattedMessage='myConnect.header.disconnect'
        clickEvent={handleDisconnect}
        ischecked={ischecked}
        imgClassName='big'
      />
      {renderIsLoading()}
    </Fragment>
  );
};
export default DisconnectAction;
