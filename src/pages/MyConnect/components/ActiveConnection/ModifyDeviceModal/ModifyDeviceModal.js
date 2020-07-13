import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import StyledInput from 'components/StyledInput';

import editIcon from 'assets/img/myConnect/modify-device.png';
import addIcon from 'assets/img/myConnect/plus.svg';

import plcIcon from 'assets/img/myConnect/icon-plc.png';
import ipcamIcon from 'assets/img/myConnect/icon-ipcam.png';
import hmiIcon from 'assets/img/myConnect/icon-hmi.png';
import FuncBox from '../FuncBox';
import Modal from 'components/Modal';

import { Col, Form, FormGroup, FormFeedback, Label, DropdownToggle, DropdownMenu } from 'reactstrap';
import { StyledDropdownItem, StyledUncontrolledDropdown, StyledFormGroup } from './StyledModifyDeviceModal';
const ModifyDeviceModal = ({ machId, device, addDevice, modifyDevice, ischecked, modifyWay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [mask, setMask] = useState('');
  const [showOtherType, setShowOtherType] = useState(false);
  const [descr, setDescr] = useState('');
  const [type, setType] = useState('');
  const [otherType, setOtherType] = useState('');
  const [proto, setProto] = useState('');
  useEffect(() => {
    if (device) {
      setName(device.device_name ? device.device_name : '');
      setIp(device.device_ip ? device.device_ip : '');
      setMask(device.device_mask ? device.device_mask : '');
      setDescr(device.device_descr ? device.device_descr : '');
      setProto(device.device_proto ? device.device_proto : '');
      setType(
        device.device_type === 'PLC' || device.device_type === 'IPCAM' || device.device_type === 'HMI'
          ? device.device_type
          : 'Other'
      );
      setOtherType(
        device.device_type !== 'PLC' && device.device_type !== 'IPCAM' && device.device_type !== 'HMI'
          ? device.device_type
          : ''
      );
      setShowOtherType(device.device_type !== 'PLC' && device.device_type !== 'IPCAM' && device.device_type !== 'HMI');
    }
  }, [device]);
  const checkSubmit = () => {
    return name === '';
  };

  const renderModifyWay = useCallback(() => {
    if (modifyWay === 'add') {
      return {
        tooltipId: 'AddDevice',
        tooltipMsg: 'Add Device',
        modalTitle: 'Add Device',
        imgClassName: '',
        icon: addIcon,
        boxIschecked: ischecked ? false : true
      };
    } else if (modifyWay === 'edit') {
      return {
        tooltipId: 'Modify',
        tooltipMsg: 'Modify',
        modalTitle: 'Modify Device',
        imgClassName: 'edit',
        icon: editIcon,
        boxIschecked: device ? true : false
      };
    }
  }, [device, ischecked, modifyWay]);
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handeInputChange = (e, setFunc) => {
    setFunc(e.target.value);
  };
  const handleIpInputChange = (e, setFunc) => {
    const { value } = e.target;
    setFunc(value.replace(/[^0-9.]/g, ''));
  };
  const handleSelectDropDown = (value, setFunc) => {
    setFunc(value);
    setShowOtherType(value === 'Other');
  };

  const handleCloseModal = () => {
    const checkType = () => {
      if (device) {
        return device.device_type === 'PLC' || device.device_type === 'IPCAM' || device.device_type === 'HMI'
          ? device.device_type
          : 'Other';
      }
      return '';
    };
    const checkOtherType = () => {
      if (device) {
        return device.device_type !== 'PLC' && device.device_type !== 'IPCAM' && device.device_type !== 'HMI'
          ? device.device_type
          : '';
      }
      return '';
    };
    const checkContent = content => {
      if (device) {
        return device[content] ? device[content] : '';
      }
      return '';
    };
    const chekcShowOtherType = () => {
      if (device) {
        return device.device_type !== 'PLC' && device.device_type !== 'IPCAM' && device.device_type !== 'HMI';
      }
    };
    setIsOpen(false);
    setName(checkContent('device_name'));
    setIp(checkContent('device_ip'));
    setMask(checkContent('device_mask'));
    setDescr(checkContent('device_descr'));
    setProto(checkContent('device_proto'));
    setType(checkType());
    setOtherType(checkOtherType());
    setShowOtherType(chekcShowOtherType());
  };
  const handleInvalid = inputItem => {
    return inputItem.needVaild ? inputItem.value === '' : false;
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    let request = {
      device_descr: descr,
      device_ip: ip,
      device_mask: mask,
      device_name: name,
      device_proto: proto,
      device_type: type === 'PLC' || type === 'IPCAM' || type === 'HMI' ? type : otherType,
      mach_id: machId
    };
    if (modifyWay === 'add') {
      await addDevice(machId, request);
    } else if (modifyWay === 'edit') {
      request = { ...request, devices_id: device.devices_id };
      await modifyDevice(machId, device.devices_id, request);
    }
    setIsLoading(false);
    handleCloseModal();
  };
  const inputArr = [
    {
      name: 'name',
      value: name,
      setFunc: setName,
      needVaild: true,
      inputChange: handeInputChange,
      show: true,
      placeholder: 'My device'
    },
    {
      name: 'ip',
      value: ip,
      setFunc: setIp,
      needVaild: false,
      inputChange: handleIpInputChange,
      show: true,
      placeholder: '192.168.1.1'
    },
    {
      name: 'mask',
      value: mask,
      setFunc: setMask,
      needVaild: false,
      inputChange: handleIpInputChange,
      show: true,
      placeholder: '255.255.255.0'
    },
    {
      name: 'descr',
      value: descr,
      setFunc: setDescr,
      needVaild: false,
      inputChange: handeInputChange,
      show: true,
      placeholder: 'My device description'
    },
    {
      name: 'type',
      value: type,
      setFunc: setType,
      needVaild: false,
      type: 'select',
      show: true,
      options: [
        {
          value: 'PLC',
          icon: plcIcon
        },
        {
          value: 'IPCAM',
          icon: ipcamIcon
        },
        {
          value: 'HMI',
          icon: hmiIcon
        },
        {
          value: 'Other'
        }
      ]
    },
    {
      name: 'otherType',
      value: otherType,
      setFunc: setOtherType,
      needVaild: false,
      inputChange: handeInputChange,
      show: showOtherType
    },
    {
      name: 'proto',
      value: proto,
      setFunc: setProto,
      inputChange: handeInputChange,
      needVaild: false,
      show: true,
      placeholder: 'HTTP/SCP/FTP'
    }
  ];
  const renderDropDownImg = inputItem => {
    const result = inputItem.options.find(option => option.value === inputItem.value);
    if (result) {
      return result.icon ? <img src={result.icon} width='20' className='mr-2' alt='' /> : '';
    }
  };
  const renderInvalid = inputItem => {
    if (inputItem.needVaild) {
      if (inputItem.value === '') {
        return (
          <FormFeedback invalid='true'>
            <FormattedMessage id={`deviceModal.${inputItem.name}.invaild`} />
          </FormFeedback>
        );
      }
    }
  };
  const renderInputArr = inputArr.map(inputItem => {
    if (inputItem.type === 'select') {
      const renderOptions = inputItem.options.map(option => (
        <StyledDropdownItem onClick={() => handleSelectDropDown(option.value, setType)} key={option.value}>
          {option.icon ? <img src={option.icon} alt='' /> : ''}
          {option.value}
        </StyledDropdownItem>
      ));
      return (
        <FormGroup key={inputItem.name} className='mt-2' row>
          <Label sm={5} className='text-sm-right'>
            <FormattedMessage id={`deviceModal.${inputItem.name}`} />
          </Label>
          <Col sm={7}>
            <StyledUncontrolledDropdown className='w-100'>
              <DropdownToggle className='w-100 d-flex align-items-center justify-content-between' caret color='light'>
                <div className='d-flex align-items-center'>
                  {renderDropDownImg(inputItem)}
                  {inputItem.value !== '' ? inputItem.value : <FormattedMessage id='deviceModal.type.placeholder' />}
                </div>
              </DropdownToggle>
              <DropdownMenu className='w-100'>{renderOptions}</DropdownMenu>
            </StyledUncontrolledDropdown>
          </Col>
        </FormGroup>
      );
    }
    return (
      <StyledFormGroup show={inputItem.show ? 'true' : 'false'} key={inputItem.name} className='mt-2' row>
        <Label sm={5} className='text-sm-right'>
          <FormattedMessage id={`deviceModal.${inputItem.name}`} />
        </Label>
        <Col sm={7}>
          <StyledInput
            bgsize='sm'
            value={inputItem.value}
            onChange={e => inputItem.inputChange(e, inputItem.setFunc)}
            invalid={handleInvalid(inputItem)}
            placeholder={inputItem.placeholder}
          />
          {renderInvalid(inputItem)}
        </Col>
      </StyledFormGroup>
    );
  });
  const { tooltipId, tooltipMsg, modalTitle, imgClassName, icon, boxIschecked } = renderModifyWay();
  return (
    <Fragment>
      <FuncBox
        onclick={handleToggleModal}
        ischecked={boxIschecked}
        icon={icon}
        tooltipMsg={tooltipMsg}
        tooltipId={tooltipId}
        imgClassName={imgClassName}
      />
      <Form>
        <Modal
          isOpen={isOpen}
          toggle={handleToggleModal}
          closeModal={handleCloseModal}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          checkSubmit={checkSubmit}
          title={modalTitle}
        >
          {renderInputArr}
        </Modal>
      </Form>
    </Fragment>
  );
};

export default ModifyDeviceModal;
