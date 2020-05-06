import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import bg from 'assets/img/sidebar/bg-nav.png';
const StyledSidebarContainer = styled.div`
  display: none;
  position: fixed;
  top: 82px;
  bottom: 0;
  width: 210px;
  height: 100%;
  background-color: #2e363c;
  background-image: url(${bg});
  border-right: 4px solid #1e1e1e;
  transition: left 0.5s;
  z-index: 1;
  left: ${props => (props.siderbarIsOpen ? '0' : '-210px')};
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb:active {
    background: #000000;
  }
  &::-webkit-scrollbar-track {
    background: #666666;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track:hover {
    background: #666666;
  }
  &::-webkit-scrollbar-track:active {
    background: #333333;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 575px) {
    top: 51px;
  }
  @media (max-width: 320px) {
    top: 72px;
    height: 496px;
    overflow-y: scroll;
  }
`;
const StyledUserBox = styled.div`
  padding: 15px 8px 15px 20px;
  background: rgba(0, 0, 0, 0.5);
`;
const StyledUserName = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  div {
    &:first-child {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 145px;
      text-align: left;
    }
    width: 44px;
    text-align: right;
  }
  img {
    width: 10px;
  }
`;
const StyledUserEmail = styled.p`
  color: #aaa;
  margin-bottom: 5px;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const StyledUserRole = styled.p`
  color: #e0c904;
  font-size: 0.9rem;
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const StyledLinkBox = styled(Link)`
  background: rgba(1, 177, 177, 0.5);
  display: block;
  padding: 17px 25px;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: none;
    color: white;
    background: rgba(1, 177, 177, 0.5);
  }
  &:focus {
    outline: none;
  }
  > img {
    margin-right: 25px;
    width: 20px;
  }
`;
const StyledHTMLLinkBox = styled.a`
  display: block;
  padding: 17px 25px;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: none;
    color: white;
    background: rgba(1, 177, 177, 0.5);
  }
  &:focus {
    outline: none;
  }
  > img {
    margin-right: 25px;
    width: 20px;
  }
`;
const StyledFuncBox = styled.div`
  cursor: pointer;
  display: block;
  padding: 17px 25px;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: none;
    color: white;
    background: rgba(1, 177, 177, 0.5);
  }
  > img {
    margin-right: 25px;
    width: 20px;
  }
`;
const StyledButton = styled(Button)`
  border-color: ${props => props.color};
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  padding: 0.25rem 20px;
  > div {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
  }
  &:hover {
    cursor: default;
    color: white;
    background-color: ${props => props.color};
    border-color: ${props => props.color};
    > div {
      background-color: white;
    }
  }
  &:focus {
    box-shadow: none;
  }
`;
const StyledALink = styled.a`
  text-decoration: none;
  color: white;
  font-size: ${props => `${props.fontsize}px`};
  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
  }
  span {
    display: block;
  }
`;
export {
  StyledSidebarContainer,
  StyledUserBox,
  StyledUserName,
  StyledUserEmail,
  StyledUserRole,
  StyledLinkBox,
  StyledFuncBox,
  StyledButton,
  StyledHTMLLinkBox,
  StyledALink
};
