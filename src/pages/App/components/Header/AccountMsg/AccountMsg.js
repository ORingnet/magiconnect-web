import React, { useEffect, useState, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import { actionCreators } from 'store/appStore/action';
import switchStatus from 'components/SwitchStatus';
import { continueGetAccountTime } from 'utility/app/timeInterval';
import { UncontrolledDropdown, Dropdown, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import {
  StyledContainer,
  StyledButton,
  StyledLink,
  StyledDropdownItem,
  StyledDropdownToggle
} from './StyledAccountMsg';

const AccountMsg = ({ accountMsg, getAccountStatus, getAccountStatusId, userStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  };
  useEffect(() => {
    getAccountStatus();
  }, [getAccountStatus]);
  useEffect(() => {
    const getStatus = setInterval(() => {
      getAccountStatus();
    }, continueGetAccountTime);
    return () => {
      clearInterval(getStatus);
    };
  }, [getAccountStatus]);
  const handleCopy = () => {
    setIsLoading(true);
    getAccountStatusId().then(res => {
      if (res) {
        copy(res);
        toast.success(
          <Fragment>
            <FormattedMessage id='copy' />
            <span className='mx-1'>{`ConnectClient ID: ${res}`}</span>
            <FormattedMessage id='success' />
          </Fragment>,
          { position: toast.POSITION.TOP_RIGHT }
        );
      } else {
        toast.error(
          <Fragment>
            <FormattedMessage id='copy' />
            ConnectClient ID
            <FormattedMessage id='fail' />
          </Fragment>,
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
      setIsLoading(false);
      setDropdownOpen(false);
    });
  };
  const color = switchStatus(userStatus).color;
  const handleLogout = () => {
    window.location = process.env.REACT_APP_LOGOUT_URL;
  };
  return (
    <StyledContainer>
      <StyledButton color={color} outline size='sm'>
        <FormattedMessage id={`connectTable.${userStatus}`} description='userInfo'>
          {statusText => <span className='text-nowrap'>ConnectClient Status:{statusText}</span>}
        </FormattedMessage>
        <div color={color} className='ml-1' />
      </StyledButton>
      <StyledLink color='primary' size='sm' outline>
        <a href={`${process.env.REACT_APP_API_URL}/guide/download/`} target='userGuide'>
          <FormattedMessage id='header.userManual' description='userManual' />
        </a>
      </StyledLink>
      <Dropdown isOpen={dropdownOpen || isLoading} toggle={toggle}>
        <StyledDropdownToggle caret size='sm' color='primary'>
          ConnectClient
        </StyledDropdownToggle>
        <DropdownMenu>
          <StyledDropdownItem onClick={handleCopy}>
            <FormattedMessage id='header.copy' description='userInfo' />
            {isLoading ? <Spinner size='sm' className='ml-2' /> : ''}
          </StyledDropdownItem>
          <DropdownItem divider />
          <StyledDropdownItem>
            <a href={`${process.env.REACT_APP_API_URL}/utility/download`}>Download windows version</a>
          </StyledDropdownItem>
        </DropdownMenu>
      </Dropdown>
      <UncontrolledDropdown>
        <StyledDropdownToggle caret size='sm' color='primary'>
          <FormattedMessage id='header.userInfo' description='userInfo' />
        </StyledDropdownToggle>
        <DropdownMenu>
          <StyledDropdownItem disabled>{accountMsg.user_name}</StyledDropdownItem>
          <DropdownItem divider />
          <StyledDropdownItem disabled>{accountMsg.acc_mail}</StyledDropdownItem>
          <DropdownItem divider />
          <StyledDropdownItem disabled>{accountMsg.acc_identity}</StyledDropdownItem>
          <DropdownItem divider />
          <StyledDropdownItem onClick={handleLogout}>
            <FormattedMessage id='header.logout' description='logout' />
          </StyledDropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </StyledContainer>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )
)(AccountMsg);
