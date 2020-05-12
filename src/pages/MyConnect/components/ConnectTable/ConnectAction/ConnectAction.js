import React, { Fragment } from 'react';
import connectIcon from 'assets/img/myConnect/connect.svg';
import { connect } from 'react-redux';
import { pad } from 'utility/app/rwd';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { StyledDropdownItem } from '../StyledConnectTable';

import FuncBox from '../FuncBox';
const ConnectAction = ({
  machineObj,
  windowWidth,
  connectMachine,
  changePage,
  connectMachId,
  userStatus,
  accountMsg
}) => {
  const checkMachinesIsCheckedAndConnect = () => {
    if (userStatus === 'Off-Line') {
      toast.error(<FormattedMessage id='myConnect.header.connect.userOffline' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (machineObj.mach_status === 'Off-Line') {
      toast.error(<FormattedMessage id='myConnect.header.connect.machineOffline' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (machineObj.mach_status === 'updating') {
      toast.error(<FormattedMessage id='myConnect.header.updating.message' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      if (accountMsg.acc_identity === 'admin') {
        if (machineObj.mach_id !== connectMachId) {
          handleConnect();
        } else {
          toast.error(<FormattedMessage id='myConnect.header.connect.machineAdminConnected' />, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      } else {
        if (machineObj.mach_status !== 'Connected' && machineObj.mach_status !== 'Connecting') {
          handleConnect();
        } else {
          toast.error(<FormattedMessage id='myConnect.header.connect.machineConnected' />, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    }
  };
  const handleConnect = () => {
    connectMachine(machineObj.mach_id, machineObj.mach_name, machineObj.mach_status).then(() => {
      changePage(1);
    });
  };
  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={connectIcon} clickFunc={checkMachinesIsCheckedAndConnect} />
      </Fragment>
    );
  }
  return (
    <StyledDropdownItem onClick={checkMachinesIsCheckedAndConnect}>
      <FormattedMessage id='myConnect.header.connect' />
    </StyledDropdownItem>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ConnectAction);
