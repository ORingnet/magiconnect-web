import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const StyledModal = styled(Modal)`
  border: 4px solid #2d3943;
  > .modal-content {
    border: none;
    border-radius: unset;
  }
`;
const StyleCopyContent = styled.div`
  width: 90%;
  text-align: center;
  background: #cacaca;
  font-size: 1.5rem;
`;
const StyledModalBody = styled(ModalBody)`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  img {
    width: 22px;
    cursor: pointer;
    align-self: flex-start;
  }
`;
const StyledModalFooter = styled(ModalFooter)`
  background-color: #2d3943;
  color: white;
  border: none;
  border-radius: unset;
  justify-content: center;
`;

const StyledCopyButton = styled.button`
  border: 1px solid white;
  text-align: center;
  padding: 5px 20%;
  background: transparent;
  color: white;
  &:hover {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  &:disabled:hover {
    background: transparent;
    border-color: white
    cursor:not-allowed;
  }
  &:focus {
    outline: none;
  }
`;
export { StyledModal, StyledModalBody, StyledModalFooter, StyledCopyButton, StyleCopyContent };
