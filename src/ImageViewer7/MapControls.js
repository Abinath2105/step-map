import React, { useState } from "react";

const MapControls = ({ onAddCoordinate }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddCoordinate = () => {
        const [lon, lat] = inputValue.split(",").map(Number);
        if (!isNaN(lon) && !isNaN(lat)) {
            onAddCoordinate([lon, lat]);
            setInputValue(""); // Clear input after adding
        } else {
            alert("Invalid coordinates. Enter in format: longitude,latitude");
        }
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter longitude,latitude"
                style={{ padding: "5px" }}
            />
            <button onClick={handleAddCoordinate} style={{ padding: "5px", marginLeft: "5px" }}>
                Add Point
            </button>
        </div>
    );
};

export default MapControls;
