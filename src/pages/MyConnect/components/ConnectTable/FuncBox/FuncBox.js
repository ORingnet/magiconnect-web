import React from 'react';
import { StyledFuncBox } from './StyledFuncBox';
const FuncBox = ({ imgSrc, clickFunc }) => {
  return (
    <StyledFuncBox onClick={clickFunc}>
      <img src={imgSrc} alt='' />
    </StyledFuncBox>
  );
};

export default FuncBox;
