import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/appStore/action';
import searchIcon from '../../../../assets/img/myConnect/icon-search.png';
import ModifyModal from './ModifyModal';
import DeleteAction from './DeleteAction';
import LinkToLogs from './LinkToLogs';
import RefreshConnect from './RefreshConnect';
import ConnectAction from './ConnectAction';
import DisconnectAction from './DisconnectAction';
import { Container, Row, Col } from 'reactstrap';
import { StyledTitle, StyledFuncContainer, StyledInputContainer } from './StyledConnectFunc';
const ConnectHeader = ({
  searchValue,
  searchMachineAction,
  siderbarIsOpen,
  machines,
  getAllMachine,
  getDevice,
  connectMachine,
  refreshMachine,
  connectMachineStatus,
  modifyMachine,
  deleteMachine,
  connectMachId,
  disconnectMachine,
  disconnectMachineIsLoading,
  changePage,
  accountMsg,
  userStatus
}) => {
  const [machineObj, setMachineObj] = useState('');
  useEffect(() => {
    const machineIsChecked = machines.find(machine => machine.ischecked === true);
    if (machineIsChecked) {
      setMachineObj(machineIsChecked);
    } else {
      setMachineObj('');
    }
  }, [machines]);
  const checkMachinesCanBeModify = () => {
    if (machineObj) {
      if (accountMsg.acc_identity === 'admin') {
        return true;
      }
      return (
        machineObj.mach_status !== 'Connected' ||
        machineObj.mach_status !== 'Connecting' ||
        machineObj.mach_id === connectMachId
      );
    }
    return false;
  };
  const checkMachinesCanBeDelete = () => {
    if (machineObj) {
      return machineObj.mach_status === 'Off-Line';
    }
    return false;
  };
  const checkMachinesIsCheckedAndConnect = () => {
    if (machineObj && userStatus !== 'Off-Line' && machineObj.mach_status !== 'Off-Line') {
      if (accountMsg.acc_identity === 'admin') {
        return machineObj.mach_id !== connectMachId;
      }
      return machineObj.mach_status !== 'Connected';
    }
    return false;
  };
  const checkMachineIsConnect = () => {
    if (machineObj) {
      if (accountMsg.acc_identity === 'admin') {
        return machineObj.mach_status === 'Connected' || machineObj.mach_status === 'Connecting';
      }
      return machineObj.mach_id === connectMachId;
    }
    return false;
  };
  return (
    <Container fluid className='py-2 px-4'>
      <Row>
        <Col xs={12} sm={8} md={9}>
          <div className='d-flex'>
            <StyledTitle>My Connect</StyledTitle>
            <StyledFuncContainer mobilenone={siderbarIsOpen}>
              <ModifyModal
                ischecked={checkMachinesCanBeModify()}
                machineObj={machineObj}
                modifyMachine={modifyMachine}
              />
              <DeleteAction
                ischecked={checkMachinesCanBeDelete()}
                machineObj={machineObj}
                deleteMachine={deleteMachine}
              />
              <LinkToLogs ischecked={machineObj} machineObj={machineObj} />
              <RefreshConnect
                getAllMachine={getAllMachine}
                getDevice={getDevice}
                changePage={changePage}
                connectMachine={connectMachine}
                refreshMachine={refreshMachine}
              />
              <ConnectAction
                ischecked={checkMachinesIsCheckedAndConnect()}
                machineObj={machineObj}
                connectMachine={connectMachine}
                changePage={changePage}
              />
              <DisconnectAction
                ischecked={checkMachineIsConnect()}
                machineObj={machineObj}
                disconnectMachine={disconnectMachine}
                disconnectMachineIsLoading={disconnectMachineIsLoading}
              />
            </StyledFuncContainer>
          </div>
        </Col>
        <Col xs={12} sm={4} md={3}>
          <StyledInputContainer>
            <input value={searchValue} onChange={e => searchMachineAction(e.target.value)} placeholder='Search' />
            <img src={searchIcon} alt='' />
          </StyledInputContainer>
        </Col>
      </Row>
    </Container>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ConnectHeader);
