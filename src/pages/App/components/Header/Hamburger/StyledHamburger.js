import styled from 'styled-components';
const StyledHamburger = styled.div`
  cursor: pointer;
  transform: rotate(0);
  transition: 0.5s ease-in-out;
  width: 25px;
  height: 30px;
  position: relative;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
  span {
    background: #fff;
    border-radius: 9px;
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    transform: rotate(0);
    transition: transform 0.25s ease-in-out;
    width: 100%;
    background: #2e363c;
    &:first-child {
      top: ${props => (props.sidebarIsOpen ? '15px' : '5px')};
      transform: ${props => (props.sidebarIsOpen ? 'rotate(45deg) ' : 'rotate(0)')};
    }
    &:nth-child(2) {
      top: 15px;
      opacity: ${props => (props.sidebarIsOpen ? '0' : '1')};
      transition: opacity 0.15s ease-in-out;
    }
    &:last-child {
      top: ${props => (props.sidebarIsOpen ? '15px' : '25px')};
      transform: ${props => (props.sidebarIsOpen ? 'rotate(135deg) ' : 'rotate(0)')};
    }
  }
`;
export { StyledHamburger };
