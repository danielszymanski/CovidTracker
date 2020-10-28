import React from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import './Map.css'

export default function Map({ countries, center, zoom, flagSrc }) {
    return (
        <>
        <img className='countryFlag' src={flagSrc} alt=""/>
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http"//osm.org/copyright">
                OpenStreetMap</a> contributors'
                />
            </LeafletMap>
        </div>
        </>
    )
}
