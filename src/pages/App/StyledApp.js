import styled from 'styled-components';
import { padSize } from 'utility/app/rwd';
export const StyledBackground = styled.div`
  background: rgb(69, 142, 93);
  background: radial-gradient(circle, rgba(69, 142, 93, 1) 0%, rgba(69, 187, 193, 1) 100%);
  min-height: calc(100vh - 89px);
  position: relative;
  padding-bottom: 1rem;
  @media (max-width: ${padSize}) {
    padding-top: 83px;
  }
  @media (max-width: 575px) {
    padding-top: 51px;
  }
  @media (max-width: 320px) {
    padding-top: 71px;
  }
`;
export const StyledSpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  img {
    width: 300px;
    margin-bottom: 0.5rem;
  }
  span {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    &:first-of-type{
      margin-bottom: 0;
    }
  }
  .spinner{
    width: 4rem;
    height: 4rem;
  }
}
`;
