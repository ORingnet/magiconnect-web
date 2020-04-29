import styled from 'styled-components';
const StyledContainer = styled.div`
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledTitle = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
  letter-spacing: 2px;
`;
const StyledFuncContainer = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 0;
    justify-content: space-around;
    z-index: 1;
    display: ${props => (props.mobilenone ? 'none' : 'flex')};
  }
`;

const StyledInputContainer = styled.div`
  background: white;
  display: flex;
  align-items: center;
  padding: 7px;
  input {
    outline: none;
    border: none;
    padding: 0;
    width: calc(100%);
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

export { StyledContainer, StyledTitle, StyledFuncContainer, StyledInputContainer };
