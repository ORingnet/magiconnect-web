import styled from 'styled-components';
import { Spinner } from 'reactstrap';
export const Circle = styled.div`
  border-radius: 50%;
  background: ${props => props.background};
  width: 6px;
  height: 6px;
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 2px;
`;

export const StyledSpinner = styled(Spinner)`
  margin-right: 1rem;
`;
