// import { useState } from "react";

// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon);
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         if (!searchQuery) return;
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchResults([]);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for a place..."
//             />
//             <button type="button" onClick={handleSearch}>Search</button>
//             <ul>
//                 {searchResults.map((result) => (
//                     <li key={result.place_id} onClick={() => handleSelectLocation(result.lat, result.lon)}>
//                         {result.display_name}
//                     </li>
//                 ))}
//             </ul>
//             <form onSubmit={handleSubmit} className="coordinate-form">
//                 <label>
//                     Latitude:
//                     <input 
//                         type="number" 
//                         value={latitude} 
//                         onChange={(e) => setLatitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Longitude:
//                     <input 
//                         type="number" 
//                         value={longitude} 
//                         onChange={(e) => setLongitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <button type="submit">Add Coordinate</button>
//             </form>
//         </div>
//     );
// };

// export default CoordinateInputForm;








// import { useState } from "react";
// import './CoordinateInputForm.css';
// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon);
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         if (!searchQuery) return;
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div>
//             <div className="Co-ordinate-box">
//             <div className="search-container">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for a place..."
//                 />
//                 <button type="button" onClick={handleSearch}>Search</button>
//                 {showDropdown && searchResults.length > 0 && (
//                     <ul className="dropdown">
//                         {searchResults.map((result) => (
//                             <li 
//                                 key={result.place_id} 
//                                 onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                             >
//                                 {result.display_name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <form onSubmit={handleSubmit} className="coordinate-form">
//                 <label>
//                     Latitude:
//                     <input 
//                         type="number" 
//                         value={latitude} 
//                         onChange={(e) => setLatitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Longitude:
//                     <input 
//                         type="number" 
//                         value={longitude} 
//                         onChange={(e) => setLongitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <button type="submit">Add Coordinate</button>
//             </form>
//         </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;
















// import { useState, useEffect } from "react";
// import './CoordinateInputForm.css';

// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500); // Debounce to avoid excessive API calls

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon);
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div>
//             <div className="Co-ordinate-box">
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for a place..."
//                     />
//                     {showDropdown && searchResults.length > 0 && (
//                         <ul className="dropdown">
//                             {searchResults.map((result) => (
//                                 <li 
//                                     key={result.place_id} 
//                                     onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                                 >
//                                     {result.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit} className="coordinate-form">
//                     <label>
//                         Latitude:
//                         <input 
//                             type="number" 
//                             value={latitude} 
//                             onChange={(e) => setLatitude(e.target.value)} 
//                             step="any"
//                             required 
//                         />
//                     </label>
//                     <label>
//                         Longitude:
//                         <input 
//                             type="number" 
//                             value={longitude} 
//                             onChange={(e) => setLongitude(e.target.value)} 
//                             step="any"
//                             required 
//                         />
//                     </label>
//                     <button type="submit">Add Coordinate</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;








// import { useState, useEffect } from "react";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import './CoordinateInputForm.css';

// const icons = [
//     { name: "Location", component: <Room /> },
//     { name: "Ship", component: <DirectionsBoat /> },
//     { name: "Flight", component: <Flight /> },
//     { name: "Train", component: <Train /> },
//     { name: "Car", component: <DirectionsCar /> }
// ];

// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]);

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500);

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon, selectedIcon.name);
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div>
//             <div className="Co-ordinate-box">
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for a place..."
//                     />
//                     {showDropdown && searchResults.length > 0 && (
//                         <ul className="dropdown">
//                             {searchResults.map((result) => (
//                                 <li 
//                                     key={result.place_id} 
//                                     onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                                 >
//                                     {result.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit} className="coordinate-form">
//                     <label>
//                         Latitude:
//                         <input 
//                             type="number" 
//                             value={latitude} 
//                             onChange={(e) => setLatitude(e.target.value)} 
//                             step="any"
//                             required 
//                         />
//                     </label>
//                     <label>
//                         Longitude:
//                         <input 
//                             type="number" 
//                             value={longitude} 
//                             onChange={(e) => setLongitude(e.target.value)} 
//                             step="any"
//                             required 
//                         />
//                     </label>
//                     <div className="icon-selector">
//                         <p>Select an icon for marking:</p>
//                         <div className="icon-list">
//                             {icons.map((icon) => (
//                                 <button 
//                                     key={icon.name} 
//                                     type="button" 
//                                     className={selectedIcon.name === icon.name ? "selected" : ""} 
//                                     onClick={() => setSelectedIcon(icon)}
//                                 >
//                                     {icon.component}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button type="submit">Add Coordinate</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;

















// import { useState, useEffect } from "react";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import './CoordinateInputForm.css';

// const icons = [
//     { name: "Location", component: <Room /> },
//     { name: "Ship", component: <DirectionsBoat /> },
//     { name: "Flight", component: <Flight /> },
//     { name: "Train", component: <Train /> },
//     { name: "Car", component: <DirectionsCar /> }
// ];

// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]);

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500);

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon, selectedIcon.name); // Pass selected icon
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div className="Co-ordinate-box">
//             <div className="search-container">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for a place..."
//                 />
//                 {showDropdown && searchResults.length > 0 && (
//                     <ul className="dropdown">
//                         {searchResults.map((result) => (
//                             <li 
//                                 key={result.place_id} 
//                                 onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                             >
//                                 {result.display_name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <form onSubmit={handleSubmit} className="coordinate-form">
//                 <label>
//                     Latitude:
//                     <input 
//                         type="number" 
//                         value={latitude} 
//                         onChange={(e) => setLatitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Longitude:
//                     <input 
//                         type="number" 
//                         value={longitude} 
//                         onChange={(e) => setLongitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <div className="icon-selector">
//                     <p>Select an icon for marking:</p>
//                     <div className="icon-list">
//                         {icons.map((icon) => (
//                             <button 
//                                 key={icon.name} 
//                                 type="button" 
//                                 className={selectedIcon.name === icon.name ? "selected" : ""} 
//                                 onClick={() => setSelectedIcon(icon)}
//                             >
//                                 {icon.component}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <button type="submit">Add Coordinate</button>
//             </form>
//         </div>
//     );
// };

// export default CoordinateInputForm;













// import { useState, useEffect } from "react";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import './CoordinateInputForm.css';

// const icons = [
//     { name: "Location", component: <Room /> },
//     { name: "Ship", component: <DirectionsBoat /> },
//     { name: "Flight", component: <Flight /> },
//     { name: "Train", component: <Train /> },
//     { name: "Car", component: <DirectionsCar /> }
// ];

// const CoordinateInputForm = ({ addCoordinateByLatLon }) => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]);

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500);

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon, selectedIcon.name);
//         setLatitude("");
//         setLongitude("");
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div className="Co-ordinate-box">
//             <div className="search-container">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for a place..."
//                 />
//                 {showDropdown && searchResults.length > 0 && (
//                     <ul className="dropdown">
//                         {searchResults.map((result) => (
//                             <li 
//                                 key={result.place_id} 
//                                 onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                             >
//                                 {result.display_name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <form onSubmit={handleSubmit} className="coordinate-form">
//                 <label>
//                     Latitude:
//                     <input 
//                         type="number" 
//                         value={latitude} 
//                         onChange={(e) => setLatitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <label>
//                     Longitude:
//                     <input 
//                         type="number" 
//                         value={longitude} 
//                         onChange={(e) => setLongitude(e.target.value)} 
//                         step="any"
//                         required 
//                     />
//                 </label>
//                 <div className="icon-selector">
//                     <p>Select an icon for marking:</p>
//                     <div className="icon-list">
//                         {icons.map((icon) => (
//                             <button 
//                                 key={icon.name} 
//                                 type="button" 
//                                 className={selectedIcon.name === icon.name ? "selected" : ""} 
//                                 onClick={() => setSelectedIcon(icon)}
//                             >
//                                 {icon.component}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <button type="submit">Add Coordinate</button>
//             </form>
//         </div>
//     );
// };

// export default CoordinateInputForm;









// import React, { useState, useEffect, useRef } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import { fromLonLat } from "ol/proj";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Feature } from "ol";
// import { Point } from "ol/geom";
// import { Icon, Style } from "ol/style";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import "./CoordinateInputForm.css";
// import locationIcon from "./../img/location.svg"; // Import local SVG icon

// const icons = [
//     { name: "Location", component: <Room />, src: locationIcon },
//     { name: "Ship", component: <DirectionsBoat />, src: "./../img/ship.svg" },
//     { name: "Flight", component: <Flight />, src: "./../img/flight.svg" },
//     { name: "Train", component: <Train />, src: "./../img/train.svg" },
//     { name: "Car", component: <DirectionsCar />, src: "./../img/car.svg" }
// ];

// const CoordinateInputForm = () => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]);
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500);

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     useEffect(() => {
//         // Initialize map
//         const map = new Map({
//             target: mapRef.current,
//             layers: [
//                 new TileLayer({
//                     source: new OSM()
//                 }),
//                 new VectorLayer({
//                     source: vectorSourceRef.current
//                 })
//             ],
//             view: new View({
//                 center: fromLonLat([0, 0]), // Default center
//                 zoom: 2
//             })
//         });

//         return () => map.setTarget(null); // Cleanup on unmount
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateToMap(lat, lon, selectedIcon.src);
//         setLatitude("");
//         setLongitude("");
//     };

//     const addCoordinateToMap = (lat, lon, iconSrc) => {
//         const feature = new Feature({
//             geometry: new Point(fromLonLat([lon, lat]))
//         });

//         feature.setStyle(new Style({
//             image: new Icon({
//                 src: iconSrc,
//                 scale: 0.1 // Adjust as needed
//             })
//         }));

//         vectorSourceRef.current.addFeature(feature);
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div className="coordinate-container">
//             <div className="map-container" ref={mapRef}></div>
//             <div className="Co-ordinate-box">
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for a place..."
//                     />
//                     {showDropdown && searchResults.length > 0 && (
//                         <ul className="dropdown">
//                             {searchResults.map((result) => (
//                                 <li
//                                     key={result.place_id}
//                                     onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                                 >
//                                     {result.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit} className="coordinate-form">
//                     <label>
//                         Latitude:
//                         <input
//                             type="number"
//                             value={latitude}
//                             onChange={(e) => setLatitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <label>
//                         Longitude:
//                         <input
//                             type="number"
//                             value={longitude}
//                             onChange={(e) => setLongitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <div className="icon-selector">
//                         <p>Select an icon for marking:</p>
//                         <div className="icon-list">
//                             {icons.map((icon) => (
//                                 <button
//                                     key={icon.name}
//                                     type="button"
//                                     className={selectedIcon.name === icon.name ? "selected" : ""}
//                                     onClick={() => setSelectedIcon(icon)}
//                                 >
//                                     {icon.component}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button type="submit">Add Coordinate</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;




















// import React, { useState, useEffect, useRef } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import { fromLonLat } from "ol/proj";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Feature } from "ol";
// import { Point } from "ol/geom";
// import { Icon, Style } from "ol/style";
// import { Room, DirectionsBoat, Flight, Train, DirectionsCar } from "@mui/icons-material";
// import "./CoordinateInputForm.css";
// import locationIcon from "./../img/location.svg"; // Corrected icon import
// import shipIcon from "./../img/ship.svg";
// import flightIcon from "./../img/flight.svg";


// const icons = [
//     { name: "Location", component: <Room />, src: locationIcon },
//     { name: "Ship", component: <DirectionsBoat />, src: shipIcon },
//     { name: "Flight", component: <Flight />, src: flightIcon },

// ];

// const CoordinateInputForm = () => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Default to Location icon
//     const mapRef = useRef(null);
//     const vectorSourceRef = useRef(new VectorSource());

//     useEffect(() => {
//         const delaySearch = setTimeout(() => {
//             if (searchQuery) {
//                 handleSearch();
//             } else {
//                 setSearchResults([]);
//                 setShowDropdown(false);
//             }
//         }, 500);

//         return () => clearTimeout(delaySearch);
//     }, [searchQuery]);

//     useEffect(() => {
//         // Initialize map
//         const map = new Map({
//             target: mapRef.current,
//             layers: [
//                 new TileLayer({ source: new OSM() }),
//                 new VectorLayer({ source: vectorSourceRef.current })
//             ],
//             view: new View({
//                 center: fromLonLat([0, 0]), // Default center
//                 zoom: 2
//             })
//         });

//         return () => map.setTarget(null); // Cleanup on unmount
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateToMap(lat, lon, selectedIcon.src, selectedIcon.name);
//         setLatitude("");
//         setLongitude("");
//     };

//     const addCoordinateToMap = (lat, lon, iconSrc, iconName) => {
//         const feature = new Feature({
//             geometry: new Point(fromLonLat([lon, lat]))
//         });

//         // Adjust scale based on icon type
//         const iconScale = iconName === "Location" ? 0.05 : 0.2; // 🔹 Smallest size for "Location" icon

//         feature.setStyle(
//             new Style({
//                 image: new Icon({
//                     src: iconSrc,
//                     scale: iconScale, // 🔹 Smallest possible size
//                     anchor: [0.5, 1] // Center the icon properly
//                 })
//             })
//         );

//         vectorSourceRef.current.addFeature(feature);
//     };

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
//             );
//             const data = await response.json();
//             setSearchResults(data);
//             setShowDropdown(true);
//         } catch (error) {
//             console.error("Error fetching location data:", error);
//         }
//     };

//     const handleSelectLocation = (lat, lon, name) => {
//         setLatitude(lat);
//         setLongitude(lon);
//         setSearchQuery(name);
//         setShowDropdown(false);
//     };

//     return (
//         <div className="coordinate-container">
//             <div className="map-container" ref={mapRef}></div>
//             <div className="Co-ordinate-box">
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for a place..."
//                     />
//                     {showDropdown && searchResults.length > 0 && (
//                         <ul className="dropdown">
//                             {searchResults.map((result) => (
//                                 <li
//                                     key={result.place_id}
//                                     onClick={() => handleSelectLocation(result.lat, result.lon, result.display_name)}
//                                 >
//                                     {result.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit} className="coordinate-form">
//                     <label>
//                         Latitude:
//                         <input
//                             type="number"
//                             value={latitude}
//                             onChange={(e) => setLatitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <label>
//                         Longitude:
//                         <input
//                             type="number"
//                             value={longitude}
//                             onChange={(e) => setLongitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <div className="icon-selector">
//                         <p>Select an icon for marking:</p>
//                         <div className="icon-list">
//                             {icons.map((icon) => (
//                                 <button
//                                     key={icon.name}
//                                     type="button"
//                                     className={selectedIcon.name === icon.name ? "selected" : ""}
//                                     onClick={() => setSelectedIcon(icon)}
//                                 >
//                                     {icon.component}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button type="submit">Add Coordinate</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;

















// import React, { useState, useEffect, useRef } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import { fromLonLat } from "ol/proj";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import { Room, DirectionsBoat, Flight } from "@mui/icons-material";
// import useMapLogic from "./useMapLogic"; // Import map logic hook
// import locationIcon from "./../img/location.svg";
// import shipIcon from "./../img/ship.svg";
// import flightIcon from "./../img/flight.svg";
// import "./CoordinateInputForm.css";

// // Define icons list
// const icons = [
//     { name: "Location", component: <Room />, src: locationIcon },
//     { name: "Ship", component: <DirectionsBoat />, src: shipIcon },
//     { name: "Flight", component: <Flight />, src: flightIcon },
// ];

// const CoordinateInputForm = () => {
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Default Location Icon
//     const mapRef = useRef(null);
//     const { setMap, addCoordinateByLatLon, getClickedCoords } = useMapLogic();

//     useEffect(() => {
//         const map = new Map({
//             target: mapRef.current,
//             layers: [new TileLayer({ source: new OSM() })],
//             view: new View({
//                 center: fromLonLat([0, 0]),
//                 zoom: 2
//             })
//         });

//         setMap(map);

//         // Capture clicked coordinates and update form
//         map.on("click", (event) => {
//             const [lon, lat] = getClickedCoords(event.coordinate);
//             setLatitude(lat.toFixed(6));
//             setLongitude(lon.toFixed(6));
//         });

//         return () => map.setTarget(null);
//     }, [setMap]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             alert("Please enter valid latitude and longitude.");
//             return;
//         }

//         addCoordinateByLatLon(lat, lon, selectedIcon);
//         setLatitude("");
//         setLongitude("");
//     };

//     return (
//         <div className="coordinate-container">
//             <div className="map-container" ref={mapRef}></div>
//             <div className="Co-ordinate-box">
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for a place..."
//                     />
//                     {showDropdown && searchResults.length > 0 && (
//                         <ul className="dropdown">
//                             {searchResults.map((result) => (
//                                 <li
//                                     key={result.place_id}
//                                     onClick={() => {
//                                         setLatitude(result.lat);
//                                         setLongitude(result.lon);
//                                         setSearchQuery(result.display_name);
//                                         setShowDropdown(false);
//                                     }}
//                                 >
//                                     {result.display_name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//                 <form onSubmit={handleSubmit} className="coordinate-form">
//                     <label>
//                         Latitude:
//                         <input
//                             type="number"
//                             value={latitude}
//                             onChange={(e) => setLatitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <label>
//                         Longitude:
//                         <input
//                             type="number"
//                             value={longitude}
//                             onChange={(e) => setLongitude(e.target.value)}
//                             step="any"
//                             required
//                         />
//                     </label>
//                     <div className="icon-selector">
//                         <p>Select an icon for marking:</p>
//                         <div className="icon-list">
//                             {icons.map((icon) => (
//                                 <button
//                                     key={icon.name}
//                                     type="button"
//                                     className={selectedIcon.name === icon.name ? "selected" : ""}
//                                     onClick={() => setSelectedIcon(icon)}
//                                 >
//                                     {icon.component}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button type="submit">Add Coordinate</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CoordinateInputForm;




import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Room, DirectionsBoat, Flight } from "@mui/icons-material";
import useMapLogic from "./useMapLogic";
import locationIcon from "./../img/location.svg";
import shipIcon from "./../img/ship.svg";
import flightIcon from "./../img/flight.svg";
import "./CoordinateInputForm.css";

// Define icon options
const icons = [
    { name: "Location", component: <Room />, src: locationIcon },
    { name: "Ship", component: <DirectionsBoat />, src: shipIcon },
    { name: "Flight", component: <Flight />, src: flightIcon },
];

const CoordinateInputForm = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Default icon
    const mapRef = useRef(null);
    const { setMap, addCoordinateByLatLon, getClickedCoords } = useMapLogic();

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2
            })
        });

        setMap(map);

        // Capture clicked coordinates & update form
        map.on("click", (event) => {
            const [lon, lat] = getClickedCoords(event.coordinate);
            setLatitude(lat.toFixed(6));
            setLongitude(lon.toFixed(6));
        });

        return () => map.setTarget(null);
    }, [setMap]);

    // Handle location search
    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setShowDropdown(false);
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();
            setSearchResults(data);
            setShowDropdown(true);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            alert("Please enter valid latitude and longitude.");
            return;
        }

        addCoordinateByLatLon(lat, lon, selectedIcon);
        setLatitude("");
        setLongitude("");
        setSearchQuery("");
    };

    return (
        <div className="coordinate-container">
            <div className="map-container" ref={mapRef}></div>
            <div className="Co-ordinate-box">
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search for a place..."
                    />
                    {showDropdown && searchResults.length > 0 && (
                        <ul className="dropdown">
                            {searchResults.map((result) => (
                                <li
                                    key={result.place_id}
                                    onClick={() => {
                                        setLatitude(result.lat);
                                        setLongitude(result.lon);
                                        setSearchQuery(result.display_name);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {result.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="coordinate-form">
                    <label>
                        Latitude:
                        <input
                            type="number"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            step="any"
                            required
                        />
                    </label>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            step="any"
                            required
                        />
                    </label>
                    <div className="icon-selector">
                        <p>Select an icon for marking:</p>
                        <div className="icon-list">
                            {icons.map((icon) => (
                                <button
                                    key={icon.name}
                                    type="button"
                                    className={selectedIcon.name === icon.name ? "selected" : ""}
                                    onClick={() => setSelectedIcon(icon)}
                                >
                                    {icon.component}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Add Coordinate</button>
                </form>
            </div>
        </div>
    );
};

export default CoordinateInputForm;









