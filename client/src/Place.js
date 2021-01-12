import React, { useState } from 'react';
import { Popup } from 'react-map-gl';

import Marker from './Marker';

const Place = ({ entry, zoom }) => {
    const [showPopup, setShowPopup] = useState({});
    return (
        <div key={entry._id}

            onClick={() => setShowPopup({
                showPopup,
                [entry._id]: true,
            })}>
            <Marker entry={entry} zoom={zoom}></Marker>
            {
                showPopup[entry._id] ? (
                    <Popup
                        latitude={entry.latitude}
                        longitude={entry.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setShowPopup({
                            showPopup,
                            [entry._id]: false,
                        })}
                        anchor="top">
                        <div>
                            <h3>{entry.title}</h3>
                            <p>{entry.comments}</p>
                            <small>Visited On: {new Date(entry.visitDate).toLocaleDateString()}</small>
                        </div>
                    </Popup>
                ) : null
            }
        </div >
    )
}

export default Place;