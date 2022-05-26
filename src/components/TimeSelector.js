import React, { useState } from "react";
import '../styles/TimeSelector.css.css'

function TimeSelector() {
    const [value, setValue] = useState("");

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div>
            TIME SELECTOR
        </div>
    );
}

export default TimeSelector;