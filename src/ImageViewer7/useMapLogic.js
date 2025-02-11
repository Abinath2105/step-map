// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Select } from "ol/interaction";
// import { pointerMove } from "ol/events/condition";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
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
//         const select = new Select({ condition: pointerMove });
//         mapRef.current.addInteraction(select);

//         select.on("select", (event) => {
//             const selectedFeature = event.selected[0];
//             if (selectedFeature) {
//                 mapRef.current.on("pointermove", (evt) => {
//                     selectedFeature.getGeometry().setCoordinates(evt.coordinate);
//                     updateRoute(
//                         coordinates.map((item) =>
//                             item.coord === selectedFeature.getGeometry().getCoordinates()
//                                 ? { ...item, coord: evt.coordinate }
//                                 : item
//                         )
//                     );
//                 });
//             }
//         });
//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map((item) => item.coord)),
//             });
//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` }];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;


// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
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

//         // Enable Modify Interaction to adjust points & lines
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         // Update the coordinates when points are dragged
//         modify.on("modifyend", () => {
//             const updatedCoords = vectorSourceRef.current
//                 .getFeatures()
//                 .filter((feature) => feature.getGeometry() instanceof Point)
//                 .map((feature) => ({
//                     coord: feature.getGeometry().getCoordinates(),
//                     name: feature.get("name"),
//                 }));

//             setCoordinates(updatedCoords);
//             updateRoute(updatedCoords);
//         });

//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map((item) => item.coord)),
//             });
//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` }];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;



// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
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

//         // Enable Modify Interaction to adjust points & lines
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         // Update the coordinates when points are dragged
//         modify.on("modifyend", () => {
//             const updatedCoords = vectorSourceRef.current
//                 .getFeatures()
//                 .filter((feature) => feature.getGeometry() instanceof Point)
//                 .map((feature) => ({
//                     coord: feature.getGeometry().getCoordinates(),
//                     name: feature.get("name"),
//                 }));

//             setCoordinates(updatedCoords);
//             updateRoute(updatedCoords);
//         });

//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map((item) => item.coord)),
//             });
//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` }];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;






















// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             const placeName = prompt("Enter Place Name:", "New Location");
//             if (placeName) {
//                 const newPoint = { coord: clickedCoordinate, name: placeName };
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, newPoint];
//                     updateRoute(newCoords);
//                     return newCoords;
//                 });
//             }
//         });

//         // Enable Modify Interaction to adjust points & lines
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         // Modify Event: Ensure the line updates after dragging points
//         modify.on("modifyend", () => {
//             const updatedCoords = vectorSourceRef.current
//                 .getFeatures()
//                 .filter((feature) => feature.getGeometry() instanceof Point)
//                 .map((feature) => ({
//                     coord: feature.getGeometry().getCoordinates(),
//                     name: feature.get("name"),
//                 }));

//             setCoordinates(updatedCoords); // Update the state
//             updateRoute(updatedCoords); // Ensure the line follows new points
//         });

//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         // Add points
//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         // Update line dynamically
//         if (coords.length > 1) {
//             const lineFeature = new Feature({
//                 geometry: new LineString(coords.map((item) => item.coord)), // New positions
//             });
//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         const newPoint = { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` };

//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, newPoint];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;












// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             const placeName = prompt("Enter Place Name:", "New Location");
//             if (placeName) {
//                 const newPoint = { coord: clickedCoordinate, name: placeName };
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, newPoint];
//                     updateRoute(newCoords);
//                     return newCoords;
//                 });
//             }
//         });

//         // Enable Modify Interaction for points & line
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             const updatedCoords = vectorSourceRef.current
//                 .getFeatures()
//                 .filter((feature) => feature.getGeometry() instanceof Point)
//                 .map((feature) => ({
//                     coord: feature.getGeometry().getCoordinates(),
//                     name: feature.get("name"),
//                 }));

//             setCoordinates(updatedCoords);
//             updateRoute(updatedCoords);
//         });

//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         // Add draggable points
//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         // **Make Line Editable & Flexible**
//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords.map((item) => item.coord));
//             const lineFeature = new Feature({ geometry: lineGeometry });

//             lineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3 }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         const newPoint = { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` };

//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, newPoint];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;



// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// // Helper function to create smooth curves
// const createSmoothCurve = (coords) => {
//     if (coords.length < 3) return new LineString(coords); // No curve if only 2 points

//     const interpolatedCoords = [];
//     for (let i = 0; i < coords.length - 1; i++) {
//         const p0 = coords[i - 1] || coords[i];
//         const p1 = coords[i];
//         const p2 = coords[i + 1];
//         const p3 = coords[i + 2] || coords[i + 1];

//         for (let t = 0; t < 1; t += 0.1) {
//             const x =
//                 0.5 *
//                 ((-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * (t ** 3) +
//                     (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * (t ** 2) +
//                     (-p0[0] + p2[0]) * t +
//                     2 * p1[0]);

//             const y =
//                 0.5 *
//                 ((-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * (t ** 3) +
//                     (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * (t ** 2) +
//                     (-p0[1] + p2[1]) * t +
//                     2 * p1[1]);

//             interpolatedCoords.push([x, y]);
//         }
//     }
//     return new LineString(interpolatedCoords);
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

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
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 });
//             },
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             const placeName = prompt("Enter Place Name:", "New Location");
//             if (placeName) {
//                 const newPoint = { coord: clickedCoordinate, name: placeName };
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, newPoint];
//                     updateRoute(newCoords);
//                     return newCoords;
//                 });
//             }
//         });

//         // Enable Modify Interaction for points & line
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             const updatedCoords = vectorSourceRef.current
//                 .getFeatures()
//                 .filter((feature) => feature.getGeometry() instanceof Point)
//                 .map((feature) => ({
//                     coord: feature.getGeometry().getCoordinates(),
//                     name: feature.get("name"),
//                 }));

//             setCoordinates(updatedCoords);
//             updateRoute(updatedCoords);
//         });

//     }, []);

//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         // Add draggable points
//         coords.forEach(({ coord, name }) => {
//             const pointFeature = new Feature({
//                 geometry: new Point(coord),
//                 name,
//             });
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         // **Draw Curved Line**
//         if (coords.length > 1) {
//             const curveGeometry = createSmoothCurve(coords.map((item) => item.coord));
//             const lineFeature = new Feature({ geometry: curveGeometry });

//             lineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(lineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         const newPoint = { coord: newCoord, name: `Lat: ${lonLat[1]}, Lon: ${lonLat[0]}` };

//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, newPoint];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         // Vector layer for storing lines
//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//             style: new Style({
//                 stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//             }),
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             setCoordinates((prevCoords) => {
//                 const newCoords = [...prevCoords, clickedCoordinate];
//                 updateRoute(newCoords);
//                 return newCoords;
//             });
//         });

//         // Enable Modify Interaction for LineString (not just points!)
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", (event) => {
//             if (!lineFeature) return;

//             const newCoords = lineFeature.getGeometry().getCoordinates();
//             setCoordinates(newCoords);
//         });

//     }, [lineFeature]);

//     // Function to update the editable line
//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);

//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, newCoord];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;


/////////////////////////////////////////////////////////////////////////////////////////////// 



// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         // Vector layer for storing points and lines
//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             setCoordinates((prevCoords) => {
//                 const newCoords = [...prevCoords, clickedCoordinate];
//                 updateRoute(newCoords);
//                 return newCoords;
//             });
//         });

//         // Enable Modify Interaction for LineString & Points
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", (event) => {
//             if (!lineFeature) return;
//             const newCoords = lineFeature.getGeometry().getCoordinates();
//             setCoordinates(newCoords);
//         });

//     }, [lineFeature]);

//     // Function to update the editable line and points
//     const updateRoute = (coords) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.setStyle(
//                 new Style({
//                     image: new CircleStyle({
//                         radius: 6,
//                         fill: new Fill({ color: "red" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                     }),
//                     text: new Text({
//                         text: `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -12,
//                     }),
//                 })
//             );
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, newCoord];
//             updateRoute(newCoords);
//             return newCoords;
//         });
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;

/// working fine 



// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]); // Store point names

//     useEffect(() => {
//         if (!mapRef.current) return;

//         // Vector layer for storing points and lines
//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points with names
//         mapRef.current.on("click", (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");

//             if (pointName) {
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, clickedCoordinate];
//                     setPointLabels((prevLabels) => [...prevLabels, pointName]);
//                     updateRoute(newCoords, [...pointLabels, pointName]);
//                     return newCoords;
//                 });
//             }
//         });

//         // Enable Modify Interaction for LineString & Points
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", (event) => {
//             if (!lineFeature) return;
//             const newCoords = lineFeature.getGeometry().getCoordinates();
//             setCoordinates(newCoords);
//         });

//     }, [lineFeature]);

//     // Function to update the editable line and points
//     const updateRoute = (coords, labels) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.setStyle(
//                 new Style({
//                     image: new CircleStyle({
//                         radius: 6,
//                         fill: new Fill({ color: "red" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`, // Use name or fallback to index
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -12,
//                     }),
//                 })
//             );
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         const pointName = window.prompt("Enter a name for this point:");

//         if (pointName) {
//             setCoordinates((prevCoords) => {
//                 const newCoords = [...prevCoords, newCoord];
//                 setPointLabels((prevLabels) => [...prevLabels, pointName]);
//                 updateRoute(newCoords, [...pointLabels, pointName]);
//                 return newCoords;
//             });
//         }
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;










// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         // Create vector layer for storing points and lines
//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points with names
//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");

//             if (pointName) {
//                 setCoordinates((prevCoords) => {
//                     const newCoords = [...prevCoords, clickedCoordinate];

//                     setPointLabels((prevLabels) => {
//                         const newLabels = [...prevLabels, pointName];
//                         updateRoute(newCoords, newLabels);
//                         return newLabels;
//                     });

//                     return newCoords;
//                 });
//             }
//         };

//         mapRef.current.on("click", handleClick);

//         // Enable Modify Interaction for LineString & Points
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             if (lineFeature) {
//                 const newCoords = lineFeature.getGeometry().getCoordinates();
//                 setCoordinates(newCoords);
//             }
//         });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     // Function to update the editable line and points
//     const updateRoute = (coords, labels) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.setStyle(
//                 new Style({
//                     image: new CircleStyle({
//                         radius: 6,
//                         fill: new Fill({ color: "red" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`, // Use name or fallback to index
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -12,
//                     }),
//                 })
//             );
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addCoordinate = (lonLat) => {
//         const newCoord = fromLonLat(lonLat);
//         const pointName = window.prompt("Enter a name for this point:");

//         if (pointName) {
//             setCoordinates((prevCoords) => {
//                 const newCoords = [...prevCoords, newCoord];

//                 setPointLabels((prevLabels) => {
//                     const newLabels = [...prevLabels, pointName];
//                     updateRoute(newCoords, newLabels);
//                     return newLabels;
//                 });

//                 return newCoords;
//             });
//         }
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinate };
// };

// export default useMapLogic;






// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         // Create vector layer for storing points and lines
//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Click event to add points with names
//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");

//             if (pointName) {
//                 addPoint(clickedCoordinate, pointName);
//             }
//         };

//         mapRef.current.on("click", handleClick);

//         // Enable Modify Interaction for LineString & Points
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             if (lineFeature) {
//                 const newCoords = lineFeature.getGeometry().getCoordinates();
//                 setCoordinates(newCoords);
//             }
//         });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     // Function to update the editable line and points
//     const updateRoute = (coords, labels) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.setStyle(
//                 new Style({
//                     image: new CircleStyle({
//                         radius: 6,
//                         fill: new Fill({ color: "red" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`, // Use name or fallback to index
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -12,
//                     }),
//                 })
//             );
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     // Function to add a coordinate when clicked or entered manually
//     const addPoint = (coord, name) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 updateRoute(newCoords, newLabels);
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     // Function to add a coordinate by latitude and longitude (manual entry)
//     const addCoordinateByLatLon = (lat, lon, name) => {
//         const newCoord = fromLonLat([lon, lat]); // Convert lat/lon to map projection
//         addPoint(newCoord, name);
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon };
// };

// export default useMapLogic;






// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Circle as CircleStyle, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]); // Store selected icons

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 9999,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");
//             if (pointName) {
//                 addPoint(clickedCoordinate, pointName, "Location");
//             }
//         };

//         mapRef.current.on("click", handleClick);

//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             if (lineFeature) {
//                 const newCoords = lineFeature.getGeometry().getCoordinates();
//                 setCoordinates(newCoords);
//             }
//         });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
            
//             let color = "red"; // Default color
//             if (icons[index] === "Ship") color = "blue";
//             if (icons[index] === "Flight") color = "purple";
//             if (icons[index] === "Train") color = "green";
//             if (icons[index] === "Car") color = "orange";

//             pointFeature.setStyle(
//                 new Style({
//                     image: new CircleStyle({
//                         radius: 6,
//                         fill: new Fill({ color }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -12,
//                     }),
//                 })
//             );
//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const addCoordinateByLatLon = (lat, lon, icon) => {
//         const newCoord = fromLonLat([lon, lat]);
//         addPoint(newCoord, `Point ${coordinates.length + 1}`, icon);
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon };
// };

// export default useMapLogic;









// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { renderToStaticMarkup } from "react-dom/server";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";

// // Material UI Icons mapped to names
// const iconComponents = {
//     Location: <Room fontSize="large" style={{ color: "red" }} />,
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconComponent) => {
//     const svgString = renderToStaticMarkup(iconComponent);
//     const encodedSvg = encodeURIComponent(svgString);
//     return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000, // Keep markers on top
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");
//             if (pointName) {
//                 addPoint(clickedCoordinate, pointName, "Location");
//             }
//         };

//         mapRef.current.on("click", handleClick);

//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             if (lineFeature) {
//                 const newCoords = lineFeature.getGeometry().getCoordinates();
//                 setCoordinates(newCoords);
//             }
//         });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));

//             // Get SVG Icon URL
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconComponents[iconKey]);

//             // Set Marker Style
//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: 0.7, // Adjust size
//                         anchor: [0.5, 1], // Positioning
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const addCoordinateByLatLon = (lat, lon, icon) => {
//         const newCoord = fromLonLat([lon, lat]);
//         addPoint(newCoord, `Point ${coordinates.length + 1}`, icon);
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon };
// };

// export default useMapLogic;






// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { renderToStaticMarkup } from "react-dom/server";
// import { DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";

// // Import custom location icon
// import locationIcon from "../img/location.svg"; // Replace with actual path

// // Material UI Icons mapped to names (excluding "Location" since we use a custom SVG)
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon; // Use the custom location.svg directly
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     const encodedSvg = encodeURIComponent(svgString);
//     return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000, // Keep markers on top
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");
//             if (pointName) {
//                 addPoint(clickedCoordinate, pointName, "Location");
//             }
//         };

//         mapRef.current.on("click", handleClick);

//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             if (lineFeature) {
//                 const newCoords = lineFeature.getGeometry().getCoordinates();
//                 setCoordinates(newCoords);
//             }
//         });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));

//             // Get the correct icon URL
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);

//             // Set marker style
//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: 0.7, // Adjust size
//                         anchor: [0.5, 1], // Positioning
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const addCoordinateByLatLon = (lat, lon, icon) => {
//         const newCoord = fromLonLat([lon, lat]);
//         addPoint(newCoord, `Point ${coordinates.length + 1}`, icon);
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon };
// };

// export default useMapLogic;

















// import { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { renderToStaticMarkup } from "react-dom/server";
// import { DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";

// // Import custom location icon
// import locationIcon from "../img/location.svg"; // Replace with actual path

// // Material UI Icons mapped to names (excluding "Location" since we use a custom SVG)
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon; // Use the custom location.svg directly
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     const encodedSvg = encodeURIComponent(svgString);
//     return `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [lineFeature, setLineFeature] = useState(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000, // Keep markers on top
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const clickedCoordinate = event.coordinate;
//             const pointName = window.prompt("Enter a name for this point:");
//             if (pointName) {
//                 addPoint(clickedCoordinate, pointName, "Location");
//             }
//         };

//         mapRef.current.on("click", handleClick);

        // const modify = new Modify({ source: vectorSourceRef.current });
        // mapRef.current.addInteraction(modify);

        // modify.on("modifyend", () => {
        //     if (lineFeature) {
        //         const newCoords = lineFeature.getGeometry().getCoordinates();
        //         setCoordinates(newCoords);
        //     }
        // });

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [lineFeature]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));

//             // Get the correct icon URL
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);

//             // Adjust size: Smaller scale for "Location" icon
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2; // Decrease size for Location icon

//             // Set marker style
//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: iconScale, // Set dynamic scale
//                         anchor: [0.5, 1], // Positioning
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             setLineFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const addCoordinateByLatLon = (lat, lon, icon) => {
//         const newCoord = fromLonLat([lon, lat]);
//         addPoint(newCoord, `Point ${coordinates.length + 1}`, icon);
//     };

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon };
// };

// export default useMapLogic;















// import React, { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, MenuItem, Box } from "@mui/material";
// import { DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import { renderToStaticMarkup } from "react-dom/server";
// import locationIcon from "../img/location.svg"; // Custom location icon

// // Icon mapping
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon;
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({
//         lat: "",
//         lon: "",
//         name: "",
//         icon: "Location",
//     });

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: "", icon: "Location" });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, []);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2;

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: iconScale,
//                         anchor: [0.5, 1],
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const handleFormSubmit = () => {
//         const newCoord = fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]);
//         addPoint(newCoord, formValues.name, formValues.icon);
//         setModalOpen(false);
//     };

//     const ModalComponent = (
//         <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional overlay effect
//                 }}
//             >
//                 <Box
//                     sx={{
//                         backgroundColor: "white",
//                         padding: "20px",
//                         borderRadius: "10px",
//                         boxShadow: "0px 4px 20px rgba(238, 12, 12, 0.3)",
//                         width: "400px",
//                         maxWidth: "90%",
//                         maxHeight: "80vh",
//                         overflowY: "auto",
//                         position:"absolute",
//                         top:"5px",
//                         right:"0px",

                       
//                     }}
//                     onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
//                 >
//                     <h3>Add a Point</h3>
//                     <TextField
//                         label="Latitude"
//                         variant="outlined"
//                         fullWidth
//                         margin="dense"
//                         value={formValues.lat}
//                         onChange={(e) => setFormValues({ ...formValues, lat: e.target.value })}
//                     />
//                     <TextField
//                         label="Longitude"
//                         variant="outlined"
//                         fullWidth
//                         margin="dense"
//                         value={formValues.lon}
//                         onChange={(e) => setFormValues({ ...formValues, lon: e.target.value })}
//                     />
//                     <TextField
//                         label="Name"
//                         variant="outlined"
//                         fullWidth
//                         margin="dense"
//                         value={formValues.name}
//                         onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
//                     />
//                     <TextField
//                         select
//                         label="Select Icon"
//                         fullWidth
//                         margin="dense"
//                         value={formValues.icon}
//                         onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}
//                     >
//                         {Object.keys(iconComponents).map((key) => (
//                             <MenuItem key={key} value={key}>
//                                 {key}
//                             </MenuItem>
//                         ))}
//                     </TextField>
//                     <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit} sx={{ mt: 2 }}>
//                         Add Point
//                     </Button>
//                     <Button  zIndex="999999999" variant="outlined" fullWidth onClick={() => setModalOpen(false)} sx={{ mt: 1 }}>
//                         Cancel
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon: addPoint, ModalComponent };
// };

// export default useMapLogic;






////////////////////////////////////////////////




// import React, { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, MenuItem, Box, List, ListItem, ListItemText } from "@mui/material";
// import { DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import { renderToStaticMarkup } from "react-dom/server";
// import locationIcon from "../img/location.svg"; // Custom location icon

// // Icon mapping
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") return locationIcon;
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: "Location", search: "" });
//     const [searchResults, setSearchResults] = useState([]); // Stores search results

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({ source: vectorSourceRef.current, zIndex: 1000 });
//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: "", icon: "Location", search: "" });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, []);

//     // Fetch location suggestions from OpenStreetMap Nominatim API
//     const handleSearchChange = async (event) => {
//         const query = event.target.value;
//         setFormValues((prev) => ({ ...prev, search: query }));

//         if (query.length < 3) {
//             setSearchResults([]);
//             return;
//         }

//         try {
//             const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//             const data = await response.json();
//             setSearchResults(data.map((place) => ({
//                 name: place.display_name,
//                 lat: place.lat,
//                 lon: place.lon,
//             })));
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     // Update the form fields when a user selects a place from search results
//     const handlePlaceSelect = (place) => {
//         setFormValues((prev) => ({
//             ...prev,
//             lat: place.lat,
//             lon: place.lon,
//             name: place.name,
//             search: place.name,
//         }));
//         setSearchResults([]);
//     };

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2;

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: iconScale,
//                         anchor: [0.5, 1],
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     const handleFormSubmit = () => {
//         const newCoord = fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]);
//         addPoint(newCoord, formValues.name, formValues.icon);
//         setModalOpen(false);
//     };

//     const ModalComponent = (
//         <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
            
//                     backgroundColor: "rgba(0, 0, 0, 0.3)",
//                     position:"absolute",
//                     top:"5px",
//                     right:"0px",
//                 }}
//             >
//                 <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                     <h3>Add a Point</h3>
//                     <TextField
//                         label="Search Place"
//                         fullWidth
//                         value={formValues.search}
//                         onChange={handleSearchChange}
//                         margin="dense"
//                     />
//                     {searchResults.length > 0 && (
//                         <List sx={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc" }}>
//                             {searchResults.map((place, index) => (
//                                 <ListItem button key={index} onClick={() => handlePlaceSelect(place)}>
//                                     <ListItemText primary={place.name} />
//                                 </ListItem>
//                             ))}
//                         </List>
//                     )}
//                     <TextField label="Name" fullWidth value={formValues.name} margin="dense" />
//                     <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit} sx={{ mt: 2 }}>
//                         Add Point
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon: addPoint, ModalComponent };
// };

// export default useMapLogic;







// import React, { useEffect, useRef, useState } from "react";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, MenuItem, Box, Autocomplete } from "@mui/material";
// import { DirectionsBoat, Flight, Train, DirectionsCar, LocationOn } from "@mui/icons-material";
// import { renderToStaticMarkup } from "react-dom/server";
// import locationIcon from "../img/location.svg"; // Custom location icon
// import { Modify } from "ol/interaction";

// // Icon mapping
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
//     Location: <LocationOn fontSize="large" style={{ color: "red" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon;
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({
//         lat: "",
//         lon: "",
//         name: "",
//         icon: "Location",
//         search: "",
//     });

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues((prev) => ({
//                 ...prev,
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: "",
//                 icon: "Location",
//             }));
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, []);

//     const fetchPlaces = async (query) => {
//         if (!query) return;
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
//             );
//             const data = await response.json();
//             setSearchResults(data.map((place) => ({
//                 label: place.display_name,
//                 lat: place.lat,
//                 lon: place.lon,
//             })));
//         } catch (error) {
//             console.error("Error fetching places:", error);
//         }
//     };

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2;

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: iconScale,
//                         anchor: [0.5, 1],
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };


//     modify.on("modifyend", () => {
//         const updatedCoords = [];
//         const updatedLabels = [];
//         const updatedIcons = [];
    
//         vectorSourceRef.current.getFeatures().forEach((feature) => {
//             if (feature.getGeometry() instanceof Point) {
//                 const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
//                 updatedCoords.push(fromLonLat([lon, lat]));
//                 updatedLabels.push(feature.get("name") || "");
//                 updatedIcons.push(feature.get("icon") || "Location");
//             }
//         });
    
//         setCoordinates(updatedCoords);
//         setPointLabels(updatedLabels);
//         setPointIcons(updatedIcons);
    
//         updateRoute(updatedCoords, updatedLabels, updatedIcons);
//     });
    
//     const handleFormSubmit = () => {
//         const newCoord = fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]);
//         addPoint(newCoord, formValues.name, formValues.icon);
//         setModalOpen(false);
//     };

//     const handlePlaceSelect = (event, value) => {
//         if (!value) return;
//         setFormValues((prev) => ({
//             ...prev,
//             lat: value.lat,
//             lon: value.lon,
//             search: value.label,
//         }));
//     };

//     const ModalComponent = (
//         <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     backgroundColor: "rgba(0, 0, 0, 0.3)",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         backgroundColor: "white",
//                         padding: "20px",
//                         borderRadius: "10px",
//                         width: "400px",
//                         position: "absolute",
//                         top: "5px",
//                         right: "0px",
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     <h3>Add a Point</h3>

//                     <Autocomplete
//                         freeSolo
//                         options={searchResults}
//                         getOptionLabel={(option) => option.label}
//                         onInputChange={(event, newValue) => fetchPlaces(newValue)}
//                         onChange={handlePlaceSelect}
//                         renderInput={(params) => (
//                             <TextField {...params} label="Search Place" fullWidth margin="dense" />
//                         )}
//                     />

//                     <TextField label="Latitude" fullWidth margin="dense" value={formValues.lat} />
//                     <TextField label="Longitude" fullWidth margin="dense" value={formValues.lon} />

//                     <TextField
//                         select
//                         label="Select Icon"
//                         fullWidth
//                         margin="dense"
//                         value={formValues.icon}
//                         onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}
//                     >
//                         {Object.keys(iconComponents).map((key) => (
//                             <MenuItem key={key} value={key}>
//                                 {key}
//                             </MenuItem>
//                         ))}
//                     </TextField>

//                     <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
//                         Add Point
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );

//     return { setMap: (map) => (mapRef.current = map), addCoordinateByLatLon: addPoint, ModalComponent };
// };

// export default useMapLogic;




// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, MenuItem, Box, Autocomplete } from "@mui/material";
// import { DirectionsBoat, Flight, Train, DirectionsCar, LocationOn } from "@mui/icons-material";
// import { renderToStaticMarkup } from "react-dom/server";
// import { Modify } from "ol/interaction";
// import locationIcon from "../img/location.svg"; // Custom location icon

// // Icon mapping
// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
//     Location: <LocationOn fontSize="large" style={{ color: "red" }} />,
// };

// // Convert MUI icons to SVG data URLs
// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon;
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({
//         lat: "",
//         lon: "",
//         name: "",
//         icon: "Location",
//         search: "",
//     });

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues((prev) => ({
//                 ...prev,
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: "",
//                 icon: "Location",
//             }));
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, []);

//     const fetchPlaces = async (query) => {
//         if (!query) return;
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
//             );
//             const data = await response.json();
//             setSearchResults(data.map((place) => ({
//                 label: place.display_name,
//                 lat: place.lat,
//                 lon: place.lon,
//             })));
//         } catch (error) {
//             console.error("Error fetching places:", error);
//         }
//     };

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2;

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: iconUrl,
//                         scale: iconScale,
//                         anchor: [0.5, 1],
//                     }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature({ geometry: lineGeometry });

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setPointIcons((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });

//             return newCoords;
//         });
//     };

//     // Enable modifying the marked coordinate line with a curved style
//     useEffect(() => {
//         if (!mapRef.current) return;

//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);

//         modify.on("modifyend", () => {
//             const updatedCoords = [];
//             const updatedLabels = [];
//             const updatedIcons = [];

//             vectorSourceRef.current.getFeatures().forEach((feature) => {
//                 if (feature.getGeometry() instanceof Point) {
//                     const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
//                     updatedCoords.push(fromLonLat([lon, lat]));
//                     updatedLabels.push(feature.get("name") || "");
//                     updatedIcons.push(feature.get("icon") || "Location");
//                 }
//             });

//             setCoordinates(updatedCoords);
//             setPointLabels(updatedLabels);
//             setPointIcons(updatedIcons);

//             updateRoute(updatedCoords, updatedLabels, updatedIcons);
//         });
//     }, []);

//     const handleFormSubmit = () => {
//         const newCoord = fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]);
//         addPoint(newCoord, formValues.name, formValues.icon);
//         setModalOpen(false);
//     };

//     const handlePlaceSelect = (event, value) => {
//         if (!value) return;
//         setFormValues((prev) => ({
//             ...prev,
//             lat: value.lat,
//             lon: value.lon,
//             search: value.label,
//         }));
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: addPoint,
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         position: "absolute",
//                      top:"5px",
//                      right:"0px",
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                     }}
//                 >
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <TextField label="Latitude" fullWidth value={formValues.lat} />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} />
//                         <Button variant="contained" onClick={handleFormSubmit}>Add Point</Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;


/////without serach //////////////////




// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, MenuItem, Box, Autocomplete } from "@mui/material";
// import { DirectionsBoat, Flight, Train, DirectionsCar, LocationOn } from "@mui/icons-material";
// import { renderToStaticMarkup } from "react-dom/server";
// import { Modify } from "ol/interaction";
// import locationIcon from "../img/location.svg";

// const iconComponents = {
//     Ship: <DirectionsBoat fontSize="large" style={{ color: "blue" }} />,
//     Flight: <Flight fontSize="large" style={{ color: "green" }} />,
//     Train: <Train fontSize="large" style={{ color: "purple" }} />,
//     Car: <DirectionsCar fontSize="large" style={{ color: "orange" }} />,
//     Location: <LocationOn fontSize="large" style={{ color: "red" }} />,
// };

// const getSvgIconUrl = (iconKey) => {
//     if (iconKey === "Location") {
//         return locationIcon;
//     }
//     const svgString = renderToStaticMarkup(iconComponents[iconKey]);
//     return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [pointIcons, setPointIcons] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: "Location", search: "" });

//     useEffect(() => {
//         if (!mapRef.current) return;
//         const vectorLayer = new VectorLayer({ source: vectorSourceRef.current, zIndex: 1000 });
//         mapRef.current.addLayer(vectorLayer);
        
//         mapRef.current.on("click", (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: "", icon: "Location" });
//             setModalOpen(true);
//         });
//     }, []);

//     const fetchPlaces = async (query) => {
//         if (!query) return;
//         try {
//             const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//             const data = await response.json();
//             setSearchResults(data.map(place => ({ label: place.display_name, lat: place.lat, lon: place.lon })));
//         } catch (error) {
//             console.error("Error fetching places:", error);
//         }
//     };

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();
//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             const iconKey = icons[index] || "Location";
//             const iconUrl = getSvgIconUrl(iconKey);
//             const iconScale = iconKey === "Location" ? 0.05 : 0.2;
//             pointFeature.setStyle(new Style({
//                 image: new Icon({ src: iconUrl, scale: iconScale, anchor: [0.5, 1] }),
//                 text: new Text({
//                     text: labels[index] || `${index + 1}`,
//                     font: "bold 12px Arial",
//                     fill: new Fill({ color: "white" }),
//                     stroke: new Stroke({ color: "black", width: 2 }),
//                     offsetY: -20,
//                 }),
//             }));
//             vectorSourceRef.current.addFeature(pointFeature);
//         });
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prev) => {
//             const newCoords = [...prev, coord];
//             setPointLabels((labels) => [...labels, name]);
//             setPointIcons((icons) => [...icons, icon]);
//             updateRoute(newCoords, [...pointLabels, name], [...pointIcons, icon]);
//             return newCoords;
//         });
//     };

//     useEffect(() => {
//         if (!mapRef.current) return;
//         const modify = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modify);
//         modify.on("modifyend", () => {
//             setCoordinates(vectorSourceRef.current.getFeatures().map(feature => fromLonLat(toLonLat(feature.getGeometry().getCoordinates()))));
//         });
//     }, []);

//     const handleFormSubmit = () => {
//         addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon);
//         setModalOpen(false);
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: addPoint,
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: "5px", right: "0px", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete options={searchResults} onInputChange={(e, value) => fetchPlaces(value)} onChange={(e, value) => setFormValues(prev => ({ ...prev, lat: value.lat, lon: value.lon }))} renderInput={(params) => <TextField {...params} label="Search Location" fullWidth />} />
//                         <TextField label="Latitude" fullWidth value={formValues.lat} />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} />
//                         <TextField select label="Icon" fullWidth value={formValues.icon} onChange={(e) => setFormValues(prev => ({ ...prev, icon: e.target.value }))}>
//                             {Object.keys(iconComponents).map(icon => (<MenuItem key={icon} value={icon}>{iconComponents[icon]}</MenuItem>))}
//                         </TextField>
//                         <Button variant="contained" onClick={handleFormSubmit}>Add Point</Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;


//// no line string marking ////// 

// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { Modal, Button, TextField, Box } from "@mui/material";
// import locationIcon from "../img/location.svg"; // Custom location icon

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "" });

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: `Point ${coordinates.length + 1}` });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const updateRoute = (coords, labels) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: locationIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];

//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 updateRoute(newCoords, newLabels);
//                 return newLabels;
//             });

//             return newCoords;
//         });

//         setModalOpen(false);
//     };

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const modify = new Modify({ source: vectorSourceRef.current });

//         modify.on("modifyend", () => {
//             const updatedCoords = [];
//             const updatedLabels = [];

//             vectorSourceRef.current.getFeatures().forEach((feature) => {
//                 if (feature.getGeometry() instanceof Point) {
//                     updatedCoords.push(feature.getGeometry().getCoordinates());
//                     updatedLabels.push(feature.get("index") ? `Point ${feature.get("index") + 1}` : "");
//                 }
//             });

//             updatedCoords.sort((a, b) => a[0] - b[0]);
//             setCoordinates(updatedCoords);
//             setPointLabels(updatedLabels);
//             updateRoute(updatedCoords, updatedLabels);
//         });

//         mapRef.current.addInteraction(modify);
//     }, []);

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: addPoint,
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         position: "absolute",
//                         top: "5px",
//                         right: "0px",
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                     }}
//                 >
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <TextField
//                             label="Latitude"
//                             fullWidth
//                             value={formValues.lat}
//                             onChange={(e) => setFormValues((prev) => ({ ...prev, lat: e.target.value }))}
//                         />
//                         <TextField
//                             label="Longitude"
//                             fullWidth
//                             value={formValues.lon}
//                             onChange={(e) => setFormValues((prev) => ({ ...prev, lon: e.target.value }))}
//                         />
//                         <TextField
//                             label="Name"
//                             fullWidth
//                             value={formValues.name}
//                             onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
//                         />
//                         <Button variant="contained" onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name)}>
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;


















// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { Modal, Button, TextField, Box, Autocomplete } from "@mui/material";
// import locationIcon from "../img/location.svg"; // Custom location icon

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "" });
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: `Point ${coordinates.length + 1}` });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const updateRoute = (coords, labels) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: locationIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 updateRoute(newCoords, newLabels);
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(data.map((place) => ({
//             label: place.display_name,
//             lat: parseFloat(place.lat),
//             lon: parseFloat(place.lon),
//         })));
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: addPoint,
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         position: "absolute",
//                         top: "5px",
//                         right: "0px",
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                     }}
//                 >
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                         />
//                         <TextField label="Latitude" fullWidth value={formValues.lat} disabled />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} disabled />
//                         <TextField label="Name" fullWidth value={formValues.name} onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} />
//                         <Button variant="contained" onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name)}>
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;

////adding markers /////////////////  


// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Default", value: defaultIcon },
//     { label: "Custom Icon 1", value: customIcon1 },
//     { label: "Custom Icon 2", value: customIcon2 },
// ];

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: `Point ${coordinates.length + 1}`, icon: defaultIcon });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: icons[index] || defaultIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: (latLon, name, icon) => addPoint(latLon, name, icon),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         position: "absolute",
//                         top: "5px",
//                         right: "0px",
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                     }}
//                 >
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                         icon: defaultIcon,
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                         />
//                         <TextField label="Latitude" fullWidth value={formValues.lat} disabled />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} disabled />
//                         <TextField label="Name" fullWidth value={formValues.name} onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} />
//                         <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}>
//                             {iconOptions.map((icon) => (
//                                 <MenuItem key={icon.value} value={icon.value}>{icon.label}</MenuItem>
//                             ))}
//                         </Select>
//                         <Button variant="contained" onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon)}>
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;


///////////icon bug  ///////////////////



// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Default", value: defaultIcon },
//     { label: "Custom Icon 1", value: customIcon1 },
//     { label: "Custom Icon 2", value: customIcon2 },
// ];

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({ lat: lat.toFixed(6), lon: lon.toFixed(6), name: `Point ${coordinates.length + 1}`, icon: defaultIcon });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: icons[index] || defaultIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, icon];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: (latLon, name, icon) => addPoint(latLon, name, icon),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     position: "absolute",
//                     top: "5px",
//                     right: "0px",
//                     backgroundColor: "rgba(0, 0, 0, 0.3)",
//                 }}>
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                         icon: defaultIcon,
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />} />
//                         <TextField label="Latitude" fullWidth value={formValues.lat} disabled />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} disabled />
//                         <TextField label="Name" fullWidth value={formValues.name} onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} />
//                         <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues((prev) => ({ ...prev, icon: e.target.value }))}>
//                             {iconOptions.map((icon) => (
//                                 <MenuItem key={icon.value} value={icon.value}>{icon.label}</MenuItem>
//                             ))}
//                         </Select>
//                         <Button variant="contained" onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon)}>
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;
















// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Location", value: defaultIcon },
//     { label: "Ship", value: customIcon1 },
//     { label: "Flight", value: customIcon2 },
// ];

// const getDefaultIcon = (name) => {
//     if (name.toLowerCase().includes("ship")) return customIcon1;
//     if (name.toLowerCase().includes("flight")) return customIcon2;
//     return defaultIcon;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: `Point ${coordinates.length + 1}`,
//                 icon: formValues.icon || defaultIcon, // Preserve last selected icon
//             });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             const assignedIcon = icons[index] || getDefaultIcon(labels[index]); // Ensure correct icon persists

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: assignedIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const lineGeometry = new LineString(coords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, icon || getDefaultIcon(name)];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: (latLon, name, icon) => addPoint(latLon, name, icon),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     position: "absolute",
//                     top: "5px",
//                     right: "0px",
//                     backgroundColor: "rgba(0, 0, 0, 0.3)",
//                 }}>
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                         icon: getDefaultIcon(newValue.label),
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />} />
//                         <TextField label="Latitude" fullWidth value={formValues.lat} disabled />
//                         <TextField label="Longitude" fullWidth value={formValues.lon} disabled />
//                         <TextField 
//                             label="Name" 
//                             fullWidth 
//                             value={formValues.name} 
//                             onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))} 
//                         />
//                         <Select 
//                             fullWidth 
//                             value={formValues.icon} 
//                             onChange={(e) => setFormValues((prev) => ({ ...prev, icon: e.target.value }))}
//                         >
//                             {iconOptions.map((icon) => (
//                                 <MenuItem key={icon.value} value={icon.value}>{icon.label}</MenuItem>
//                             ))}
//                         </Select>
//                         <Button 
//                             variant="contained" 
//                             onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon)}
//                         >
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;








// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { Modify } from "ol/interaction";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Location", value: defaultIcon },
//     { label: "Ship", value: customIcon1 },
//     { label: "Flight", value: customIcon2 },
// ];

// const getDefaultIcon = (name) => {
//     if (name.toLowerCase().includes("ship")) return customIcon1;
//     if (name.toLowerCase().includes("flight")) return customIcon2;
//     return defaultIcon;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: `Point ${coordinates.length + 1}`,
//                 icon: formValues.icon || defaultIcon,
//             });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     const smoothCurve = (coords) => {
//         if (coords.length < 3) return coords; // No curve if only two points
//         let smoothed = [];
//         for (let i = 0; i < coords.length - 1; i++) {
//             let p1 = coords[i];
//             let p2 = coords[i + 1];

//             let control1 = [(p1[0] + p2[0]) / 2, p1[1]];
//             let control2 = [(p1[0] + p2[0]) / 2, p2[1]];

//             smoothed.push(p1, control1, control2, p2);
//         }
//         return smoothed;
//     };

//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             const assignedIcon = icons[index] || getDefaultIcon(labels[index]);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: assignedIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             const curvedCoords = smoothCurve(coords);
//             const lineGeometry = new LineString(curvedCoords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const enableLineModification = () => {
//         if (!mapRef.current) return;
//         const modify = new Modify({ source: vectorSourceRef.current });
//         modify.on("modifyend", () => {
//             const updatedCoords = lineFeatureRef.current.getGeometry().getCoordinates();
//             updateRoute(updatedCoords, pointLabels, iconSelections);
//         });
//         mapRef.current.addInteraction(modify);
//     };

//     useEffect(() => {
//         enableLineModification();
//     }, []);

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, icon || getDefaultIcon(name)];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: (latLon, name, icon) => addPoint(latLon, name, icon),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     position: "absolute",
//                     top: "5px",
//                     right: "0px",
//                     backgroundColor: "rgba(0, 0, 0, 0.3)",
//                 }}>
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                         icon: getDefaultIcon(newValue.label),
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                         />
//                         <Button variant="contained"
//                             onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon)}>
//                             Add Point
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;




////addding without mark   

// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { getDistance } from "ol/sphere";
// import Modify from "ol/interaction/Modify";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Location", value: defaultIcon },
//     { label: "Ship", value: customIcon1 },
//     { label: "Flight", value: customIcon2 },
// ];

// const getDefaultIcon = (name) => {
//     if (name.toLowerCase().includes("ship")) return customIcon1;
//     if (name.toLowerCase().includes("flight")) return customIcon2;
//     return defaultIcon;
// };

// /**
//  * Generates a smooth curved path using geodesic interpolation
//  */
// const interpolateGeodesic = (start, end, segments = 50) => {
//     const coords = [];
//     for (let i = 0; i <= segments; i++) {
//         const t = i / segments;
//         const lat = start[1] + t * (end[1] - start[1]);
//         const lon = start[0] + t * (end[0] - start[0]);

//         // Introduce slight curve effect based on ocean navigation
//         const curveFactor = Math.sin(t * Math.PI) * getDistance(start, end) * 0.0001;
//         coords.push([lon, lat + curveFactor]); // Apply curvature effect
//     }
//     return coords;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);
//     const modifyInteractionRef = useRef(null);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Modify interaction for draggable line reshaping
//         modifyInteractionRef.current = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modifyInteractionRef.current);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: `Point ${coordinates.length + 1}`,
//                 icon: formValues.icon || defaultIcon,
//             });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     /**
//      * Updates the route with curved paths and enables dragging
//      */
//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             const assignedIcon = icons[index] || getDefaultIcon(labels[index]);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: assignedIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             let curvedCoords = [];
//             for (let i = 0; i < coords.length - 1; i++) {
//                 curvedCoords = curvedCoords.concat(interpolateGeodesic(coords[i], coords[i + 1]));
//             }

//             const lineGeometry = new LineString(curvedCoords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = (coord, name, icon) => {
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, icon || getDefaultIcon(name)];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         addCoordinateByLatLon: (latLon, name, icon) => addPoint(latLon, name, icon),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: "5px", right: "0px", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
//                     <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" }}>
//                         <h3>Add a Point</h3>
//                         <Autocomplete
//                             options={searchResults}
//                             getOptionLabel={(option) => option.label}
//                             onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                             onChange={(event, newValue) => {
//                                 if (newValue) {
//                                     setFormValues({
//                                         lat: newValue.lat.toString(),
//                                         lon: newValue.lon.toString(),
//                                         name: newValue.label,
//                                         icon: getDefaultIcon(newValue.label),
//                                     });
//                                 }
//                             }}
//                             renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                         />
//                         <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues((prev) => ({ ...prev, icon: e.target.value }))}>
//                             {iconOptions.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                             ))}
//                         </Select>
//                         <Button variant="contained" onClick={() => addPoint(fromLonLat([parseFloat(formValues.lon), parseFloat(formValues.lat)]), formValues.name, formValues.icon)}>Add Point</Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;




////without lat long  







// import React, { useEffect, useRef, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Point, LineString } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat, toLonLat } from "ol/proj";
// import { Stroke, Style, Icon, Fill, Text } from "ol/style";
// import { getDistance } from "ol/sphere";
// import Modify from "ol/interaction/Modify";
// import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
// import defaultIcon from "../img/location.svg";
// import customIcon1 from "../img/ship.svg";
// import customIcon2 from "../img/flight.svg";

// const iconOptions = [
//     { label: "Location", value: defaultIcon },
//     { label: "Ship", value: customIcon1 },
//     { label: "Flight", value: customIcon2 },
// ];

// const getDefaultIcon = (name) => {
//     if (name.toLowerCase().includes("ship")) return customIcon1;
//     if (name.toLowerCase().includes("flight")) return customIcon2;
//     return defaultIcon;
// };

// /**
//  * Generates a smooth curved path using geodesic interpolation
//  */
// const interpolateGeodesic = (start, end, segments = 50) => {
//     const coords = [];
//     for (let i = 0; i <= segments; i++) {
//         const t = i / segments;
//         const lat = start[1] + t * (end[1] - start[1]);
//         const lon = start[0] + t * (end[0] - start[0]);

//         // Introduce slight curve effect based on ocean navigation
//         const curveFactor = Math.sin(t * Math.PI) * getDistance(start, end) * 0.0001;
//         coords.push([lon, lat + curveFactor]); // Apply curvature effect
//     }
//     return coords;
// };

// const useMapLogic = () => {
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());
//     const lineFeatureRef = useRef(null);
//     const [coordinates, setCoordinates] = useState([]);
//     const [pointLabels, setPointLabels] = useState([]);
//     const [iconSelections, setIconSelections] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
//     const [searchResults, setSearchResults] = useState([]);
//     const modifyInteractionRef = useRef(null);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const vectorLayer = new VectorLayer({
//             source: vectorSourceRef.current,
//             zIndex: 1000,
//         });

//         mapRef.current.addLayer(vectorLayer);

//         // Modify interaction for draggable line reshaping
//         modifyInteractionRef.current = new Modify({ source: vectorSourceRef.current });
//         mapRef.current.addInteraction(modifyInteractionRef.current);

//         const handleClick = (event) => {
//             const [lon, lat] = toLonLat(event.coordinate);
//             setFormValues({
//                 lat: lat.toFixed(6),
//                 lon: lon.toFixed(6),
//                 name: `Point ${coordinates.length + 1}`,
//                 icon: formValues.icon || defaultIcon,
//             });
//             setModalOpen(true);
//         };

//         mapRef.current.on("click", handleClick);

//         return () => {
//             mapRef.current.un("click", handleClick);
//         };
//     }, [coordinates]);

//     /**
//      * Updates the route with curved paths and enables dragging
//      */
//     const updateRoute = (coords, labels, icons) => {
//         vectorSourceRef.current.clear();

//         coords.forEach((coord, index) => {
//             const pointFeature = new Feature(new Point(coord));
//             pointFeature.set("index", index);

//             const assignedIcon = icons[index] || getDefaultIcon(labels[index]);

//             pointFeature.setStyle(
//                 new Style({
//                     image: new Icon({ src: assignedIcon, scale: 0.05, anchor: [0.5, 1] }),
//                     text: new Text({
//                         text: labels[index] || `${index + 1}`,
//                         font: "bold 12px Arial",
//                         fill: new Fill({ color: "white" }),
//                         stroke: new Stroke({ color: "black", width: 2 }),
//                         offsetY: -20,
//                     }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(pointFeature);
//         });

//         if (coords.length > 1) {
//             let curvedCoords = [];
//             for (let i = 0; i < coords.length - 1; i++) {
//                 curvedCoords = curvedCoords.concat(interpolateGeodesic(coords[i], coords[i + 1]));
//             }

//             const lineGeometry = new LineString(curvedCoords);
//             const newLineFeature = new Feature(lineGeometry);
//             newLineFeature.set("type", "line");

//             newLineFeature.setStyle(
//                 new Style({
//                     stroke: new Stroke({ color: "blue", width: 3, lineCap: "round", lineJoin: "round" }),
//                 })
//             );

//             vectorSourceRef.current.addFeature(newLineFeature);
//             lineFeatureRef.current = newLineFeature;
//         }
//     };

//     const addPoint = () => {
//         const lat = parseFloat(formValues.lat);
//         const lon = parseFloat(formValues.lon);
//         if (isNaN(lat) || isNaN(lon)) return;

//         const coord = fromLonLat([lon, lat]);
//         setCoordinates((prevCoords) => {
//             const newCoords = [...prevCoords, coord];
//             setPointLabels((prevLabels) => {
//                 const newLabels = [...prevLabels, formValues.name];
//                 setIconSelections((prevIcons) => {
//                     const newIcons = [...prevIcons, formValues.icon || getDefaultIcon(formValues.name)];
//                     updateRoute(newCoords, newLabels, newIcons);
//                     return newIcons;
//                 });
//                 return newLabels;
//             });
//             return newCoords;
//         });
//         setModalOpen(false);
//     };

//     const searchPlace = async (query) => {
//         if (!query) return;
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
//         const data = await response.json();
//         setSearchResults(
//             data.map((place) => ({
//                 label: place.display_name,
//                 lat: parseFloat(place.lat),
//                 lon: parseFloat(place.lon),
//             }))
//         );
//     };

//     return {
//         setMap: (map) => (mapRef.current = map),
//         ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center", width:"450px", height:"600px", justifyContent: "center", position: "absolute", top: "5px", right: "0px", backgroundColor: "white" }}>
//                     <h3>Add a Point</h3>
//                     <Autocomplete
//                         options={searchResults}
//                         getOptionLabel={(option) => option.label}
//                         onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                         onChange={(event, newValue) => {
//                             if (newValue) {
//                                 setFormValues({
//                                     lat: newValue.lat.toString(),
//                                     lon: newValue.lon.toString(),
//                                     name: newValue.label,
//                                     icon: getDefaultIcon(newValue.label),
//                                 });
//                             }
//                         }}
//                         renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                     />
//                     <TextField label="Latitude" fullWidth value={formValues.lat} onChange={(e) => setFormValues({ ...formValues, lat: e.target.value })} />
//                     <TextField label="Longitude" fullWidth value={formValues.lon} onChange={(e) => setFormValues({ ...formValues, lon: e.target.value })} />
//                     <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}>
//                         {iconOptions.map((option) => (
//                             <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                         ))}
//                     </Select>
//                     <Button variant="contained" onClick={addPoint}>Add Point</Button>
//                 </Box>
//             </Modal>
//         ),
//     };
// };

// export default useMapLogic;



////marking co ordinates 













import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point, LineString } from "ol/geom";
import { Feature } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import { Stroke, Style, Icon, Fill, Text } from "ol/style";
import { getDistance } from "ol/sphere";
import Modify from "ol/interaction/Modify";
import { Modal, Button, TextField, Box, Autocomplete, Select, MenuItem } from "@mui/material";
import defaultIcon from "../img/location.svg";
import customIcon1 from "../img/ship.svg";
import customIcon2 from "../img/flight.svg";
import html2canvas from "html2canvas";
const iconOptions = [
    { label: "Location", value: defaultIcon },
    { label: "Ship", value: customIcon1 },
    { label: "Flight", value: customIcon2 },
];

const getDefaultIcon = (name) => {
    if (name.toLowerCase().includes("ship")) return customIcon1;
    if (name.toLowerCase().includes("flight")) return customIcon2;
    return defaultIcon;
};



// Function to capture and download the map


const getBezierCurve = (start, end, control, segments = 50) => {
    const coords = [];
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control[0] + t ** 2 * end[0];
        const y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control[1] + t ** 2 * end[1];
        coords.push([x, y]);
    }
    return coords;
};

const useMapLogic = () => {
    const mapRef = useRef(null);
    const vectorSourceRef = useRef(new VectorSource());
    const lineFeatureRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [pointLabels, setPointLabels] = useState([]);
    const [iconSelections, setIconSelections] = useState([]);
    const [controlPoints, setControlPoints] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({ lat: "", lon: "", name: "", icon: defaultIcon });
    const [searchResults, setSearchResults] = useState([]);
    const modifyInteractionRef = useRef(null);

    // useEffect(() => {
    //     if (!mapRef.current) return;

    //     const vectorLayer = new VectorLayer({
    //         source: vectorSourceRef.current,
    //         zIndex: 1000,
    //     });

    //     mapRef.current.addLayer(vectorLayer);

    //     modifyInteractionRef.current = new Modify({ source: vectorSourceRef.current });
    //     mapRef.current.addInteraction(modifyInteractionRef.current);

    //     const handleClick = (event) => {
    //         const [lon, lat] = toLonLat(event.coordinate);
    //         setFormValues({
    //             lat: lat.toFixed(6),
    //             lon: lon.toFixed(6),
    //             name: `Point ${coordinates.length + 1}`,
    //             icon: formValues.icon || defaultIcon,
    //         });
    //         setModalOpen(true);
    //     };

    //     mapRef.current.on("click", handleClick);

    //     return () => {
    //         mapRef.current.un("click", handleClick);
    //     };
    // }, [coordinates]);

    const downloadMap = async () => {
        if (!mapRef.current) return;
    
        const mapElement = mapRef.current.getViewport(); // Get the map viewport
    
        html2canvas(mapElement, { useCORS: true }).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png"); // Convert to PNG
            link.download = "marked_map.png";
            link.click();
        });
    };

    useEffect(() => {
        if (!mapRef.current) return;
    
        const vectorLayer = new VectorLayer({
            source: vectorSourceRef.current,
            zIndex: 1000,
        });
    
        mapRef.current.addLayer(vectorLayer);
    
        modifyInteractionRef.current = new Modify({ source: vectorSourceRef.current });
        mapRef.current.addInteraction(modifyInteractionRef.current);
    
        const handleClick = (event) => {
            const [lon, lat] = toLonLat(event.coordinate);
            setFormValues({
                lat: lat.toFixed(6),
                lon: lon.toFixed(6),
                name: `Point ${coordinates.length + 1}`,
                icon: formValues.icon || defaultIcon,
            });
    
            // Ensure modal is always open and updates dynamically
            if (!modalOpen) setModalOpen(true);
        };
    
        mapRef.current.on("click", handleClick);
    
        return () => {
            mapRef.current.un("click", handleClick);
        };
    }, [coordinates]);
    



    /**
     * Updates the route with curved paths and enables dragging
     */
    const updateRoute = (coords, labels, icons) => {
        vectorSourceRef.current.clear();

        coords.forEach((coord, index) => {
            const pointFeature = new Feature(new Point(coord));
            pointFeature.setStyle(
                new Style({
                    image: new Icon({ src: icons[index], scale: 0.05, anchor: [0.5, 1] }),
                    text: new Text({
                        text: labels[index] || `${index + 1}`,
                        font: "bold 12px Arial",
                        fill: new Fill({ color: "white" }),
                        stroke: new Stroke({ color: "black", width: 2 }),
                        offsetY: -20,
                    }),
                })
            );
            vectorSourceRef.current.addFeature(pointFeature);
        });




if (coords.length > 1) {
    let straightCoords = [...coords]; // Initial straight-line path

    // Create the dotted line connection between points
    const straightLineGeometry = new LineString(straightCoords);
    const straightLineFeature = new Feature(straightLineGeometry);
    straightLineFeature.setStyle(
        new Style({
            stroke: new Stroke({
                color: "blue",
                width: 2,
                lineDash: [5, 5], // Dotted line effect
            }),
        })
    );

    vectorSourceRef.current.addFeature(straightLineFeature);
    lineFeatureRef.current = straightLineFeature;
}
    }
    const addPoint = () => {
        const lat = parseFloat(formValues.lat);
        const lon = parseFloat(formValues.lon);
        if (isNaN(lat) || isNaN(lon)) return;

        const coord = fromLonLat([lon, lat]);
        setCoordinates((prevCoords) => {
            const newCoords = [...prevCoords, coord];
            setPointLabels((prevLabels) => {
                const newLabels = [...prevLabels, formValues.name];
               

                setIconSelections((prevIcons) => {
                                        const newIcons = [...prevIcons, formValues.icon || getDefaultIcon(formValues.name)];
                                        updateRoute(newCoords, newLabels, newIcons);
                                        return newIcons;
                                    });
                return newLabels;
            });
            return newCoords;
        });
        setModalOpen(false);
    };

    const searchPlace = async (query) => {
        if (!query) return;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await response.json();
        setSearchResults(
            data.map((place) => ({
                label: place.display_name,
                lat: parseFloat(place.lat),
                lon: parseFloat(place.lon),
            }))
        );
    };

    return {
        setMap: (map) => (mapRef.current = map),
        ModalComponent: (
//             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//                 <Box sx={{ width: "450px", padding: "0px", backgroundColor: "white", position: "absolute", top: "0px", right: "-200px", transform: "translate(-50%, -10%)" }}>
//                     <h3>Add a Point</h3>
//                     <Autocomplete
//                         options={searchResults}
//                         getOptionLabel={(option) => option.label}
//                         onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
//                         onChange={(event, newValue) => {
//                             if (newValue) {
//                                 setFormValues({
//                                     lat: newValue.lat.toString(),
//                                     lon: newValue.lon.toString(),
//                                     name: newValue.label,
//                                     icon: getDefaultIcon(newValue.label),
//                                 });
//                             }
//                         }}
//                         renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
//                     />
//                     <TextField label="Latitude" fullWidth value={formValues.lat} onChange={(e) => setFormValues({ ...formValues, lat: e.target.value })} />
//                     <TextField label="Longitude" fullWidth value={formValues.lon} onChange={(e) => setFormValues({ ...formValues, lon: e.target.value })} />
                    
//                     <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}>
// //                         {iconOptions.map((option) => (
//                             <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                         ))}
//                     </Select>
//                     <Button variant="contained" onClick={addPoint}>Add Point</Button>
//                 </Box>
//             </Modal>

 <Modal open={true}>
    <Box sx={{ width: "350px", height:"800px", padding: "20px", backgroundColor: "white", position: "fixed", top: "65%", right: "-250px", transform: "translate(-50%, -50%)" }}>
        <h3>Add a Point</h3>
        <h3>Enter location to Search</h3>
        <Autocomplete
            options={searchResults}
            getOptionLabel={(option) => option.label}
            onInputChange={(event, newInputValue) => searchPlace(newInputValue)}
            onChange={(event, newValue) => {
                if (newValue) {
                    setFormValues({
                        lat: newValue.lat.toString(),
                        lon: newValue.lon.toString(),
                        name: newValue.label,
                        icon: getDefaultIcon(newValue.label),
                    });
                }
            }}
            renderInput={(params) => <TextField {...params} label="Search Places" fullWidth />}
        />
        <h3>Enter Latitude</h3>
        <TextField label="Latitude" fullWidth value={formValues.lat} onChange={(e) => setFormValues({ ...formValues, lat: e.target.value })} />
        <h3>Enter Longitude</h3>
        <TextField label="Longitude" fullWidth value={formValues.lon} onChange={(e) => setFormValues({ ...formValues, lon: e.target.value })} />
        <h3>Select the Icon</h3>
        <Select fullWidth value={formValues.icon} onChange={(e) => setFormValues({ ...formValues, icon: e.target.value })}>
            {iconOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
        </Select>
        <Button variant="contained" onClick={addPoint}>Add Point</Button>

        <Button variant="contained" color="primary" onClick={downloadMap}>
    Download Map
</Button>

    </Box>
</Modal>



        ),
    };
};

export default useMapLogic;











