import React from 'react';
import connectIcon from 'assets/img/myConnect/connect.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import FuncBox from '../FuncBox';
const ConnectAction = ({ machineObj, connectMachine, changePage, connectMachId, userStatus, accountMsg }) => {
  // const checkMachinesIsCheckedAndConnect = () => {
  //   if (userStatus !== 'Off-Line' && machineObj.mach_status !== 'Off-Line') {
  //     if (accountMsg.acc_identity === 'admin') {
  //       return machineObj.mach_id !== connectMachId;
  //     }
  //     return machineObj.mach_status !== 'Connected';
  //   }
  //   return false;
  // };
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
  return (
    <FuncBox
      Icon={connectIcon}
      formattedMessage='myConnect.header.connect'
      clickEvent={checkMachinesIsCheckedAndConnect}
      ischecked={machineObj}
    />
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ConnectAction);
