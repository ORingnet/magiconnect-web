import React from 'react';
import { StyledInput } from './StyledStyledInput';
const Input = ({ placeholder, ...props }) => {
  const handleFocus = e => {
    return (e.target.placeholder = '');
  };
  const handleBlur = (e, placeholder) => {
    return (e.target.placeholder = placeholder);
  };
  return (
    <StyledInput {...props} placeholder={placeholder} onFocus={handleFocus} onBlur={e => handleBlur(e, placeholder)} />
  );
};

export default Input;
