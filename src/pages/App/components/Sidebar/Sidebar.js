import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage } from 'react-intl';
import I18nSelect from '../I18nSelect';
import switchStatus from 'components/SwitchStatus';
import homeIcon from 'assets/img/sidebar/icon-home.png';
import addIcon from 'assets/img/common/icon-add.png';
// import newsIcon from 'assets/img/common/icon-news.png';
import mapIcon from 'assets/img/sidebar/icon-map.png';
import leftIcon from 'assets/img/sidebar/icon-left.svg';
import logoutIcon from 'assets/img/sidebar/icon-logout.png';
import downloadIcon from 'assets/img/sidebar/icon-download.svg';
import fileIcon from 'assets/img/sidebar/icon-file.svg';
import refreshIcon from 'assets/img/sidebar/refresh.svg';
// import { Badge } from 'reactstrap';
import {
  StyledSidebarContainer,
  StyledUserBox,
  StyledUserName,
  StyledUserEmail,
  StyledUserRole,
  StyledLinkBox,
  StyledFuncBox,
  StyledHTMLLinkBox,
  StyledButton,
  StyledALink
} from './StyledSidebar';
const Sidebar = ({
  accountMsg,
  newsDialogs,
  userStatus,
  toggleSiderbar,
  siderbarIsOpen,
  toggleAddConnect,
  toggleNews,
  refreshMachine,
  getAllMachine,
  connectMachine,
  getDevice,
  toggleMap
}) => {
  const color = switchStatus(userStatus).color;
  // const renderBage = () => {
  //   if (newsDialogs.length > 0) {
  //     return (
  //       <Badge color='danger' className='ml-4'>
  //         {newsDialogs.length}
  //       </Badge>
  //     );
  //   }
  // };
  const handleRefresh = () => {
    refreshMachine();
    getAllMachine(connectMachine, getDevice);
    toggleSiderbar();
  };
  return (
    <StyledSidebarContainer siderbarIsOpen={siderbarIsOpen}>
      <StyledUserBox>
        <StyledUserName>
          <div>{accountMsg.user_name}</div>
          <div onClick={toggleSiderbar}>
            <img src={leftIcon} alt='' />
          </div>
        </StyledUserName>
        <StyledUserEmail>{accountMsg.acc_mail}</StyledUserEmail>
        <StyledUserRole>{accountMsg.acc_identity}</StyledUserRole>
      </StyledUserBox>
      <StyledButton color={color} block size='sm'>
        <span className='mr-1'>ConnectClient Status</span>
        <div color={color} />
      </StyledButton>
      <I18nSelect />
      <StyledLinkBox to='/'>
        <img src={homeIcon} alt='' />
        <FormattedMessage id='sidebar.home' />
      </StyledLinkBox>
      <StyledFuncBox onClick={toggleAddConnect}>
        <img src={addIcon} alt='' />
        <FormattedMessage id='sidebar.add' />
      </StyledFuncBox>
      {/* 所有消息  */}
      {/* <StyledFuncBox onClick={toggleNews}>
        <img src={newsIcon} alt='' />
        <FormattedMessage id='sidebar.news' />
        {renderBage()}
      </StyledFuncBox> */}
      <StyledFuncBox onClick={toggleMap}>
        <img src={mapIcon} alt='' />
        <FormattedMessage id='sidebar.map' />
      </StyledFuncBox>
      <StyledFuncBox onClick={handleRefresh}>
        <img src={refreshIcon} alt='' />
        <FormattedMessage id='myConnect.header.refresh' />
      </StyledFuncBox>
      <StyledFuncBox>
        <img src={downloadIcon} alt='' />
        <StyledALink href={`${process.env.REACT_APP_API_URL}/utility/download`} fontsize='14'>
          <span>Download</span>
          <span>Windows installer</span>
        </StyledALink>
      </StyledFuncBox>
      <StyledFuncBox>
        <img src={fileIcon} alt='' />
        <StyledALink href={`${process.env.REACT_APP_API_URL}/utility/download`} fontsize='16'>
          <FormattedMessage id='header.userManual' description='userManual' />
        </StyledALink>
      </StyledFuncBox>
      <StyledHTMLLinkBox href={process.env.REACT_APP_LOGOUT_URL}>
        <img src={logoutIcon} alt='' />
        <FormattedMessage id='sidebar.logout' />
      </StyledHTMLLinkBox>
    </StyledSidebarContainer>
  );
};

export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Sidebar);
