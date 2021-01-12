import React from 'react';
import { Popup } from 'react-map-gl';

import Marker from './Marker';


import LogEntryForm from './LogEntryForm';

const Entry = ({ zoom, location, close }) => {

    return (
        <>
            < Marker entry={location} zoom={zoom}>
                <div className='popup'>
                    <svg className='marker'
                        style={{
                            width: `${6 * zoom}px`,
                            height: `${6 * zoom}px`,
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                        </path>
                        <circle cx="12" cy="10" r="3">
                        </circle>
                    </svg>
                </div>
            </Marker>
            <Popup
                latitude={location.latitude}
                longitude={location.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => close(null)}
                anchor="top">
                <div className='popup'>
                    <LogEntryForm />
                </div>
            </Popup>
        </>
    );
}

export default Entry;