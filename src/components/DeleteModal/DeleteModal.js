import React from 'react';
import { FormattedMessage } from 'react-intl';
import sureIcon from 'assets/img/common/icon-v.png';
import cancelIcon from 'assets/img/common/icon-x.png';
import Spinner from '../Spinner';
import {
  StyledModal,
  StyledModalBody,
  StyledModalFooter,
  StyledIcon,
  StyledTitle,
  StyledClickBox
} from './StyledDeleteModal';
/**
 * @constructor
 * 刪除的 modal
 * @param  {boolen} isOpen modal 的開關
 * @param  {boolen} isLoading 控制確認按鈕進入 loading
 * @param  {function} toggle 控制 modal 的開關
 * @param  {function} handleSubmit 送出刪除指令
 * @param  {string} name 顯示要刪除的代表文字
 * @function renderDeleteButton 顯示確認按鈕
 */
const DeleteModal = ({ isOpen, isLoading, toggle, handleSubmit, name }) => {
  const renderDeleteButton = () => {
    if (!isLoading) {
      return (
        <StyledClickBox onClick={handleSubmit}>
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
        <StyledTitle>
          <FormattedMessage id='common.sureDelete' />
        </StyledTitle>
        <FormattedMessage id='common.sureDelete.content' />
        <p>{name}</p>
        <FormattedMessage id='common.sureDelete.end' />
      </StyledModalBody>
      <StyledModalFooter>
        {renderDeleteButton()}
        <StyledClickBox onClick={toggle}>
          <StyledIcon src={cancelIcon} width={30} />
          <FormattedMessage id='common.cancel' description='Cancel' />
        </StyledClickBox>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default DeleteModal;
