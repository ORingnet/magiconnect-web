import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from '../Modal';
import StyledInput from '../StyledInput';
import CopyModal from '../CopyModal';
import { selectObj } from './selectObj';
import { StyledShowMachineID } from './StyledModifyMachineModal';
import { Col, CustomInput, FormGroup, FormFeedback, Label, Form } from 'reactstrap';
const checkLength = string => string.length >= 110;
const checkMacAddressOnly = string => string !== '' && !/([A-Z0-9]{2}[:]){5}[A-Z0-9]{2}/g.test(string);
const chcekSerialNumber = string => string === '' || string.length !== 12;

const ModifyModal = ({
  isOpen,
  toogleModal,
  addMachine,
  modifyMachine,
  machineObj,
  intl,
  modifyWay,
  title,
  toggleCopyMachineIdModal,
  addNewMachineId,
  copyMachineIdModalIsOpen
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [MACAddress, setMACAddress] = useState('');
  const [connectMode, setConnectMode] = useState('');
  const [connectType, setConnectType] = useState('');
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [remark, setRemark] = useState('');
  useEffect(() => {
    if (isOpen && machineObj) {
      setLng(machineObj.mach_lng ? machineObj.mach_lng : '');
      setLat(machineObj.mach_lat ? machineObj.mach_lat : '');
      setSerialNumber(machineObj.mach_sn ? machineObj.mach_sn : '');
      setMachineName(machineObj.mach_name ? machineObj.mach_name : '');
      setConnectType(machineObj.mach_connect_type ? machineObj.mach_connect_type : '');
      setConnectMode(machineObj.mach_connect_mode ? machineObj.mach_connect_mode : '');
      setMACAddress(machineObj.mach_mac_address ? machineObj.mach_mac_address : '');
      setDescription(machineObj.mach_descr ? machineObj.mach_descr : '');
      setCountry(machineObj.mach_country ? machineObj.mach_country : '');
      setCity(machineObj.mach_city ? machineObj.mach_city : '');
      setRemark(machineObj.mach_remark ? machineObj.mach_remark : '');
    }
  }, [isOpen, machineObj]);
  const inputArr = [
    {
      name: 'machineName',
      value: machineName,
      setFunc: setMachineName,
      needVaild: true,
      vaildfunc: checkLength,
      placeholder: 'My connect'
    },
    {
      name: 'serialNumber',
      value: serialNumber,
      setFunc: setSerialNumber,
      needVaild: true,
      vaildfunc: chcekSerialNumber,
      placeholder: intl.formatMessage({ id: 'machineModal.serialNumber.invaild12Letter' })
    },
    {
      name: 'MACAddress',
      value: MACAddress,
      setFunc: setMACAddress,
      needVaild: true,
      vaildfunc: checkMacAddressOnly,
      placeholder: '00:99:0F:A9:AA:FF'
    },
    {
      name: 'connectMode',
      value: connectMode,
      setFunc: setConnectMode,
      type: 'select'
    },
    {
      name: 'connectType',
      value: connectType,
      setFunc: setConnectType,
      type: 'select'
    },
    {
      name: 'lng',
      value: lng,
      setFunc: setLng,
      type: 'number',
      min: -180,
      max: 180,
      placeholder: '-180~180'
    },
    {
      name: 'lat',
      value: lat,
      setFunc: setLat,
      type: 'number',
      min: -90,
      max: 90,
      placeholder: '-90~90'
    },
    {
      name: 'description',
      value: description,
      setFunc: setDescription,
      needVaild: true,
      vaildfunc: checkLength,
      placeholder: 'My connect describe'
    },
    {
      name: 'country',
      value: country,
      setFunc: setCountry,
      needVaild: true,
      vaildfunc: checkLength,
      placeholder: 'Taiwan'
    },
    {
      name: 'city',
      value: city,
      setFunc: setCity,
      needVaild: true,
      vaildfunc: checkLength,
      placeholder: 'Taipei'
    },
    {
      name: 'remark',
      value: remark,
      setFunc: setRemark,
      needVaild: true,
      vaildfunc: checkLength,
      placeholder: 'My connect remark'
    }
  ];
  const checkSubmit = () => {
    return (
      serialNumber === '' ||
      serialNumber.length !== 12 ||
      checkMacAddressOnly(MACAddress) ||
      machineName.length >= 110 ||
      description.length >= 110 ||
      country.length >= 110 ||
      city.length >= 110 ||
      remark.length >= 110
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const request = {
      mach_name: machineName,
      mach_mac_address: MACAddress,
      mach_connect_type: connectType,
      mach_connect_mode: connectMode,
      mach_lng: Number(lng),
      mach_lat: Number(lat),
      mach_descr: description,
      mach_country: country,
      mach_city: city,
      mach_sn: serialNumber,
      mach_remark: remark
    };
    if (modifyWay === 'add') {
      addMachine(request).then(result => {
        setIsLoading(false);
        if (result) {
          handleCloseModal();
          toggleCopyMachineIdModal();
        }
      });
    } else if (modifyWay === 'edit') {
      modifyMachine(machineObj.mach_id, request).then(result => {
        setIsLoading(false);
        if (result) {
          handleCloseModal();
        }
      });
    }
  };

  const handleCloseModal = () => {
    toogleModal();
    setLng(machineObj && machineObj.mach_lng ? machineObj.mach_lng : '');
    setLat(machineObj && machineObj.mach_lat ? machineObj.mach_lat : '');
    setSerialNumber(machineObj && machineObj.mach_sn ? machineObj.mach_sn : '');
    setMachineName(machineObj && machineObj.mach_name ? machineObj.mach_name : '');
    setConnectType(machineObj && machineObj.mach_connect_type ? machineObj.mach_connect_type : '');
    setConnectMode(machineObj && machineObj.mach_connect_mode ? machineObj.mach_connect_mode : '');
    setMACAddress(machineObj && machineObj.mach_mac_address ? machineObj.mach_mac_address : '');
    setDescription(machineObj && machineObj.mach_descr ? machineObj.mach_descr : '');
    setCountry(machineObj && machineObj.mach_country ? machineObj.mach_country : '');
    setCity(machineObj && machineObj.mach_city ? machineObj.mach_city : '');
    setRemark(machineObj && machineObj.mach_remark ? machineObj.mach_remark : '');
  };
  const handeNumberInputChange = (e, setFunc, min, max) => {
    const { value } = e.target;
    if (value < min) {
      setFunc(min);
    } else if (value > max) {
      setFunc(max);
    } else {
      setFunc(value);
    }
  };
  const handleEnAndNumOnlyChange = (e, setFunc) => {
    setFunc(e.target.value.replace(/[\W]/g, ''));
  };
  const handleMacAddressChange = e => {
    setMACAddress(e.target.value.replace(/[^A-Z0-9:]/g, ''));
  };
  const handeInputChange = (e, setFunc) => {
    setFunc(e.target.value);
  };
  const handleInvalid = inputItem => {
    return inputItem.needVaild ? inputItem.vaildfunc(inputItem.value) : false;
  };
  const renderInvalid = inputItem => {
    if (inputItem.needVaild) {
      const vaildArr = [];
      if (inputItem.name === 'serialNumber') {
        if (inputItem.value === '') {
          vaildArr.push(
            <FormFeedback invalid='true' key={`${inputItem.name}Space`}>
              <FormattedMessage id={`machineModal.${inputItem.name}.invaild`} />
            </FormFeedback>
          );
        }
        if (inputItem.value.length !== 12 && inputItem.value !== '') {
          vaildArr.push(
            <FormFeedback invalid='true' key={`${inputItem.name}12Letter`}>
              <FormattedMessage id={`machineModal.${inputItem.name}.invaild12Letter`} />
            </FormFeedback>
          );
        }
      } else if (inputItem.name === 'MACAddress') {
        if (inputItem.value !== '' && checkMacAddressOnly(inputItem.value)) {
          vaildArr.push(
            <FormFeedback invalid='true' key={`${inputItem.name}engAndNum`}>
              <FormattedMessage id={`machineModal.${inputItem.name}.invaild`} />
            </FormFeedback>
          );
        }
      } else {
        if (checkLength(inputItem.value)) {
          vaildArr.push(
            <FormFeedback invalid='true' key={`${inputItem.name}Space`}>
              <FormattedMessage id={`machineModal.${inputItem.name}.invaild`} />
            </FormFeedback>
          );
        }
      }

      return vaildArr;
    }
  };
  const renderMachineID = () => {
    if (machineObj) {
      return (
        <FormGroup key='machineShowID' className='mt-2' row>
          <Label sm={5} className='text-sm-right'>
            ConnectGateway ID
          </Label>
          <StyledShowMachineID span='7'>{`${machineObj.mach_id}:${machineObj.mach_secret}`}</StyledShowMachineID>
        </FormGroup>
      );
    }
  };
  const renderInputArr = inputArr.map(inputItem => {
    const renderInput = () => {
      if (inputItem.type === 'select') {
        return (
          <CustomInput
            key={inputItem.name}
            type='select'
            id={inputItem.name}
            value={inputItem.value}
            onChange={e => handeInputChange(e, inputItem.setFunc)}
          >
            <FormattedMessage id={`machineModal.${inputItem.name}.placeholder`}>
              {message => (
                <option value='' disabled hidden>
                  {message}
                </option>
              )}
            </FormattedMessage>
            {selectObj[inputItem.name].map(selectItem => (
              <option value={selectItem.value} key={selectItem.value} disabled={selectItem.disabled}>
                {selectItem.value}
              </option>
            ))}
          </CustomInput>
        );
      } else if (inputItem.name === 'serialNumber') {
        return (
          <StyledInput
            key={inputItem.name}
            bgsize='sm'
            value={inputItem.value}
            type='text'
            onChange={e => handleEnAndNumOnlyChange(e, inputItem.setFunc)}
            invalid={handleInvalid(inputItem)}
            placeholder={inputItem.placeholder}
          />
        );
      } else if (inputItem.name === 'MACAddress') {
        return (
          <StyledInput
            key={inputItem.name}
            bgsize='sm'
            value={inputItem.value}
            type='text'
            onChange={handleMacAddressChange}
            invalid={handleInvalid(inputItem)}
            placeholder={inputItem.placeholder}
          />
        );
      } else if (inputItem.type === 'number') {
        return (
          <StyledInput
            key={inputItem.name}
            bgsize='sm'
            value={inputItem.value}
            type='number'
            min={inputItem.min}
            max={inputItem.max}
            onChange={e => handeNumberInputChange(e, inputItem.setFunc, inputItem.min, inputItem.max)}
            invalid={handleInvalid(inputItem)}
            placeholder={inputItem.placeholder}
          />
        );
      }
      return (
        <StyledInput
          key={inputItem.name}
          bgsize='sm'
          value={inputItem.value}
          type='text'
          onChange={e => handeInputChange(e, inputItem.setFunc)}
          invalid={handleInvalid(inputItem)}
          placeholder={inputItem.placeholder}
        />
      );
    };
    return (
      <FormGroup key={inputItem.name} className='mt-2' row>
        <Label sm={5} className='text-sm-right'>
          <FormattedMessage id={`machineModal.${inputItem.name}`} />
        </Label>
        <Col sm={7}>
          {renderInput()}
          {renderInvalid(inputItem)}
        </Col>
      </FormGroup>
    );
  });

  return (
    <Form>
      <Modal
        isOpen={isOpen}
        toggle={toogleModal}
        closeModal={handleCloseModal}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        checkSubmit={checkSubmit}
        title={title}
      >
        {renderMachineID()}
        {renderInputArr}
      </Modal>
      <CopyModal toggle={toggleCopyMachineIdModal} isOpen={copyMachineIdModalIsOpen} copyTitle='Connect Gateway ID'>
        {addNewMachineId}
      </CopyModal>
    </Form>
  );
};

export default injectIntl(ModifyModal);
