import React, { Fragment } from 'react';
import addIcon from '../../../../../assets/img/header/add_connet.png';
import ModifyMachineModal from '../../../../../components/ModifyMachineModal';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../store/appStore/action';
import { StyledImg } from './StyledAddMagicConnet';
import { StyledUncontrolledTooltip } from '../StyledHeader';
const AddMagicConnet = ({
  toggleAddConnect,
  addConnectIsOpen,
  addMachine,
  toggleCopyMachineIdModal,
  copyMachineIdText,
  copyMachineIdModalIsOpen
}) => {
  return (
    <Fragment>
      <StyledImg src={addIcon} alt='' onClick={toggleAddConnect} id='addIcon' />
      <StyledUncontrolledTooltip target='addIcon'>New My Connect</StyledUncontrolledTooltip>
      <ModifyMachineModal
        modifyWay='add'
        addMachine={addMachine}
        isOpen={addConnectIsOpen}
        toogleModal={toggleAddConnect}
        toggleCopyMachineIdModal={toggleCopyMachineIdModal}
        addNewMachineId={copyMachineIdText}
        copyMachineIdModalIsOpen={copyMachineIdModalIsOpen}
        title='New My Connect'
      />
    </Fragment>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )
)(AddMagicConnet);
