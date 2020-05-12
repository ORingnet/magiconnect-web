import styled from 'styled-components';
import { Badge } from 'reactstrap';
import { padSize } from 'utility/app/rwd';
const blue = '#2d3943';

const StyledLogDialog = styled.div`
  border: 10px solid ${blue};
  position: absolute;
  background-color: #fff;
  z-index: 15;
  right: 30px;
  top: 0;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  animation: swing-in-top-fwd 0.5s ease-in-out both;
  @media (max-width: ${padSize}) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column-reverse;
  }
  @keyframes swing-in-top-fwd {
    0% {
      transform: rotateX(-100deg);
      transform-origin: top;
      opacity: 0;
    }
    100% {
      transform: rotateX(0deg);
      transform-origin: top;
      opacity: 1;
    }
  }
`;
const StyledLogContent = styled.div`
  width: 100%;
  padding: 5px 10px;
  font-size: 1em;
  max-height: 300px;
  overflow: auto;
  > ul {
    padding: 0 5px;
    list-style: none;
  }
  li {
    padding: 5px 0;
    > span {
      margin-left: 0.5rem;
    }
  }
  p {
    display: inline;
    margin-left: 1rem;
  }
  @media (max-width: ${padSize}) {
    max-height: 100%;
    height: 100vh;
  }
`;
const StyledLogFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: ${blue};
  color: white;
`;
const StyledLogFooterBtn = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.4;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  padding: 10px 10px 5px;
  > span {
    margin-left: 10px;
  }
  &:hover {
    opacity: 1;
  }
  @media (max-width: ${padSize}) {
    padding: 5px 10px 10px;
  }
`;
const StyledBadge = styled(Badge)`
  width: 75px;
`;
export { StyledLogDialog, StyledLogContent, StyledLogFooter, StyledLogFooterBtn, StyledBadge };
