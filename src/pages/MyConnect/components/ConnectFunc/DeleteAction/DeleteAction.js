import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import FuncBox from '../FuncBox';
import deleteIcon from 'assets/img/myConnect/delete.png';
import DeleteModal from 'components/DeleteModal';
const DeleteAction = ({ machineObj, deleteMachine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const checkMachinesCanBeDelete = () => {
    if (machineObj.mach_status === 'Off-Line') {
      handleToggleModal();
    } else {
      toast.error(<FormattedMessage id='myConnect.header.delete.fail' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    await deleteMachine(machineObj.mach_id);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Fragment>
      <FuncBox
        Icon={deleteIcon}
        formattedMessage='myConnect.header.delete'
        clickEvent={checkMachinesCanBeDelete}
        ischecked={machineObj}
      />
      <DeleteModal
        isOpen={isOpen}
        toggle={handleToggleModal}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        name={machineObj.mach_name}
      />
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DeleteAction);
