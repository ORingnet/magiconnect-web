import styled from 'styled-components';
import { Input } from 'reactstrap';
const StyledImg = styled.img`
  width: 35px;
  cursor: pointer;
  margin-left: 20px;
`;
const StyledInput = styled(Input)`
  &::placeholder {
    color: #c7c7c7;
  }
`;
export { StyledImg, StyledInput };
