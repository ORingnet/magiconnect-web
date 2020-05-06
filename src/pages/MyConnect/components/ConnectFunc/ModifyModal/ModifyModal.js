import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import FuncBox from '../FuncBox';
import modifyIcon from 'assets/img/myConnect/modify.png';
import ModifyMachineModal from 'components/ModifyMachineModal';

const ModifyModal = ({ machineObj, modifyMachine, connectMachId, accountMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const checkMachinesCanBeModify = () => {
    if (machineObj.mach_status !== 'updating') {
      handleToggleModal();
      // if (accountMsg.acc_identity !== 'admin') {
      //   if (machineObj.mach_status === 'Connected' || machineObj.mach_status === 'Connecting') {
      //     if (machineObj.mach_id === connectMachId) {
      //       handleToggleModal();
      //     } else {
      //       toast.error(<FormattedMessage id='myConnect.header.modify.fail' />, {
      //         position: toast.POSITION.TOP_RIGHT
      //       });
      //     }
      //   } else {
      //     handleToggleModal();
      //   }
      // } else {
      //   handleToggleModal();
      // }
    } else {
      toast.error(<FormattedMessage id='myConnect.header.updating.message' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  const handleToggleModal = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <div>
      <FuncBox
        Icon={modifyIcon}
        formattedMessage='myConnect.header.modify'
        clickEvent={checkMachinesCanBeModify}
        ischecked={machineObj}
      />
      <ModifyMachineModal
        modifyWay='edit'
        modifyMachine={modifyMachine}
        machineObj={machineObj}
        isOpen={isOpen}
        toggleModal={handleToggleModal}
        title='Edit My Gateway'
      />
    </div>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ModifyModal);
