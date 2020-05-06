import React from 'react';
import logIcon from 'assets/img/header/icon-log.png';
import { StyledUncontrolledTooltip } from '../StyledHeader';
import { StyledImg, StyledImgContainer, StyledBadge } from './StyledShowNewsBtn';
const ShowNewsBtn = ({ newsDialogs, toggleNews }) => {
  const renderBadge = () => {
    if (newsDialogs.length > 0) {
      return <StyledBadge color='danger'>{newsDialogs.length}</StyledBadge>;
    }
  };

  return (
    <StyledImgContainer>
      <StyledImg src={logIcon} alt='log' onClick={toggleNews} id='allNews' />
      <StyledUncontrolledTooltip target='allNews'>All News</StyledUncontrolledTooltip>
      {renderBadge()}
    </StyledImgContainer>
  );
};

export default ShowNewsBtn;
