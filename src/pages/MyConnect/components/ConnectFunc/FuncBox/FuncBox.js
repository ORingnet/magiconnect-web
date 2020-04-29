import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StyledFuncBox } from './StyledFuncBox';
const FuncBox = ({ ischecked, Icon, formattedMessage, clickEvent, imgClassName }) => {
  return (
    <StyledFuncBox ischecked={ischecked} onClick={clickEvent}>
      <div>
        <img src={Icon} alt='' className={imgClassName} />
      </div>
      <FormattedMessage id={formattedMessage} />
    </StyledFuncBox>
  );
};

export default FuncBox;
