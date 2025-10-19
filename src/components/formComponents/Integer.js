import React from "react";
import "../../styles/Integer.css";

function Integer({ id, label, value, onChange }) {
    const handleChange = (e) => {
        const newValue = e.target.value === "" ? "" : parseInt(e.target.value, 10);
        onChange(id, newValue);
    };

    return (
        <div className="integer-field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="number"
            value={value}
            onChange={handleChange}
            className="integer-input"
        />
        </div>
    );
}

export default Integer;
