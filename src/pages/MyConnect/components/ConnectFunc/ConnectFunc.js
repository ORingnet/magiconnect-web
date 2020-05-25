import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import searchIcon from 'assets/img/myConnect/icon-search.png';
import DeleteAction from './DeleteAction';
import RefreshConnect from './RefreshConnect';
import Filter from './Filter';
import { Container, Row, Col } from 'reactstrap';
import { StyledTitle, StyledFuncContainer, StyledInputContainer, StyledSearchContainer } from './StyledConnectFunc';
const ConnectHeader = ({ searchValue, searchMachineAction, siderbarIsOpen, changePage }) => {
  return (
    <Container fluid className='py-2 px-4'>
      <Row>
        <Col xs={12} sm={8} md={9}>
          <div className='d-flex'>
            <StyledTitle>My Gateway</StyledTitle>
            <StyledFuncContainer mobilenone={siderbarIsOpen}>
              <DeleteAction />
              <RefreshConnect changePage={changePage} />
            </StyledFuncContainer>
          </div>
        </Col>
        <Col xs={12} sm={4} md={3}>
          <StyledSearchContainer>
            <StyledInputContainer>
              <input value={searchValue} onChange={e => searchMachineAction(e.target.value)} placeholder='Search' />
              <img src={searchIcon} alt='' />
            </StyledInputContainer>
            <Filter changePage={changePage} />
          </StyledSearchContainer>
        </Col>
      </Row>
    </Container>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ConnectHeader);
