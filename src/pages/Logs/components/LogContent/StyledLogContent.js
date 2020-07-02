import styled from 'styled-components';
import { Badge } from 'reactstrap';
export const StyledTitle = styled.p`
  color: #fff;
  font-size: 1.5rem;
  padding: 5px 1.5rem;
  margin: 0;
`;
export const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  time {
    width: 180px;
    display: inline-block;
    margin-right: 1rem;
  }
  li {
    padding: 0.5rem 1.5rem;
    margin-bottom: 5px;
    background: #f1f8ff;
    font-size: 1rem;
    p {
      display: inline;
    }
  }
`;
export const StyledNoDataBox = styled.div`
  padding: 0.5rem 1.5rem;
  background: #f1f8ff;
  font-size: 1rem;
`;

export const StyledBadge = styled(Badge)`
  width: 75px;
  margin-right: 1rem;
`;
export const StyledBadgeBox = styled.div`
  display: inline-block;
`;
