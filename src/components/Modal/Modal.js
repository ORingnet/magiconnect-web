import React from 'react';
import { FormattedMessage } from 'react-intl';
import closeIcon from '../../assets/img/common/close.svg';
import sureIcon from '../../assets/img/common/icon-v.png';
import cancelIcon from '../../assets/img/common/icon-x.png';
import dateIcon from '../../assets/img/common/date.png';
import Spinner from '../Spinner';
import { Row, Col } from 'reactstrap';
import {
  StyledModal,
  StyledModalBody,
  StyledCloseBox,
  StyledModalFooter,
  StyledClickBox,
  StyledIcon,
  StyledTitle
} from './StyledModal';
const Modal = ({
  children,
  title,
  titleSmColWidth,
  isOpen,
  toggle,
  closeModal,
  isLoading,
  handleSubmit,
  checkSubmit
}) => {
  const renderSureButton = () => {
    if (!isLoading) {
      return (
        <StyledClickBox onClick={handleSubmit} disable={checkSubmit ? checkSubmit() : false}>
          <StyledIcon src={sureIcon} width={30} />
          <FormattedMessage id='common.sure' description='Sure' />
        </StyledClickBox>
      );
    }
    return (
      <StyledClickBox>
        <Spinner color='white' size='2rem' />
      </StyledClickBox>
    );
  };
  return (
    <StyledModal isOpen={isOpen} toggle={toggle} size='md'>
      <StyledModalBody>
        <StyledCloseBox>
          <img src={closeIcon} alt='' onClick={closeModal} />
        </StyledCloseBox>
        <Row>
          <Col sm={titleSmColWidth ? titleSmColWidth : 5}>
            <StyledTitle>
              <StyledIcon src={dateIcon} width={20} alt={title} />
              <span>{title}</span>
            </StyledTitle>
          </Col>
        </Row>
        <div>{children}</div>
      </StyledModalBody>
      <StyledModalFooter>
        {renderSureButton()}
        <StyledClickBox onClick={closeModal}>
          <StyledIcon src={cancelIcon} width={30} />
          <FormattedMessage id='common.cancel' description='Cancel' />
        </StyledClickBox>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default Modal;
