import styled from 'styled-components';
import { UncontrolledTooltip } from 'reactstrap';

const StyledUncontrolledTooltip = styled(UncontrolledTooltip)`
  .bg-warning {
    color: black;
  }
`;
const StyledFuncBox = styled.div`
  background: red;
  padding: 4px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  cursor: ${props => (props.ischecked ? 'pointer' : 'default')};
  pointer-events: ${props => (props.ischecked ? 'all' : 'none')};
  opacity: ${props => (props.ischecked ? '1' : '0.5')};
  &:hover {
    background: #cd0000;
  }
  img {
    width: 17px;
    &.edit {
      width: 21px;
    }
  }
`;
export { StyledFuncBox, StyledUncontrolledTooltip };
