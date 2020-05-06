import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import Modal from 'components/Modal';
import { actionOptions, levelOptions } from './options/options';
import { Row, Col, Input } from 'reactstrap';
import { StyledDatePickerBox } from './StyledFilterModal';
const today = new Date();
today.setDate(today.getDate());
const FilterModal = ({ modalIsOpen, toggleModal, filterNews }) => {
  const [level, setLevel] = useState('');
  const [action, setAction] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState(today);
  const handleCloseModal = () => {
    setLevel('');
    setAction('');
    setStartTime('');
    setEndTime(today);
    toggleModal();
  };
  const handleDateOnChage = (date, setFunc) => {
    setFunc(date);
  };
  const handeInputChange = (e, setFunc) => {
    setFunc(e.target.value);
  };
  const handleSubmit = () => {
    const request = {
      level: level,
      action: action,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : ''
    };
    filterNews(request);
    handleCloseModal();
  };
  const renderActionOptions = actionOptions.map(action => (
    <FormattedMessage id={action.formattedId} key={action.value}>
      {message => <option value={action.value}>{message}</option>}
    </FormattedMessage>
  ));
  const renderLevelOptions = levelOptions.map(level => (
    <FormattedMessage id={`common.${level}`} key={level}>
      {message => <option value={level}>{message}</option>}
    </FormattedMessage>
  ));
  return (
    <Modal
      isOpen={modalIsOpen}
      toggle={toggleModal}
      closeModal={handleCloseModal}
      handleSubmit={handleSubmit}
      title='Filters'
      titleSmColWidth={4}
    >
      <Row className='mt-2'>
        <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
          <FormattedMessage id='logAndNews.filters.level' />:
        </Col>
        <Col sm={8}>
          <Input bgsize='sm' type='select' value={level} onChange={e => handeInputChange(e, setLevel)}>
            <FormattedMessage id='logAndNews.filters.level.placeholder'>
              {message => <option value=''>{message}</option>}
            </FormattedMessage>
            {renderLevelOptions}
          </Input>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
          <FormattedMessage id='logAndNews.filters.action' />:
        </Col>
        <Col sm={8}>
          <Input bgsize='sm' type='select' value={action} onChange={e => handeInputChange(e, setAction)}>
            <FormattedMessage id='logAndNews.filters.action.placeholder'>
              {message => <option value=''>{message}</option>}
            </FormattedMessage>
            {renderActionOptions}
          </Input>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
          <FormattedMessage id='logAndNews.filters.startTime' />:
        </Col>
        <Col sm={8}>
          <StyledDatePickerBox>
            <DatePicker
              selectsStart
              selected={startTime}
              onChange={date => handleDateOnChage(date, setStartTime)}
              startDate={startTime}
              endDate={endTime}
              maxDate={endTime}
              showYearDropdown
              dateFormatCalendar='MMMM'
              scrollableYearDropdown
              yearDropdownItemNumber={3}
              className='w-100 form-control'
              isClearable={true}
              dateFormat='yyyy/MM/dd'
            />
          </StyledDatePickerBox>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
          <FormattedMessage id='logAndNews.filters.endTime' />:
        </Col>
        <Col sm={8}>
          <StyledDatePickerBox>
            <DatePicker
              selectsEnd
              selected={endTime}
              onChange={date => handleDateOnChage(date, setEndTime)}
              startDate={startTime}
              endDate={endTime}
              minDate={startTime}
              maxDate={today}
              showYearDropdown
              dateFormatCalendar='MMMM'
              scrollableYearDropdown
              yearDropdownItemNumber={3}
              className='w-100 form-control'
              isClearable={true}
              dateFormat='yyyy/MM/dd'
            />
          </StyledDatePickerBox>
        </Col>
      </Row>
    </Modal>
  );
  // return (
  //   <StyledModal isOpen={modalIsOpen} toggle={toggleModal}>
  //     <StyledModalBody>
  //       <StyledCloseBox>
  //         <img src={closeIcon} alt='' onClick={handleCloseModal} />
  //       </StyledCloseBox>
  //       <Row>
  //         <Col sm={4}>
  //           <StyledTitle>
  //             <StyledIcon src={dateIcon} width={20} alt='' />
  //             <span>Filters</span>
  //           </StyledTitle>
  //         </Col>
  //       </Row>
  //       <Row className='mt-2'>
  //         <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
  //           <FormattedMessage id='logAndNews.filters.level' />:
  //         </Col>
  //         <Col sm={8}>
  //           <Input bgsize='sm' type='select' value={level} onChange={e => handeInputChange(e, setLevel)}>
  //             <FormattedMessage id='logAndNews.filters.level.placeholder'>
  //               {message => <option value=''>{message}</option>}
  //             </FormattedMessage>
  //             {renderLevelOptions}
  //           </Input>
  //         </Col>
  //       </Row>
  //       <Row className='mt-2'>
  //         <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
  //           <FormattedMessage id='logAndNews.filters.action' />:
  //         </Col>
  //         <Col sm={8}>
  //           <Input bgsize='sm' type='select' value={action} onChange={e => handeInputChange(e, setAction)}>
  //             <FormattedMessage id='logAndNews.filters.action.placeholder'>
  //               {message => <option value=''>{message}</option>}
  //             </FormattedMessage>
  //             {renderActionOptions}
  //           </Input>
  //         </Col>
  //       </Row>
  //       <Row className='mt-2'>
  //         <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
  //           <FormattedMessage id='logAndNews.filters.startTime' />:
  //         </Col>
  //         <Col sm={8}>
  //           <StyledDatePickerBox>
  //             <DatePicker
  //               selectsStart
  //               selected={startTime}
  //               onChange={date => handleDateOnChage(date, setStartTime)}
  //               startDate={startTime}
  //               endDate={endTime}
  //               maxDate={endTime}
  //               showYearDropdown
  //               dateFormatCalendar='MMMM'
  //               scrollableYearDropdown
  //               yearDropdownItemNumber={3}
  //               className='w-100'
  //               isClearable={true}
  //               dateFormat='yyyy/MM/dd'
  //             />
  //           </StyledDatePickerBox>
  //         </Col>
  //       </Row>
  //       <Row className='mt-2'>
  //         <Col sm={4} className='d-flex justify-content-start justify-content-sm-end align-items-center'>
  //           <FormattedMessage id='logAndNews.filters.endTime' />:
  //         </Col>
  //         <Col sm={8}>
  //           <StyledDatePickerBox>
  //             <DatePicker
  //               selectsEnd
  //               selected={endTime}
  //               onChange={date => handleDateOnChage(date, setEndTime)}
  //               startDate={startTime}
  //               endDate={endTime}
  //               minDate={startTime}
  //               maxDate={today}
  //               showYearDropdown
  //               dateFormatCalendar='MMMM'
  //               scrollableYearDropdown
  //               yearDropdownItemNumber={3}
  //               className='w-100'
  //               isClearable={true}
  //               dateFormat='yyyy/MM/dd'
  //             />
  //           </StyledDatePickerBox>
  //         </Col>
  //       </Row>
  //     </StyledModalBody>
  //     <StyledModalFooter>
  //       <StyledClickBox onClick={handleSubmit}>
  //         <StyledIcon src={sureIcon} width={30} />
  //         <FormattedMessage id='common.sure' description='Sure' />
  //       </StyledClickBox>
  //       <StyledClickBox onClick={handleCloseModal}>
  //         <StyledIcon src={cancelIcon} width={30} />
  //         <FormattedMessage id='common.cancel' description='Cancel' />
  //       </StyledClickBox>
  //     </StyledModalFooter>
  //   </StyledModal>
  // );
};

export default FilterModal;
