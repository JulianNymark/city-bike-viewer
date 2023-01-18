import React from 'react';

type Props = {
    bikesAvailable: number,
    docksAvailable: number,
    station_id: string,
}

export const CustomMarkerIcon = ({bikesAvailable, docksAvailable}: Props) => {
    return (
        <>
            <p>{bikesAvailable}</p>
            <p>{docksAvailable}</p>
        </>
    )
}

// the reason for this is that leaflet divIcon expects a string of rendered markup
export const HTMLStringCustomMarkerIcon = ({bikesAvailable, docksAvailable, station_id}: Props) => {
    return `
    <div class="circle-container" data-station-id="${station_id}">
        <div class="circle rotated">
            <div class="top-half"></div>
            <div class="bottom-half"></div>
        </div>
        <p class="bikes">${bikesAvailable}</p>
        <p class="docks">${docksAvailable}</p>
    </div>
    `
}
