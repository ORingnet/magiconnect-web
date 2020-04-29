import styled from 'styled-components';
import { Table, UncontrolledTooltip } from 'reactstrap';
const StyledUncontrolledTooltip = styled(UncontrolledTooltip)`
  .bg-warning {
    color: black;
  }
`;
const StyledTableCotainer = styled.div`
  @media (max-width: 1024px) {
    padding-bottom: ${props => (props.connectd === 'true' ? '0px' : '6rem')};
  }
`;
const StyledTable = styled(Table)`
  text-align: center;
  /* table-layout: fixed; */
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

    &:not(:first-child) {
      max-width: 167px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: calc(100% / 6);
    }
  }
  @media (max-width: 1024px) {
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
      &:not(:first-child) {
        max-width: none;
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
const StyledTr = styled.tr`
  background-color: ${props => (props.ischecked ? '#eff8fd' : 'white')};
  cursor: pointer;
`;
const StyledNodataTr = styled.tr`
  background-color: white;
`;
const StyledTd = styled.td`
  color: ${props => props.color};
`;
export { StyledTable, StyledTd, StyledTr, StyledNodataTr, StyledTableCotainer, StyledUncontrolledTooltip };
