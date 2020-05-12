import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import modifyIcon from 'assets/img/myConnect/modify.svg';
import { pad } from 'utility/app/rwd';
import { StyledDropdownItem } from '../StyledConnectTable';

import FuncBox from '../FuncBox';

const ModifyModal = ({ machineObj, toggleModifyMachineModal, windowWidth }) => {
  const checkMachinesCanBeModify = () => {
    if (machineObj.mach_status !== 'updating') {
      toggleModifyMachineModal(machineObj);
    } else {
      toast.error(<FormattedMessage id='myConnect.header.updating.message' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={modifyIcon} clickFunc={checkMachinesCanBeModify} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <StyledDropdownItem onClick={checkMachinesCanBeModify}>
        <FormattedMessage id='myConnect.header.modify' />
      </StyledDropdownItem>
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ModifyModal);
