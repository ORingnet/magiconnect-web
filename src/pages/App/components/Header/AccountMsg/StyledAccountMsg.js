import styled from 'styled-components';
import { Button, DropdownItem, DropdownToggle } from 'reactstrap';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 25px;
  margin: 5px 0;
  font-size: 14px;
  > * {
    margin: 0 5px;
  }
`;
export const StyledButton = styled(Button)`
  border-color: ${props => props.color};
  color: ${props => props.color};
  display: flex;
  align-items: center;
  > div {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.color};
  }
  &:hover {
    cursor: default;
    color: ${props => props.color};
    background-color: transparent;
    border-color: ${props => props.color};
    > div {
      background-color: ${props => props.color};
    }
  }
  &:focus {
    box-shadow: none;
  }
`;
export const StyledLink = styled(Button)`
  a {
    text-decoration: none;
    color: #007bff;
    white-space: nowrap;
  }
  &:hover,
  &:focus {
    a {
      text-decoration: none;
    }
  }
  &:hover {
    a {
      color: white;
    }
  }
  &:focus {
    a {
      color: #007bff;
    }
  }
`;
export const StyledDropdownToggle = styled(DropdownToggle)`
  color: #007bff;
  border-color: #007bff;
  background-color: transparent;
  &:hover,
  &:focus {
    border-color: #007bff;
    background-color: #007bff;
    color: white;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;
export const StyledDropdownItem = styled(DropdownItem)`
  padding: 0 10px;
  a {
    color: #212529;
    &:hover {
      text-decoration: none;
    }
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: #212529;
    background-color: #f8f9fa;
  }
`;
