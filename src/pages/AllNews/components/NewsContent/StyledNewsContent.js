import styled from 'styled-components';
import { Badge } from 'reactstrap';
const StyledTitle = styled.p`
  color: white;
  font-size: 1.5rem;
  padding: 5px 1.5rem;
  margin: 0;
`;
const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  li {
    padding: 0.5rem 1.5rem;
    margin-bottom: 5px;
    background: #f1f8ff;
    font-size: 1rem;
    > span {
      margin-left: 1rem;
    }
  }
  p {
    display: inline;
    margin-left: 1rem;
  }
`;
const StyledNoDataBox = styled.div`
  padding: 0.5rem 1.5rem;
  background: #f1f8ff;
  font-size: 1rem;
`;

const StyledBadge = styled(Badge)`
  width: 75px;
`;
export { StyledTitle, StyledUl, StyledBadge, StyledNoDataBox };
