import styled from 'styled-components';
const StyledBackground = styled.div`
  background: #fff;
  background-image: linear-gradient(#fff, #cbcbcb);
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 0.5rem 1rem;
  display: flex;
  @media (max-width: ${padSize}) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: space-around;
  }
`;
const StyledFuncBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #212529;
    &:hover {
      text-decoration: none;
    }
  }
  &:first-child {
    margin-right: 3rem;
    @media (max-width: ${padSize}) {
      margin-right: 0;
    }
  }
  &:not:first-child {
    margin-right: 1.5rem;
    @media (max-width: ${padSize}) {
      margin-right: 0;
    }
  }
  p {
    margin: 0 10px;
    @media (max-width: 575px) {
      display: none;
    }
  }
`;
export { StyledBackground, StyledFuncBox };
