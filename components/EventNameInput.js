import React from "react";
import { Form } from "react-bootstrap";

function EventNameInput(props) {

    function handleChange(e) {
        props.setEventName(e.target.value);
    }

    return (
        <>
            <div className="inputDiv">
                <Form.Control
                    value={props.eventName}
                    onChange={handleChange}
                    placeholder="Friends Hangout"
                    autoFocus
                />
            </div>
        </>
    );
}

export default EventNameInput;