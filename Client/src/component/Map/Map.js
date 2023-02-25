import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function Map({ setSelectedLocation }) {
    const [MarkerLocation, setMarkerLocation] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDKrNSQCNmWZ5ez5xxOVabDgObxK2yLCQo"
    })

    const [map, setMap] = React.useState(null)

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        console.log(location)
      }

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    
      
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(event) => handleLocationSelect({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              })}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {MarkerLocation && <Marker position={MarkerLocation} />}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)
