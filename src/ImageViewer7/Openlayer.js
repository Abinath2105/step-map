// import React, { useEffect, useRef, useState } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill } from "ol/style";

// const StepMap = ({ predefinedCoordinates = [] }) => {
//     const mapRef = useRef(null); // Store the map instance
//     const vectorSourceRef = useRef(new VectorSource()); // Store the vector source
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (mapRef.current) return; // Prevent multiple map instances

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             style: new Style({
//                 stroke: new Stroke({ color: "blue", width: 3 }),
//                 image: new CircleStyle({
//                     radius: 5,
//                     fill: new Fill({ color: "red" }),
//                 }),
//             }),
//         });

//         const olMap = new Map({
//             target: "map",
//             layers: [
//                 new TileLayer({ source: new OSM() }),
//                 vectorLayer,
//             ],
//             view: new View({
//                 center: fromLonLat([0, 0]),
//                 zoom: 2,
//             }),
//         });

//         olMap.on("click", (event) => {
//             const clickedCoordinate = olMap.getCoordinateFromPixel(event.pixel);
//             addPoint(clickedCoordinate);
//         });

//         mapRef.current = olMap; // Save the map instance
//     }, []);

//     const addPoint = (lonLat) => {
//         const newCoordinates = [...coordinates, lonLat];
//         setCoordinates(newCoordinates);
//         updateRoute(newCoordinates);
//     };

//     const updateRoute = (coords) => {
//         const vectorSource = vectorSourceRef.current;
//         vectorSource.clear();

//         // Add points to the map
//         coords.forEach(coord => {
//             const pointFeature = new Feature({ geometry: new Point(coord) });
//             vectorSource.addFeature(pointFeature);
//         });

//         // Add the path line
//         if (coords.length > 1) {
//             const lineFeature = new Feature({ geometry: new LineString(coords) });
//             vectorSource.addFeature(lineFeature);
//         }
//     };

//     useEffect(() => {
//         if (predefinedCoordinates.length > 0) {
//             const transformedCoords = predefinedCoordinates.map(coord => fromLonLat(coord));
//             setCoordinates(transformedCoords);
//             updateRoute(transformedCoords);
//         }
//     }, [predefinedCoordinates]);

//     return <div id="map" style={{ width: "100%", height: "1000px" }}></div>;
// };

// export default StepMap;


// import React, { useEffect, useRef, useState } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";

// const StepMap = ({ predefinedCoordinates = [] }) => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (mapRef.current) return; // Prevent multiple map instances

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999, // Ensure markers and labels appear on top
//             style: (feature) => {
//                 const geometry = feature.getGeometry();
//                 if (geometry instanceof Point) {
//                     return new Style({
//                         image: new CircleStyle({
//                             radius: 7,
//                             fill: new Fill({ color: "red" }),
//                             stroke: new Stroke({ color: "white", width: 2 }),
//                         }),
//                         text: new Text({
//                             text: feature.get("name") || "",
//                             offsetY: -15,
//                             font: "14px Arial",
//                             fill: new Fill({ color: "black" }),
//                             stroke: new Stroke({ color: "white", width: 3 }),
//                         }),
//                     });
//                 }
//                 return new Style({
//                     stroke: new Stroke({ color: "blue", width: 3 }),
//                 });
//             },
//         });

//         const olMap = new Map({
//             target: "map",
//             layers: [
//                 new TileLayer({ source: new OSM() }),
//                 vectorLayer,
//             ],
//             view: new View({
//                 center: fromLonLat([0, 0]),
//                 zoom: 2,
//             }),
//         });

//         // Handle map click event to add markers
//         olMap.on("click", (event) => {
//             const clickedCoordinate = event.coordinate; // Fix: Use event.coordinate directly
//             const placeName = prompt("Enter Place Name:", "New Location");
//             if (placeName) {
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, { coord: clickedCoordinate, name: placeName }];
//                     updateRoute(newCoords); // Ensure route updates with new coordinates
//                     return newCoords;
//                 });
//             }
//         });

//         mapRef.current = olMap;
//     }, []);

//     const updateRoute = (coords) => {
//         const vectorSource = vectorSourceRef.current;
//         vectorSource.clear();

//         coords.forEach(({ coord, name }) => {
//             console.log("Adding point:", coord, "Name:", name); // Debugging log
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSource.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map(item => item.coord)),
//             });
//             vectorSource.addFeature(lineFeature);
//         }
//     };

//     useEffect(() => {
//         if (predefinedCoordinates.length > 0) {
//             const transformedCoords = predefinedCoordinates.map(({ coord, name }) => ({
//                 coord: fromLonLat(coord),
//                 name,
//             }));
//             setCoordinates(transformedCoords);
//             updateRoute(transformedCoords);
//         }
//     }, [predefinedCoordinates]);

//     return <div id="map" style={{ width: "100%", height: "500px", position: "relative", zIndex: 1 }}></div>;
// };

// export default StepMap;




// import React, { useEffect, useRef, useState } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { DragBox, Select } from "ol/interaction";
// import { pointerMove } from "ol/events/condition";

// const StepMap = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [inputValue, setInputValue] = useState("");

//     useEffect(() => {
//         if (mapRef.current) return; // Prevent multiple instances

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//             style: (feature) => {
//                 const geometry = feature.getGeometry();
//                 if (geometry instanceof Point) {
//                     return new Style({
//                         image: new CircleStyle({
//                             radius: 7,
//                             fill: new Fill({ color: "red" }),
//                             stroke: new Stroke({ color: "white", width: 2 }),
//                         }),
//                         text: new Text({
//                             text: feature.get("name") || "",
//                             offsetY: -15,
//                             font: "14px Arial",
//                             fill: new Fill({ color: "black" }),
//                             stroke: new Stroke({ color: "white", width: 3 }),
//                         }),
//                     });
//                 }
//                 return new Style({
//                     stroke: new Stroke({ color: "blue", width: 3 }),
//                 });
//             },
//         });

//         const olMap = new Map({
//             target: "map",
//             layers: [
//                 new TileLayer({ source: new OSM() }),
//                 vectorLayer,
//             ],
//             view: new View({
//                 center: fromLonLat([0, 0]),
//                 zoom: 2,
//             }),
//         });

//         // Add click event to create points
//         olMap.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             const placeName = prompt("Enter Place Name:", "New Location");
//             if (placeName) {
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, { coord: clickedCoordinate, name: placeName }];
//                     updateRoute(newCoords);
//                     return newCoords;
//                 });
//             }
//         });

//         // Dragging interaction for moving points
//         const select = new Select({
//             condition: pointerMove, // Enable selection on hover
//         });

//         olMap.addInteraction(select);

//         select.on("select", (event) => {
//             const selectedFeature = event.selected[0];
//             if (selectedFeature) {
//                 olMap.on("pointermove", (evt) => {
//                     selectedFeature.getGeometry().setCoordinates(evt.coordinate);
//                     updateRoute(coordinates.map((item) =>
//                         item.coord === selectedFeature.getGeometry().getCoordinates()
//                             ? { ...item, coord: evt.coordinate }
//                             : item
//                     ));
//                 });
//             }
//         });

//         mapRef.current = olMap;
//     }, []);

//     const updateRoute = (coords) => {
//         const vectorSource = vectorSourceRef.current;
//         vectorSource.clear();

//         coords.forEach(({ coord, name }) => {
//             console.log("Adding point:", coord, "Name:", name);
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSource.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map(item => item.coord)),
//             });
//             vectorSource.addFeature(lineFeature);
//         }
//     };

//     // Function to handle input change and update the map
//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleAddCoordinate = () => {
//         const [lon, lat] = inputValue.split(",").map(Number);
//         if (!isNaN(lon) && !isNaN(lat)) {
//             const newCoord = fromLonLat([lon, lat]);
//             setCoordinates((prevCoords) => {
//                 const newCoords = [...prevCoords, { coord: newCoord, name: `Lat: ${lat}, Lon: ${lon}` }];
//                 updateRoute(newCoords);
//                 return newCoords;
//             });
//             setInputValue(""); // Clear input after adding
//         } else {
//             alert("Invalid coordinates. Please enter in format: longitude,latitude");
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 placeholder="Enter longitude,latitude"
//                 style={{ marginBottom: "10px", padding: "5px" }}
//             />
//             <button onClick={handleAddCoordinate} style={{ padding: "5px", marginLeft: "5px" }}>
//                 Add Point
//             </button>
//             <div id="map" style={{ width: "100%", height: "500px", position: "relative", zIndex: 1 }}></div>
//         </div>
//     );
// };

// export default StepMap;






// import React from "react";
// import MapContainer from "./MapContainer";
// import useMapLogic from "./useMapLogic";
// import CoordinateInputForm from "./CoordinateInputForm";

// const StepMap = () => {
//     const { setMap, addCoordinateByLatLon } = useMapLogic();  // ✅ Extract correctly

//     return (
//         <div>
//             <CoordinateInputForm addCoordinateByLatLon={addCoordinateByLatLon} />
//             <MapContainer onMapInit={setMap} />  {/* ✅ Ensure map is initialized */}
//         </div>
//     );
// };

// export default StepMap;



////////////////////////////////////////////////////////



// import React from "react";
// import MapContainer from "./MapContainer";
// import useMapLogic from "./useMapLogic";

// const StepMap = () => {
//     const { setMap, addCoordinateByLatLon, ModalComponent } = useMapLogic();  // ✅ Extract modal

//     return (
//         <div>
//             {ModalComponent}  
//             <MapContainer onMapInit={setMap} />
//         </div>
//     );
// };

// export default StepMap;







import React from "react";
import MapContainer from "./MapContainer";
import useMapLogic from "./useMapLogic";

const StepMap = () => {
    const { setMap, addCoordinateByLatLon, ModalComponent } = useMapLogic();  

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>  
            {/* Ensure Modal is Positioned Above */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: "999999999999999999" }}>
                {ModalComponent}
            </div>

            {/* Map Below */}
            <MapContainer onMapInit={setMap} />
        </div>
    );
};

export default StepMap;



