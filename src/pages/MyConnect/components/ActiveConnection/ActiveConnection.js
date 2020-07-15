import React, { Fragment, useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import peopleIcon from 'assets/img/myConnect/icon-people.png';
import machIcon from 'assets/img/myConnect/icon-mach.png';
import FixedLoading from 'components/FixedLoading';
import plcIcon from 'assets/img/myConnect/icon-plc.png';
import ipcamIcon from 'assets/img/myConnect/icon-ipcam.png';
import hmiIcon from 'assets/img/myConnect/icon-hmi.png';
import DeleteDeviceModal from './DeleteDeviceModal';
import ModifyDeviceModal from './ModifyDeviceModal';
import { CustomInput } from 'reactstrap';
import {
  StyledTitle,
  StyledUserBox,
  StyledUser,
  StyledConnectContainer,
  StyledConnectInfoContainer,
  StyledConnectInfoTitle,
  StyledConnectDeviceInfo,
  StyledDeviceDetail,
  StyledDeviceContainer
} from './StyledActiveConnection';

const ActiveConnection = ({
  connectMachineIsLoading,
  connectMachineIsOpen,
  connectData,
  connectMachId,
  connectMachName,
  accountMsg,
  deleteDevice,
  addDevice,
  modifyDevice
}) => {
  const [deviceArr, setDeviceArr] = useState([]);
  useEffect(() => {
    if (connectData.device.length > 0) {
      setDeviceArr(connectData.device);
    } else {
      setDeviceArr([]);
    }
  }, [connectData.device]);
  const deviceChecked = useCallback(() => {
    return deviceArr.find(datum => datum.ischecked);
  }, [deviceArr]);
  const handleChoiceDevice = deviceId => {
    setDeviceArr(prevState =>
      prevState.map(datum => ({
        ...datum,
        ischecked: datum.devices_id === deviceId ? !datum.ischecked : false
      }))
    );
  };
  const renderTypeImg = type => {
    if (type === 'PLC') {
      return <img src={plcIcon} className='ml-3' alt='' />;
    } else if (type === 'IPCAM') {
      return <img src={ipcamIcon} className='ml-3' alt='' />;
    } else if (type === 'HMI') {
      return <img src={hmiIcon} className='ml-3' alt='' />;
    }
    return <span className='ml-3'>[{type}]</span>;
  };
  if (!connectMachineIsLoading) {
    if (connectMachineIsOpen) {
      const renderDevice = () => {
        if (connectData.device.length > 0) {
          return deviceArr.map(datum => (
            <StyledDeviceContainer key={datum.devices_id}>
              <CustomInput
                type='radio'
                name='deviceRadio'
                id={datum.devices_id}
                checked={datum.ischecked}
                onChange={() => handleChoiceDevice(datum.devices_id)}
                className='d-inline'
              />
              <li onClick={() => handleChoiceDevice(datum.devices_id)}>
                {renderTypeImg(datum.device_type)}
                <StyledDeviceDetail>
                  <span className='ml-3'>{datum.device_name}</span>
                  {datum.device_ip ? (
                    <a className='ml-3' href={`http://${datum.device_ip}`} target='_blink' rel='noopener noreferrer'>
                      {datum.device_ip}
                    </a>
                  ) : (
                    <Fragment />
                  )}
                  <span className='ml-3'>{datum.device_mask}</span>
                  <span className='ml-3'>{datum.device_proto}</span>
                  <span className='ml-3'>{datum.device_descr}</span>
                </StyledDeviceDetail>
              </li>
            </StyledDeviceContainer>
          ));
        }
      };
      return (
        <div className='position-relative'>
          <StyledTitle className='px-4'>Active connection</StyledTitle>
          <StyledConnectContainer>
            <StyledUserBox>
              <StyledUser>
                <img src={peopleIcon} alt='' />
                <span>{accountMsg.user_name}</span>
                <span>{`<${accountMsg.acc_mail}>`}</span>
              </StyledUser>
              <div className='d-flex mt-3 mt-sm-0'>
                <ModifyDeviceModal
                  machId={connectMachId}
                  addDevice={addDevice}
                  device={deviceChecked()}
                  modifyWay='add'
                />
                <ModifyDeviceModal
                  device={deviceChecked()}
                  machId={connectMachId}
                  modifyDevice={modifyDevice}
                  modifyWay='edit'
                />
                <DeleteDeviceModal device={deviceChecked()} machId={connectMachId} deleteDevice={deleteDevice} />
              </div>
            </StyledUserBox>
            <StyledConnectInfoContainer>
              <StyledConnectInfoTitle>
                <img src={machIcon} alt='' />
                <div>
                  <span>{connectMachName}</span>
                  <a href={`http://${connectData.machine.mach_wanip}`} target='_blink' rel='noopener noreferrer'>
                    {connectData.machine.mach_wanip}
                  </a>
                  <a href={`http://${connectData.machine.mach_lanip}`} target='_blink' rel='noopener noreferrer'>
                    {connectData.machine.mach_lanip}
                  </a>
                  <span>{connectData.machine.mach_descr}</span>
                </div>
              </StyledConnectInfoTitle>
              <StyledConnectDeviceInfo>{renderDevice()}</StyledConnectDeviceInfo>
            </StyledConnectInfoContainer>
          </StyledConnectContainer>
        </div>
      );
    }
    return <Fragment />;
  }
  return <FixedLoading />;
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ActiveConnection);
