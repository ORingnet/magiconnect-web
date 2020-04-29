import styled from 'styled-components';
import { UncontrolledTooltip } from 'reactstrap';

const StyledUncontrolledTooltip = styled(UncontrolledTooltip)`
  .bg-warning {
    color: black;
  }
`;
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  background: white;

  @media (max-width: 1024px) {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    z-index: 2;
    border-bottom: 1px solid #ccc;
    align-items: center;
  }
`;
const StyledImg = styled.img`
  width: 300px;
  margin-right: 20px;
  @media (max-width: 575px) {
    width: 120px;
    margin-right: 10px;
  }
`;
const StyledSpan = styled.span`
  font-size: 1rem;
  letter-spacing: 1.5px;
  margin-right: 20px;
  vertical-align: middle;
  color: #212529;
  @media (max-width: 575px) {
    font-size: 0.6rem;
    margin-right: 10px;
  }
`;
const StyledCommand = styled.div`
  display: flex;
  align-items: center;
`;
const StyledRightBar = styled.div`
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
`;
export { StyledHeader, StyledSpan, StyledImg, StyledCommand, StyledRightBar, StyledUncontrolledTooltip };
