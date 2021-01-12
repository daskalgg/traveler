import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import Entry from './Entry';
import Place from './Place';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  }


  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/daskalgg/ckjtwmgsp0cs019qn2rb8run7'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      width='100vw'
      height='100vh'
      pitch={45}
      doubleClickZoom={false}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <Place entry={entry} zoom={viewport.zoom}></Place>
        ))
      }
      {
        addEntryLocation ? <Entry zoom={viewport.zoom} location={addEntryLocation} close={setAddEntryLocation}></Entry> : null
      }
    </ReactMapGL >
  );
}

export default App;