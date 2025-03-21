// import React, { useEffect, useRef } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import CoordinateInputForm from "./CoordinateInputForm";
// import useMapLogic from "./useMapLogic";
// const MapContainer = ({ onMapInit }) => {
//     const mapRef = useRef(null);
//     const {addCoordinateByLatLon } = useMapLogic();

//     useEffect(() => {
//         if (mapRef.current) return;

//         const olMap = new Map({
//             target: "map",
//             layers: [new TileLayer({ source: new OSM() })],
//             view: new View({
//                 center: [0, 0],
//                 zoom: 2,
//             }),
//         });

//         onMapInit(olMap);
//         mapRef.current = olMap;
//     }, [onMapInit]);

//     return <><div> 
//     <div id="map" style={{ width: "75%", height: "900px", position: "relative", zIndex: 9999 }} /></div></>;
// };

// export default MapContainer;








// import React, { useEffect, useRef } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import XYZ from "ol/source/XYZ";
// import CoordinateInputForm from "./CoordinateInputForm";
// import useMapLogic from "./useMapLogic";

// const MapContainer = ({ onMapInit }) => {
//     const mapRef = useRef(null);
//     const { addCoordinateByLatLon } = useMapLogic();

//     useEffect(() => {
//         if (mapRef.current) return;

//         // OpenStreetMap (Base Layer)
//         const osmLayer = new TileLayer({
//             source: new OSM(),
//             crossOrigin:"anonymous",
//         });

//         // OpenSeaMap (Nautical Charts)
//         const openSeaMapLayer = new TileLayer({
//             source: new XYZ({
//                 url: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png",
//                 crossOrigin: "anonymous",
//             }),
//         });

//         const olMap = new Map({
//             target: "map",
//             layers: [osmLayer, openSeaMapLayer], // Adding both layers
//             view: new View({
//                 center: [0, 0],
//                 zoom: 3,
//             }),
//         });

//         onMapInit(olMap);
//         mapRef.current = olMap;
//     }, [onMapInit]);

//     return (
//         <>
//             <div>
//                 <div id="map" style={{ width: "75%", height: "900px", position: "relative", zIndex: 9999 }} />
//             </div>
//         </>
//     );
// };

// export default MapContainer;



import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import CoordinateInputForm from "./CoordinateInputForm";
import useMapLogic from "./useMapLogic";

const MapContainer = ({ onMapInit }) => {
    const mapRef = useRef(null);
    const { addCoordinateByLatLon } = useMapLogic();

    useEffect(() => {
        if (mapRef.current) return;

        // OpenStreetMap (Base Layer)
        const osmLayer = new TileLayer({
            source: new OSM(),
        });

        // OpenSeaMap (Nautical Charts) - Ensure it's accessible
        const openSeaMapLayer = new TileLayer({
            source: new XYZ({
                url: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png",
                crossOrigin: "anonymous", // Allow cross-origin loading
            }),
            opacity: 0.7, // Adjust opacity so both layers are visible
        });

        const olMap = new Map({
            target: "map",
            layers: [osmLayer], // Start with only OSM
            view: new View({
                center: [0, 0],
                zoom: 3,
            }),
        });

        // Add OpenSeaMap layer separately to prevent conflicts
        setTimeout(() => {
            olMap.addLayer(openSeaMapLayer);
        }, 500); // Slight delay to ensure proper initialization

        onMapInit(olMap);
        mapRef.current = olMap;
    }, [onMapInit]);

    return (
        <div>
            <div id="map" style={{ width: "75%", height: "900px", position: "relative", zIndex: 9999 }} />
        </div>
    );
};

export default MapContainer;
