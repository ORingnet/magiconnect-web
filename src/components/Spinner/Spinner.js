import React from 'react';
import { Spinner } from 'reactstrap';
import { StyledSpinnerBox } from './StyledSpinner';
const SpinnerComponent = ({ color, size }) => {
  return (
    <StyledSpinnerBox size={size} margin='0'>
      <Spinner color={color || 'primary'} className='spinner' />
    </StyledSpinnerBox>
  );
};

export default SpinnerComponent;
