import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import FuncBox from '../FuncBox';
import deleteIcon from 'assets/img/myConnect/delete.png';
const DeleteAction = ({ machines, toggleDeleteMachineModal }) => {
  const machinesIsCheckedArr = machines.filter(machine => machine.ischecked);
  const checkMachinesCanBeDelete = () => {
    if (machinesIsCheckedArr.find(machine => machine.mach_status !== 'Off-Line')) {
      toast.error(<FormattedMessage id='myConnect.header.delete.fail' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      toggleDeleteMachineModal(machinesIsCheckedArr);
    }
  };
  return (
    <Fragment>
      <FuncBox
        Icon={deleteIcon}
        formattedMessage='myConnect.header.delete'
        clickEvent={checkMachinesCanBeDelete}
        ischecked={machinesIsCheckedArr.length > 0}
      />
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DeleteAction);
