import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL from 'react-map-gl';

import { listLogEntries } from './API';
import Entry from './Entry';
import Place from './Place';

import logo from './resources/logo.png';
import orientation from './resources/orientation.png';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    bearing: 0,
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

  const rotate = (event) => {
    setViewport(event);
    setRotation(event.bearing);
  }


  return (
    <Fragment>
      <div className="overlay">
        <img className="logo" src={logo} alt='travelr.'></img>
        <div>
          <img className="nav"
            onMouseUp={() => {
              let e = viewport;
              e.bearing = 0;
              rotate(e);
            }}
            style={{
              // transform: `rotate(${rotation})deg`
              rotate: `${rotation}deg`
            }}
            src={orientation} alt='nav'></img>
        </div>
      </div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/daskalgg/ckjtwmgsp0cs019qn2rb8run7'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        width='100vw'
        height='100vh'
        pitch={45}
        doubleClickZoom={false}
        onViewportChange={rotate}
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
    </Fragment >
  );
}

export default App;