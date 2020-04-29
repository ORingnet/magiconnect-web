import styled from 'styled-components';
import { Spinner } from 'reactstrap';

export const StyledIsLoadingBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
`;
export const StyledSpinner = styled(Spinner)`
  width: 4rem;
  height: 4rem;
`;
