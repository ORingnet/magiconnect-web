import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import searchIcon from 'assets/img/myConnect/icon-search.png';
import ModifyModal from './ModifyModal';
import DeleteAction from './DeleteAction';
import LinkToLogs from './LinkToLogs';
import RefreshConnect from './RefreshConnect';
import ConnectAction from './ConnectAction';
import DisconnectAction from './DisconnectAction';
import { Container, Row, Col } from 'reactstrap';
import { StyledTitle, StyledFuncContainer, StyledInputContainer } from './StyledConnectFunc';
const ConnectHeader = ({ searchValue, searchMachineAction, siderbarIsOpen, machines, changePage }) => {
  const [machineObj, setMachineObj] = useState('');
  useEffect(() => {
    const machineIsChecked = machines.find(machine => machine.ischecked === true);
    if (machineIsChecked) {
      setMachineObj(machineIsChecked);
    } else {
      setMachineObj('');
    }
  }, [machines]);
  return (
    <Container fluid className='py-2 px-4'>
      <Row>
        <Col xs={12} sm={8} md={9}>
          <div className='d-flex'>
            <StyledTitle>My Gateway</StyledTitle>
            <StyledFuncContainer mobilenone={siderbarIsOpen}>
              <ModifyModal machineObj={machineObj} />
              <DeleteAction machineObj={machineObj} />
              <LinkToLogs ischecked={machineObj} machineObj={machineObj} />
              <RefreshConnect changePage={changePage} />
              <ConnectAction machineObj={machineObj} changePage={changePage} />
              <DisconnectAction machineObj={machineObj} />
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
