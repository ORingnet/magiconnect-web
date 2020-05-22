import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { pad } from 'utility/app/rwd';
import { StyledDropdownItem } from '../StyledConnectTable';
import disconnectIcon from 'assets/img/myConnect/disconnect.svg';
import FuncBox from '../FuncBox';
const DisconnectAction = ({ machineObj, accountMsg, windowWidth, connectMachId, disconnectMachine }) => {
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

  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={disconnectIcon} clickFunc={checkMachineIsConnect} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <StyledDropdownItem onClick={checkMachineIsConnect}>
        <FormattedMessage id='myConnect.header.disconnect' />
      </StyledDropdownItem>
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DisconnectAction);
