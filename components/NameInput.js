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
                placeholder="enter your name..."
                autoFocus
            />
        </div>
    );
}

export default Name;