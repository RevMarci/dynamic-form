import React from "react";
import "../styles/SubmitButton.css";

function SubmitButton({ onClick, disabled, label }) {
    return (
        <button
            type="submit"
            className="submit-button"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default SubmitButton;
