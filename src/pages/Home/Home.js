import React from 'react';
import logoImg from '../../assets/img/logo.png';
// import banner from '../../assets/img/index/banner.jpg';
import ButtonImg from '../../assets/img/index/button.png';
import fiveButton from '../../assets/img/index/fiveButton.jpg';
import { StyledContainer, StyledBanner, StyledButton, StyledFooter, StyledLogo } from './styledHome';
const Home = () => {
  return (
    <StyledContainer>
      <StyledLogo src={logoImg} alt='' />
      <p>系統版本 : 1.015</p>
      <StyledBanner />
      <StyledButton href={process.env.REACT_APP_LOGIN_URL}>
        <img src={ButtonImg} alt='' />
      </StyledButton>
      <StyledFooter>
        <p className='mb-0'>Get Connected Anytime, Anywhere</p>
        <img src={fiveButton} alt='' />
      </StyledFooter>
    </StyledContainer>
  );
};

export default Home;
