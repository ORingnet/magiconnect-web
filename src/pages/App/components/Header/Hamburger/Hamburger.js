import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { StyledHamburger } from './StyledHamburger';
const Hamburger = ({ toggleSiderbar, sidebarIsOpen }) => {
  return (
    <StyledHamburger onClick={toggleSiderbar} sidebarIsOpen={sidebarIsOpen}>
      <span />
      <span />
      <span />
    </StyledHamburger>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )
)(Hamburger);
