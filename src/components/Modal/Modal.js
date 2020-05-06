import React from 'react';
import { FormattedMessage } from 'react-intl';
import closeIcon from 'assets/img/common/close.svg';
import sureIcon from 'assets/img/common/icon-v.png';
import cancelIcon from 'assets/img/common/icon-x.png';
import dateIcon from 'assets/img/common/date.png';
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
/**
 * @constructor
 * 用在新增及修改上的 modal 基底
 * @param  {jsx} children - 要顯示進來的內容
 * @param  {string} title - 小標題
 * @param  {number} [titleSmColWidth=5] - 小標題在 sm 大小的寬
 * @param  {boolen} isOpen - modal 開關
 * @param  {function} toggle - 控制 modal 的開關
 * @param  {function} closeModal - 關閉 modal
 * @param  {boolen} isLoading - loading 狀態
 * @param  {function} handleSubmit - 按下確認鈕執行的事
 * @param  {function} checkSubmit - 當滿足條件才能執行，回傳布林值
 */
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
