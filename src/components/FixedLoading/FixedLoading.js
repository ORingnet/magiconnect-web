import React from 'react';
import { StyledIsLoadingBox, StyledSpinner } from './StyledFixedLoading';
const FixedLoading = () => {
  return (
    <StyledIsLoadingBox>
      <p>Processing...</p>
      <StyledSpinner color='primary' />
    </StyledIsLoadingBox>
  );
};

export default FixedLoading;
