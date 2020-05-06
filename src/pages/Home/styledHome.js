import styled from 'styled-components';
import backImg from 'assets/img/index/background.jpg';
import banner from 'assets/img/index/banner.jpg';
const StyledContainer = styled.div`
  width: 100%;
  padding-top: 1%;
  height: 100vh;
  background: url(${backImg}) center center / cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding-top: 7%;
  }
  @media (max-width: 575px) {
    justify-content: space-between;
  }
`;
const StyledLogo = styled.img`
  @media (max-width: 575px) {
    width: 80%;
  }
`;
const StyledBanner = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
  height: 30rem;
  background: url(${banner}) center center / cover;
  @media (max-width: 768px) {
    height: 38rem;
  }
  @media (max-width: 575px) {
    height: 23rem;
  }
`;
const StyledButton = styled.a`
  margin: 4% 0;
  @media (max-width: 575px) {
    text-align: center;
    margin: 10% 0;
    img {
      width: 80%;
    }
  }
`;
const StyledFooter = styled.div`
  background: #103574;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: white;
  font-weight: bold;
  align-items: center;
  padding: 15px;
  margin-top: auto;
  @media (max-width: 575px) {
    text-align: center;
    justify-content: center;
  }
`;
export { StyledContainer, StyledBanner, StyledButton, StyledFooter, StyledLogo };
