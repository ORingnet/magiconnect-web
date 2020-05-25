import styled from 'styled-components';
import { UncontrolledDropdown, DropdownItem } from 'reactstrap';
export const StyledUncontrolledDropdown = styled(UncontrolledDropdown)`
  > button {
    padding: 8px;
    border-radius: 0;
  }
  img {
    width: 21px;
  }
`;
export const StyledDropdownItem = styled(DropdownItem)`
  padding: 0 10px;
  display: flex;
`;
