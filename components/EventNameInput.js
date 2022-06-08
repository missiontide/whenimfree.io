import React from "react";

function EventNameInput(props) {

    function handleChange(e) {
        props.setEventName(e.target.value);
    }

    return (
        <div className="inputDiv">
            <input
                value={props.eventName}
                onChange={handleChange}
                placeholder="event name..."
                autoFocus
            />
        </div>
    );
}

export default EventNameInput;