import React from "react";
import { Form } from "react-bootstrap";

function Name(props) {

    function handleChange(e) {
        props.setName(e.target.value);
    }

    return (
        <div className="nameInputDiv">
            <Form.Control
                value={props.eventName}
                onChange={handleChange}
                placeholder="Enter your name..."
                autoFocus
            />
        </div>
    );
}

export default Name;