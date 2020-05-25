import styled from 'styled-components';
import { padSize } from 'utility/app/rwd';
export const StyledContainer = styled.div`
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledTitle = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
  letter-spacing: 2px;
`;
export const StyledFuncContainer = styled.div`
  display: flex;
  @media (max-width: ${padSize}) {
    display: none;
  }
`;

export const StyledInputContainer = styled.div`
  background: white;
  display: flex;
  align-items: center;
  padding: 7px;
  width: 100%;
  input {
    outline: none;
    border: none;
    padding: 0;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  img {
    flex-grow: 0;
    flex-shrink: 0;
    width: 27px;
    height: 27px;
  }
`;
export const StyledSearchContainer = styled.div`
  display: flex;
  width: 100%;
`;
