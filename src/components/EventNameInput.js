import React, { useState } from "react";
import '../styles/EventNameInput.css'

function EventNameInput() {
    const [value, setValue] = useState("");

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className="inputDiv">
            <input
                value={value}
                onChange={handleChange}
                placeholder="event name..."
                autoFocus
            />
        </div>
    );
}

export default EventNameInput;