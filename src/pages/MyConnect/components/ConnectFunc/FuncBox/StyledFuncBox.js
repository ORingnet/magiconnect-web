import styled from 'styled-components';
const StyledFuncBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 20px;
  font-weight: bold;
  font-size: 16px;
  pointer-events: ${props => (props.ischecked ? 'all' : 'none')};
  cursor: ${props => (props.ischecked ? 'pointer' : 'default')};
  &:hover {
    color: red;
    div {
      background: linear-gradient(7deg, #711ea1 0%, #fd1515 100%);
    }
  }
  @media (max-width: 1024px) {
    margin-left: 0;
  }
  > span {
    @media (max-width: 1200px) {
      display: none;
    }
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(7deg, #1e4ba1 0%, #158afd 100%);
    border-radius: 5px;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    opacity: ${props => (props.ischecked ? '1' : '0.5')};
    img {
      width: 20px;
      &.big {
        width: 23px;
      }
    }
    @media (max-width: 1024px) {
      margin-right: 0;
      width: 50px;
      height: 50px;
      img {
        width: 30px;
        &.big {
          width: 34px;
        }
      }
    }
  }
`;
export { StyledFuncBox };
