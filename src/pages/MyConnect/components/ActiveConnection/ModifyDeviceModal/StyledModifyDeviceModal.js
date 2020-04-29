import styled from 'styled-components';
import { DropdownItem, UncontrolledDropdown, FormGroup } from 'reactstrap';

const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
const StyledDropdownItem = styled(DropdownItem)`
  position: relative;
  padding-left: 2.5rem;
  img {
    width: 20px;
    position: absolute;
    left: 10px;
    top: 6px;
  }
`;
const StyledFormGroup = styled(FormGroup)`
  display: ${props => (props.show === 'true' ? 'flex' : 'none')};
`;
export { StyledDropdownItem, StyledUncontrolledDropdown, StyledFormGroup };
