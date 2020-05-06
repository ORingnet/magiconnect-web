import React from 'react';

import connectedIcon from 'assets/img/myConnect/icon-connect.svg';
// import connectingIcon from 'assets/img/myConnect/icon-connecting.svg';
import { Circle, StyledSpinner } from './StyledSwitchStatus';
const switchStatus = status => {
  switch (status) {
    case 'On-Line': {
      return {
        color: '#469D83',
        img: <Circle background='#469D83' />
      };
    }
    case 'Off-Line': {
      return {
        color: '#B1B1B1',
        img: <Circle background='#B1B1B1' />
      };
    }
    case 'Connected': {
      return {
        color: '#F5A623',
        imgSrc: connectedIcon
      };
    }
    case 'Connecting': {
      return {
        color: '#F5A623',
        img: <StyledSpinner size='sm' />
      };
    }
    case 'updating': {
      return {
        color: '#007bff',
        img: <StyledSpinner size='sm' />
      };
    }
    default: {
      return {
        color: '#B1B1B1',
        img: <Circle background='#B1B1B1' />
      };
    }
  }
};
export default switchStatus;
