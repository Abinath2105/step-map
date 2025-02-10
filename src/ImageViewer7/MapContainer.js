import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import CoordinateInputForm from "./CoordinateInputForm";
import useMapLogic from "./useMapLogic";
const MapContainer = ({ onMapInit }) => {
    const mapRef = useRef(null);
    const {addCoordinateByLatLon } = useMapLogic();

    useEffect(() => {
        if (mapRef.current) return;

        const olMap = new Map({
            target: "map",
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        onMapInit(olMap);
        mapRef.current = olMap;
    }, [onMapInit]);

    return <><div> 
    <div id="map" style={{ width: "75%", height: "900px", position: "relative", zIndex: 9999 }} /></div></>;
};

export default MapContainer;
