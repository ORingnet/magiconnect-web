import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import disconnectIcon from 'assets/img/myConnect/disconnect.svg';
import FuncBox from '../FuncBox';
import FixedLoading from 'components/FixedLoading';
const DisconnectAction = ({ machineObj, accountMsg, connectMachId, disconnectMachine, disconnectMachineIsLoading }) => {
  const checkMachineIsConnect = () => {
    if (machineObj.mach_status === 'updating') {
      toast.error(<FormattedMessage id='myConnect.header.updating.message' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (accountMsg.acc_identity === 'admin') {
      if (machineObj.mach_status === 'Connected' || machineObj.mach_status === 'Connecting') {
        handleDisconnect();
      } else {
        toast.error(<FormattedMessage id='myConnect.header.disconnect.connected' />, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } else {
      if (machineObj.mach_id === connectMachId) {
        handleDisconnect();
      } else {
        toast.error(<FormattedMessage id='myConnect.header.disconnect.selfConnected' />, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  };
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
        clickEvent={checkMachineIsConnect}
        ischecked={machineObj}
        imgClassName='big'
      />
      {renderIsLoading()}
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DisconnectAction);
