import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
const StyledCloseBox = styled.div`
  text-align: right;
  img {
    width: 22px;
    cursor: pointer;
  }
`;
const StyledModal = styled(Modal)`
  border: 4px solid #2d3943;
  > .modal-content {
    border: none;
    border-radius: unset;
  }
`;
const StyledModalBody = styled(ModalBody)`
  padding: 5px 10px 10px;
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
const StyledClickBox = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.disable ? '0.5' : '1')};
  pointer-events: ${props => (props.disable ? 'none' : 'all')};
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  > span {
    margin-left: 20px;
  }
`;
const StyledTitle = styled.div`
  display: ${props => props.display || 'flex'};
  align-items: center;
  justify-content: flex-end;
  > span {
    white-space: nowrap;
  }
  @media (max-width: 576px) {
    justify-content: flex-start;
  }
`;
export { StyledModal, StyledModalBody, StyledCloseBox, StyledModalFooter, StyledClickBox, StyledIcon, StyledTitle };
