import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import closeIcon from 'assets/img/common/close.svg';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import { StyledModal, StyledModalBody, StyleCopyContent, StyledModalFooter, StyledCopyButton } from './StyledCopyModal';
/**
 * @constructor
 * 複製的 Modal
 * @param  {string} children - 要顯示的內容
 * @param  {boolen} isOpen - modal 的開關
 * @param  {function} toggle - 控制 modal 的開關
 * @param  {bollen} isLoading - 控制內容進入 loading
 * @param  {string} copyTitle - 要顯示的文字 => 複製 "文字"
 * @function handleCopy - 跳出複製消息並觸發 toggle
 * @function renderCotent - 當 loading 結束顯示 copyTitle
 */
const CopyModal = ({ children, isOpen, toggle, isLoading, copyTitle }) => {
  const handleCopy = () => {
    toast.success(
      <Fragment>
        <FormattedMessage id='copy' />
        <span className='mx-1'>{copyTitle}</span>
        <FormattedMessage id='success' />
      </Fragment>,
      { position: toast.POSITION.TOP_RIGHT }
    );
    toggle();
  };
  const renderCotent = () => {
    if (!isLoading) {
      return <StyleCopyContent>{children}</StyleCopyContent>;
    }
    return (
      <div className='d-flex justify-content-center w-100'>
        <Spinner />
      </div>
    );
  };
  return (
    <StyledModal isOpen={isOpen} toggle={toggle} size='md'>
      <StyledModalBody>
        {renderCotent()}
        <img src={closeIcon} alt='' onClick={toggle} />
      </StyledModalBody>
      <StyledModalFooter>
        <CopyToClipboard text={children} onCopy={handleCopy}>
          <StyledCopyButton disabled={isLoading}>
            <FormattedMessage id='copy' />
            <span className='ml-1'>{copyTitle}</span>
          </StyledCopyButton>
        </CopyToClipboard>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default CopyModal;
