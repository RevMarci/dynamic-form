import React from "react";
import "../../styles/input.css";

function Integer({ id, label, value, onChange }) {
    const handleChange = (e) => {
        const newValue = e.target.value === "" ? "" : parseInt(e.target.value, 10);
        onChange(id, newValue);
    };

    return (
        <div className="field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="number"
            value={value}
            onChange={handleChange}
            className="input"
        />
        </div>
    );
}

export default Integer;
