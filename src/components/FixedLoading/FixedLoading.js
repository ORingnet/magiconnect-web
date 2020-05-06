import React from 'react';
import { StyledIsLoadingBox, StyledSpinner } from './StyledFixedLoading';
/**
 * @constructor
 * 連線及斷線的 loading
 */
const FixedLoading = () => {
  return (
    <StyledIsLoadingBox>
      <p>Processing...</p>
      <StyledSpinner color='primary' />
    </StyledIsLoadingBox>
  );
};

export default FixedLoading;
