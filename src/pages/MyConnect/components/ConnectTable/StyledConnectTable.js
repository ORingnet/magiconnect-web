import styled from 'styled-components';
import { Table, UncontrolledTooltip, DropdownToggle, DropdownItem } from 'reactstrap';
import { padSize } from 'utility/app/rwd';
export const StyledUncontrolledTooltip = styled(UncontrolledTooltip)`
  .bg-warning {
    color: black;
  }
`;
export const StyledTableCotainer = styled.div`
  @media (max-width: ${padSize}) {
    padding-bottom: ${props => (props.connectd === 'true' ? '0px' : '6rem')};
  }
`;
export const StyledTable = styled(Table)`
  text-align: center;
  /* table-layout: fixed; */
  margin-bottom: 2rem;
  thead {
    background: #29567e;
    th {
      border: none;
      color: white;
      white-space: nowrap;
    }
  }
  td {
    word-break: break-all;
    vertical-align: middle;
    max-width: 167px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% / 7);
    &:first-child {
      width: auto;
    }
    &:nth-child(3) {
      overflow: unset;
    }
  }
  @media (max-width: ${padSize}) {
    text-align: left;
    table-layout: fixed;
    thead {
      display: none;
    }
    tr {
      margin-bottom: 0.3rem;
      display: block;
    }
    td {
      display: block;
      max-width: none;
      &:not(:first-child) {
        width: 100%;
      }
      &:first-child {
        display: ${props => (props.connectd === 'true' && props.loading === 'false' ? 'none' : 'block')};
      }
      &:before {
        content: attr(data-title);
        display: inline-block;
        width: auto;
        min-width: 20%;
        font-weight: 900;
        padding-left: 0.6rem;
        color: #212529;
      }
    }
  }
  @media (max-width: 768px) {
    td {
      &:before {
        min-width: 145px;
      }
    }
  }
`;
export const StyledTr = styled.tr`
  background-color: ${props => (props.ischecked ? '#eff8fd' : 'white')};
  cursor: pointer;
`;
export const StyledNodataTr = styled.tr`
  background-color: white;
`;
export const StyledTd = styled.td`
  color: ${props => props.color};
`;

export const StyledDropdownToggle = styled(DropdownToggle)`
  color: #007bff;
  border-color: #007bff;
  background-color: transparent;
  &.btn-secondary.dropdown-toggle {
    color: #007bff;
    border-color: #007bff;
    background-color: transparent;
  }
  &:hover,
  &:focus,
  &.btn-secondary:not(:disabled):not(.disabled):active {
    border-color: #007bff;
    background-color: #007bff;
    color: white;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
`;
export const StlyedActionPhoneContainer = styled.div`
  display: inline-flex;
  @media (max-width: ${padSize}) {
    width: calc(100% - 145px);
    max-width: 80%;
    flex-wrap: wrap;
  }
`;
export const StyledDropdownItem = styled(DropdownItem)`
  padding: 0 7px;
`;
