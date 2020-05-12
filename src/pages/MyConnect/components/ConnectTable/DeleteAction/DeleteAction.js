import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage } from 'react-intl';
import FuncBox from '../FuncBox';
import deleteIcon from 'assets/img/myConnect/delete.png';
import { StyledDropdownItem } from '../StyledConnectTable';
import { pad } from 'utility/app/rwd';
const DeleteAction = ({ toggleDeleteMachineModal, machineObj, windowWidth }) => {
  const checkMachinesCanBeDelete = () => {
    toggleDeleteMachineModal([machineObj]);
  };
  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={deleteIcon} clickFunc={checkMachinesCanBeDelete} />
      </Fragment>
    );
  }
  return (
    <StyledDropdownItem onClick={checkMachinesCanBeDelete}>
      <FormattedMessage id='myConnect.header.delete' />
    </StyledDropdownItem>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DeleteAction);
