import React from "react";
import "../../styles/input.css";

function Text({ id, label, value, onChange }) {
    const handleChange = (e) => {
        onChange(id, e.target.value);
    };

    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="text"
                value={value}
                onChange={handleChange}
                className="input"
            />
        </div>
    );
}

export default Text;
