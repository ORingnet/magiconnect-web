import React from 'react';
import { Marker } from 'react-mapbox-gl';
import { StyledMarkerCirCle } from './StyledShowMap';
const ClusterMarker = (coordinates, pointCount, getLeaves, handleClusterMarkClick) => {
  return (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      onClick={() => handleClusterMarkClick(coordinates, getLeaves)}
    >
      <StyledMarkerCirCle background='#f8371f'>{pointCount}</StyledMarkerCirCle>
    </Marker>
  );
};
export default ClusterMarker;
