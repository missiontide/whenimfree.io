import React from "react";
import { Form, Badge } from "react-bootstrap";

function EventNameInput(props) {

    function handleChange(e) {
        props.setEventName(e.target.value);
    }

    return (
        <>
            <div className="badgeDiv">
                <Badge bg={props.eventName === "" ? "dark" : "secondary"}>1. Name your event</Badge>
            </div>
            <div className="inputDiv">
                <Form.Control
                    value={props.eventName}
                    onChange={handleChange}
                    placeholder="Enter event name..."
                    autoFocus
                />
            </div>
        </>
    );
}

export default EventNameInput;