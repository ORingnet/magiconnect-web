import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/appStore/action';
import peopleIcon from '../../../../assets/img/myConnect/icon-people.png';
import machIcon from '../../../../assets/img/myConnect/icon-mach.png';
import FixedLoading from '../../../../components/FixedLoading';
import plcIcon from '../../../../assets/img/myConnect/icon-plc.png';
import ipcamIcon from '../../../../assets/img/myConnect/icon-ipcam.png';
import hmiIcon from '../../../../assets/img/myConnect/icon-hmi.png';
import DeleteDeviceModal from './DeleteDeviceModal';
import ModifyDeviceModal from './ModifyDeviceModal';
import { Input } from 'reactstrap';
import {
  StyledTitle,
  StyledUserBox,
  StyledUser,
  StyledConnectContainer,
  StyledConnectInfoContainer,
  StyledConnectInfoTitle,
  StyledConnectDeviceInfo,
  StyledDeviceDetail
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
      setDeviceArr(
        connectData.device.map(datum => ({
          ...datum,
          ischecked: false
        }))
      );
    } else {
      setDeviceArr([]);
    }
  }, [connectData.device]);
  const handleChoiceDevice = deviceId => {
    setDeviceArr(
      deviceArr.map(datum => ({
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
        if (deviceArr.length > 0) {
          return deviceArr.map(datum => (
            <li onClick={e => handleChoiceDevice(datum.devices_id)} key={datum.devices_id}>
              <Input type='checkbox' checked={datum.ischecked} onChange={e => handleChoiceDevice(datum.devices_id)} />
              {renderTypeImg(datum.device_type)}
              <StyledDeviceDetail>
                <span className='ml-3'>{datum.device_name}</span>
                <span className='ml-3'>{datum.device_ip}</span>
                <span className='ml-3'>{datum.device_mask}</span>
                <span className='ml-3'>{datum.device_proto}</span>
                <span className='ml-3'>{datum.device_descr}</span>
              </StyledDeviceDetail>
            </li>
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
                  ischecked={deviceArr.find(datum => datum.ischecked)}
                  modifyWay='add'
                />
                <ModifyDeviceModal
                  device={deviceArr.find(datum => datum.ischecked)}
                  machId={connectMachId}
                  modifyDevice={modifyDevice}
                  modifyWay='edit'
                />
                <DeleteDeviceModal
                  device={deviceArr.find(datum => datum.ischecked)}
                  machId={connectMachId}
                  deleteDevice={deleteDevice}
                />
              </div>
            </StyledUserBox>
            <StyledConnectInfoContainer>
              <StyledConnectInfoTitle>
                <img src={machIcon} alt='' />
                <div>
                  <span>{connectMachName}</span>
                  <span>{connectData.machine.mach_wanip}</span>
                  <span>{connectData.machine.mach_lanip}</span>
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
