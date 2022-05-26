import React, { useState } from "react";
import '../styles/EventNameInput.css'

function EventNameInput() {
    const [value, setValue] = useState("");

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <input value={value} onChange={handleChange}/>
    );
}

export default EventNameInput;