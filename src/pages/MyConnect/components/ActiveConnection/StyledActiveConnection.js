import styled from 'styled-components';

const StyledTitle = styled.p`
  margin-bottom: 0;
  position: absolute;
  color: white;
  top: -2rem;
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: 600;
  padding-left: 1.5rem;
  @media (max-width: 575px) {
    position: static;
  }
`;
const StyledUserBox = styled.div`
  padding: 10px 30px;
  background: #29567e;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const StyledUser = styled.div`
  word-break: break-all;
  img {
    display: inline-block;
  }
  > span {
    margin-left: 0.5rem;
    font-weight: 600;
  }
`;
const StyledConnectContainer = styled.div`
  padding: 5px 5px 6rem 5px;
`;

const StyledConnectInfoContainer = styled.div`
  background: white;
  padding: 20px 25px;
`;
const StyledConnectInfoTitle = styled.div`
  margin-bottom: 10px;
  display: flex;
  img {
    width: 22px;
    height: 22px;
  }
  span {
    margin-left: 0.5rem;
    display: inline-block;
    &:first-of-type {
      margin-left: 1rem;
      margin-right: 1rem;
      font-weight: bold;
      max-width: 596px;
      @media (max-width: 575px) {
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
`;
const StyledConnectDeviceInfo = styled.ul`
  padding-left: 37px;
  list-style: none;
  li {
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    img {
      width: 20px;
    }
    &:first-of-type:before {
      top: 0px;
      height: 15px;
    }
    &:before {
      position: absolute;
      left: -30px;
      top: -7px;
      content: '';
      width: 20px;
      height: 21px;
      display: block;
      border-left: 2px dotted #aaa;
      border-bottom: 2px dotted #aaa;
    }
  }
`;
const StyledDeviceDetail = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;
export {
  StyledTitle,
  StyledUserBox,
  StyledConnectContainer,
  StyledUser,
  StyledConnectInfoContainer,
  StyledConnectInfoTitle,
  StyledConnectDeviceInfo,
  StyledDeviceDetail
};
