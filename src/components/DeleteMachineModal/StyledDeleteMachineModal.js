import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
const StyledImg = styled.img`
  width: 35px;
  cursor: pointer;
  margin-left: 20px;
`;
const StyledModal = styled(Modal)`
  border: 4px solid #2d3943;
  > .modal-content {
    border: none;
    border-radius: unset;
  }
`;
const StyledModalBody = styled(ModalBody)`
  padding: 30px;
  text-align: center;
  > span {
    display: block;
    margin-bottom: 0.5rem;
  }
  > p {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;
const StyledModalFooter = styled(ModalFooter)`
  background-color: #2d3943;
  color: white;
  border: none;
  border-radius: unset;
  flex-wrap: nowrap;
`;
const StyledIcon = styled.img`
  width: ${props => props.width || 20}px;
`;
const StyledTitle = styled.div`
  color: #003eff;
  font-size: 1.5rem;
`;
const StyledClickBox = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > span {
    margin-left: 20px;
  }
`;

export { StyledImg, StyledModal, StyledModalBody, StyledModalFooter, StyledIcon, StyledTitle, StyledClickBox };
