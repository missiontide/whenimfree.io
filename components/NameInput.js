import React from "react";

function Name(props) {

    function handleChange(e) {
        props.setName(e.target.value);
    }

    return (
        <div className="inputDiv">
            <input
                value={props.eventName}
                onChange={handleChange}
                placeholder="enter your name..."
                autoFocus
            />
        </div>
    );
}

export default Name;