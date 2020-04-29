import styled from 'styled-components';
import { ModalBody, ModalHeader } from 'reactstrap';
export const StyledImg = styled.img`
  width: 35px;
  cursor: pointer;
  margin-left: 20px;
`;
export const StyledModalBody = styled(ModalBody)`
  > div {
    position: relative !important;
  }
  .mapboxgl-popup-content {
    min-width: 200px;
  }
`;

export const StyledModalHeader = styled(ModalHeader)`
  > h5 {
    width: 100%;
  }
`;
export const StyledMapNote = styled.div`
  width: calc(100% - 89px);
  display: inline-block;
  text-align: center;
  @media (max-width: 575px) {
    text-align: left;
    display: inline;
    margin-left: 0.5rem;
  }
`;
export const StyledStatus = styled.div`
  color: ${props => props.color};
  display: inline-block;
  margin-left: 0.5rem;
  font-weight: 400;
  font-size: 16px;
`;
export const StyledMachName = styled.h6`
  max-width: 170px;
  max-height: 100px;
  overflow-y: auto;
`;
export const StyledContentBox = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledPopupCotent = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;
export const StyledMarkerCirCle = styled.div`
  width: 20px;
  height: 20px;
  color: #fff;
  background: #f8371f;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #ffffff;
`;
