import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage } from 'react-intl';
import { DropdownToggle, DropdownMenu, CustomInput } from 'reactstrap';
import { StyledUncontrolledDropdown, StyledDropdownItem } from './StyledFilter';
import filterIcon from 'assets/img/myConnect/icon-filter.svg';
const Filter = ({ toggleFilterMachineCreator, searchFilter, changePage }) => {
  const handleToggleFilterMacineCreator = () => {
    toggleFilterMachineCreator();
    changePage(1);
  };
  return (
    <StyledUncontrolledDropdown>
      <DropdownToggle caret color='primary'>
        <img src={filterIcon} alt='' />
      </DropdownToggle>
      <DropdownMenu right>
        <StyledDropdownItem onClick={handleToggleFilterMacineCreator}>
          <CustomInput type='checkbox' id='machine_creator_check' readOnly checked={searchFilter.machineCreator} />
          <FormattedMessage id='myConnect.header.filter.macineCreator' />
        </StyledDropdownItem>
      </DropdownMenu>
    </StyledUncontrolledDropdown>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Filter);
