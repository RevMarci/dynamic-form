import React, { useState, useEffect } from "react";
import Integer from "./formComponents/Integer";
import Text from "./formComponents/Text";
import Choice from "./formComponents/Choice";
import SubmitButton from "./SubmitButton";
import Spinner from "./Spinner";
import "../styles/FormPage.css";

function FormPage() {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await fetch("https://test.superhero.hu/form");

                if (!res.ok) {
                    throw new Error("Error on loading of the form");
                }

                const data = await res.json();
                setFormFields(data);

                const initialData = {};
                data.forEach(field => { initialData[field.id] = ""; });

                setFormData(initialData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, []);

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch("https://test.superhero.hu/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Hiba a mentéskor");
            const result = await res.json();
            console.log("Mentés sikeres:", result);
            alert("Űrlap sikeresen elküldve!");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <form className="form-page" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            {formFields.map(field => {
                switch (field.widget) {
                    case "integer":
                        return (
                            <Integer
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                value={formData[field.id]}
                                onChange={handleChange}
                            />
                        );
                    case "text":
                        return (
                            <Text
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                value={formData[field.id]}
                                onChange={handleChange}
                            />
                        );
                    case "choice":
                        return (
                            <Choice
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                value={formData[field.id]}
                                onChange={handleChange}
                                widgetKey={field.id}
                            />
                        );
                    default:
                        return null;
                }
            })}

            <SubmitButton
                onClick={handleSubmit}
                disabled={submitting}
                label={submitting ? "Subminting..." : "Submint"}
            />
        </form>
    );
}

export default FormPage;
