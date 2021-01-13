import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL from 'react-map-gl';

import { listLogEntries } from './API';
import Entry from './Entry';
import Place from './Place';

import logo from './resources/logo.png';
import orientation from './resources/orientation.png';
import zoomImg from './resources/zoom.png';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);

  const czoom = 7;

  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(czoom);
  const [viewport, setViewport] = useState({
    latitude: 36.188567121562166,
    longitude: 25.075830462376633,
    bearing: 0,
    zoom: czoom
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
    setZoom(event.zoom);
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
          <img className="nav"
            onMouseUp={() => {
              console.log(`zoom pressed ${zoom}`);
              let e = viewport;
              e.zoom = czoom;
              rotate(e);
            }}
            src={zoomImg} alt='zoom'>
          </img>
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
            <Place key={entry._id} entry={entry} zoom={viewport.zoom}></Place>
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