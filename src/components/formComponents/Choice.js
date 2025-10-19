import React, { useEffect, useState } from "react";
import "../../styles/input.css";

function Choice({ id, label, value, onChange, widgetKey }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const res = await fetch(`https://test.superhero.hu/choice/${widgetKey}`);
                if (!res.ok) throw new Error("Error on loading of the options");
                const data = await res.json();
                setOptions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchChoices();
    }, [widgetKey]);

    const handleChange = (e) => {
        onChange(id, e.target.value);
    };

    if (loading) return <div className="choice-loading">Loading...</div>;
    if (error) return <div className="choice-error">{error}</div>;

    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={handleChange} className="choice-select">
                <option value="">-- Choose one --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Choice;
