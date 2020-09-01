import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTERS from 'router';
import logoSrc from 'assets/img/logo.png';
import I18nSelect from '../I18nSelect';
import AccountMsg from './AccountMsg';
import AddMagicConnet from './AddMagicConnet';
// import ShowNewsBtn from './ShowNewsBtn';
import ShowMap from './ShowMap';
import Hamburger from './Hamburger';
import { StyledHeader, StyledSpan, StyledImg, StyledCommand, StyledRightBar } from './StyledHeader';

const Header = () => {
  return (
    <StyledHeader id='header'>
      <div>
        <Link to={ROUTERS.INDEX}>
          <StyledImg src={logoSrc} alt='ORing MagicConnect' />
        </Link>
        <StyledSpan>Version</StyledSpan>
        <StyledSpan>{process.env.REACT_APP_VERSION}</StyledSpan>
      </div>
      <StyledRightBar>
        <AccountMsg />
        <StyledCommand>
          <I18nSelect />
          <AddMagicConnet />
          {/* 所有消息 */}
          {/* <ShowNewsBtn newsDialogs={newsDialogs} toggleNews={toggleNews} /> */}
          <ShowMap />
        </StyledCommand>
      </StyledRightBar>
      <Hamburger />
    </StyledHeader>
  );
};

export default Header;
