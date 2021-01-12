
import React, { useState } from 'react';
import { Marker as Mark } from 'react-map-gl';

const Marker = ({ entry, zoom }) => {

    const [mouseHover, setMouseHover] = useState(false);
    return (
        <Mark
            latitude={entry.latitude}
            longitude={entry.longitude}>
            <svg className='marker'
                onMouseEnter={() => { setMouseHover(true) }}
                onMouseLeave={() => { setMouseHover(false) }}
                style={{
                    width: !mouseHover ? ` ${6 * zoom}px` : `130%`,
                    height: !mouseHover ? ` ${6 * zoom}px` : `130%`,
                }}
                version="1.1" viewBox="0 0 12.7 12.7" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <g transform="matrix(.25263 0 0 .25263 -3.0775 -5.2777)" fillRule="evenodd">
                        <path d="m50.271 34.396a13.229 13.229 0 0 1-13.173 13.229 13.229 13.229 0 0 1-13.285-13.116 13.229 13.229 0 0 1 13.059-13.341 13.229 13.229 0 0 1 13.397 13.002" />
                        <path d="m35.719 44.979h2.6458v25.135h-2.6458z" />
                        <path d="m38.365 70.115a1.3229 1.3229 0 0 1-1.3173 1.3229 1.3229 1.3229 0 0 1-1.3285-1.3116 1.3229 1.3229 0 0 1 1.3059-1.3341 1.3229 1.3229 0 0 1 1.3397 1.3002" />
                    </g>
                </g>
            </svg>
        </Mark>
    )
}

export default Marker;