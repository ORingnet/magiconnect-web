import styled from 'styled-components';
const StyledSpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  margin: ${props => (props.margin ? props.margin : '1rem 0')};
  .spinner {
    width: ${props => (props.size ? props.size : '4rem')};
    height: ${props => (props.size ? props.size : '4rem')};
  }
`;
export { StyledSpinnerBox };
