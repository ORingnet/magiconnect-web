import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage } from 'react-intl';
import FuncBox from '../FuncBox';
import bindingIcon from 'assets/img/myConnect/icon-binding.svg';
import unBindingIcon from 'assets/img/myConnect/icon-unBinding.svg';
import { StyledDropdownItem } from '../StyledConnectTable';
import { pad } from 'utility/app/rwd';
import { CustomInput } from 'reactstrap';
const BindAction = ({ bindingAction, machineObj, windowWidth, accountMsg }) => {
  const handleBinding = () => {
    bindingAction(machineObj);
  };
  const checkIsChecked = machineObj.mach_bindBy === accountMsg.acc_mail;
  if (windowWidth <= pad) {
    return (
      <Fragment>
        <FuncBox imgSrc={checkIsChecked ? bindingIcon : unBindingIcon} clickFunc={handleBinding} />
      </Fragment>
    );
  }
  return (
    <StyledDropdownItem onClick={handleBinding}>
      <CustomInput
        type='checkbox'
        id={machineObj.mach_id}
        className='d-inline-block'
        checked={checkIsChecked}
        readOnly
      />
      <FormattedMessage id='myConnect.header.binding' />
    </StyledDropdownItem>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(BindAction);
