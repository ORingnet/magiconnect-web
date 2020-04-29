import React from 'react';
import { StyledFuncBox, StyledUncontrolledTooltip } from './StyledFuncBox';

const FuncBox = ({ onclick, ischecked, icon, tooltipMsg, tooltipId, imgClassName }) => {
  return (
    <>
      <StyledFuncBox onClick={onclick} ischecked={ischecked} id={tooltipId}>
        <img src={icon} alt='' className={imgClassName} />
      </StyledFuncBox>
      <StyledUncontrolledTooltip target={tooltipId}>
        <span>{tooltipMsg}</span>
      </StyledUncontrolledTooltip>
    </>
  );
};

export default FuncBox;
