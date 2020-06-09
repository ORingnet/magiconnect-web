import React, { Fragment, useState, useCallback } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactMapboxGl, { Marker, Cluster, Popup } from 'react-mapbox-gl';
import clusterMarker from './ClusterMarker';
import mapIcon from 'assets/img/header/icon_map.png';
import ConnectIcon from 'assets/img/myConnect/connect.svg';
import DisconnectIcon from 'assets/img/myConnect/disconnect.svg';
import markerIcon from 'assets/img/map/marker.svg';
import switchStatus from 'components/SwitchStatus';
import { streets } from './streets-style.json';
import { StyledUncontrolledTooltip } from '../StyledHeader';
import { Modal, Button } from 'reactstrap';
import { markerOffset, clusterOffset } from './markOffsets';
import {
  StyledImg,
  StyledModalBody,
  StyledMapNote,
  StyledModalHeader,
  StyledStatus,
  StyledMachName,
  StyledContentBox,
  StyledPopupCotent
} from './StyledShowMap';

const isNumber = val => typeof val === 'number';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_KEY });
const renderImg = mach_status => {
  const status = switchStatus(mach_status);
  return status.imgSrc ? <img src={status.imgSrc} alt='' className='mr-2' /> : status.img;
};
const center = [120.952987, 23.624366];
const zoom = [6];
const ShowMap = ({
  toggleMap,
  connectMachine,
  disconnectMachine,
  intl,
  machines,
  userStatus,
  accountMsg,
  connectMachId,
  showMapIsOpen
}) => {
  // const [zoom, setZoom] = useState([6]);
  const [popup, setPopup] = useState(null);
  // const [center, setCenter] = useState([120.952987, 23.624366]);
  const filterMachine = useCallback(
    () => machines.filter(machine => isNumber(machine.mach_lng) && isNumber(machine.mach_lat)),
    [machines]
  );
  const checkConnectSubmit = machineInfo => {
    if (userStatus === 'Off-Line' || machineInfo.mach_status === 'Off-Line' || machineInfo.mach_id === connectMachId) {
      return true;
    }
    if (accountMsg.acc_identity !== 'admin') {
      return machineInfo.mach_status === 'Connected' || machineInfo.mach_status === 'Connecting';
    }
    return false;
  };
  const checkDisconnectSubmit = machineInfo => {
    if (
      userStatus === 'Off-Line' ||
      machineInfo.mach_status !== 'Connected' ||
      machineInfo.mach_status !== 'Connecting'
    ) {
      return true;
    }
    if (accountMsg.acc_identity !== 'admin') {
      return machineInfo.mach_id !== connectMachId;
    }
    return false;
  };
  const handleMapMove = map => {
    setPopup(null);
  };
  const handleConnect = (machId, machName, machStatus, isConnected) => {
    toggleMap();
    if (isConnected) {
      disconnectMachine(machId);
    } else {
      connectMachine(machId, machName, machStatus);
    }
  };
  const handleClusterMarkClick = (coordinates, getLeaves) => {
    const leaves = getLeaves();
    const children = filterMachine().filter(machine => leaves.find(leaveItem => leaveItem.key === machine.mach_id));
    setPopup({
      coordinates,
      children
    });
  };
  const handleMarkClick = machine => {
    setPopup({
      coordinates: [machine.mach_lng, machine.mach_lat],
      children: [machine]
    });
  };
  const renderStatus = status => {
    if (status) {
      return (
        <StyledStatus color={switchStatus(status).color}>
          {renderImg(status)}
          {intl.formatMessage({ id: `connectTable.${status}` })}
        </StyledStatus>
      );
    }
  };
  const renderButton = machineInfo => {
    const isConnected = machineInfo.mach_status === 'Connected';
    const disabled = isConnected ? checkDisconnectSubmit(machineInfo) : checkConnectSubmit(machineInfo);
    const icon = isConnected ? DisconnectIcon : ConnectIcon;
    return (
      <Button
        onClick={() => handleConnect(machineInfo.mach_id, machineInfo.mach_name, machineInfo.mach_status, isConnected)}
        disabled={disabled}
        color='primary'
        size='sm'
      >
        <img src={icon} alt='' width='23' />
      </Button>
    );
  };
  const renderOffset = () => {
    if (popup && popup.children.length > 1) {
      return clusterOffset;
    }
    return markerOffset;
  };
  return (
    <Fragment>
      <StyledImg src={mapIcon} alt='map' onClick={toggleMap} id='mapIcon' />
      <StyledUncontrolledTooltip target='mapIcon'>Map</StyledUncontrolledTooltip>
      <Modal isOpen={showMapIsOpen} toggle={toggleMap} size='xl'>
        <StyledModalHeader toggle={toggleMap}>
          <FormattedMessage id='map' />
          <StyledMapNote>
            <FormattedMessage id='map.note' />
          </StyledMapNote>
        </StyledModalHeader>
        <StyledModalBody>
          <Map
            style={streets}
            containerStyle={{ height: '75vh' }}
            center={center}
            zoom={zoom}
            onMove={handleMapMove}
            onClick={handleMapMove}
          >
            <Cluster
              ClusterMarkerFactory={(coordinates, pointCount, getLeaves) =>
                clusterMarker(coordinates, pointCount, getLeaves, handleClusterMarkClick)
              }
              maxZoom={24}
            >
              {machines
                .filter(machine => machine.mach_lng && machine.mach_lat)
                .map(machine => (
                  <Marker
                    key={machine.mach_id}
                    coordinates={[machine.mach_lng, machine.mach_lat]}
                    data-feature={machine}
                  >
                    <img src={markerIcon} alt='' onClick={() => handleMarkClick(machine)} />
                  </Marker>
                ))}
            </Cluster>
            {popup && (
              <Popup offset={renderOffset()} coordinates={popup.coordinates}>
                <StyledPopupCotent>
                  {popup.children.map(machine => (
                    <div key={machine.mach_id} className='mb-2'>
                      <StyledMachName>{machine.mach_name}</StyledMachName>
                      <hr className='my-1' />
                      <StyledContentBox>
                        {renderButton(machine)}
                        {renderStatus(machine.mach_status)}
                      </StyledContentBox>
                    </div>
                  ))}
                </StyledPopupCotent>
              </Popup>
            )}
          </Map>
        </StyledModalBody>
      </Modal>
    </Fragment>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  ),
  injectIntl
)(ShowMap);
