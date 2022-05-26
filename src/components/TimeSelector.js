import React, { useState } from "react";
import { FormSelect, Row, Col, FloatingLabel } from "react-bootstrap";
import '../styles/TimeSelector.css'

function TimeSelector() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");


    return (
        <div>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="From">
                        <FormSelect value={"8:00 AM"}>
                            <option>12:00 AM</option>
                            <option>1:00 AM</option>
                            <option>2:00 AM</option>
                            <option>3:00 AM</option>
                            <option>4:00 AM</option>
                            <option>5:00 AM</option>
                            <option>6:00 AM</option>
                            <option>7:00 AM</option>
                            <option>8:00 AM</option>
                            <option>9:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>12:00 AM</option>
                            <option>1:00 PM</option>
                            <option>2:00 PM</option>
                            <option>3:00 PM</option>
                            <option>4:00 PM</option>
                            <option>5:00 PM</option>
                            <option>6:00 PM</option>
                            <option>7:00 PM</option>
                            <option>8:00 PM</option>
                            <option>9:00 PM</option>
                            <option>10:00 PM</option>
                            <option>11:00 PM</option>
                            <option>12:00 PM</option>
                        </FormSelect>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Until">
                        <FormSelect value={"5:00 PM"}>
                            <option>12:00 AM</option>
                            <option>1:00 AM</option>
                            <option>2:00 AM</option>
                            <option>3:00 AM</option>
                            <option>4:00 AM</option>
                            <option>5:00 AM</option>
                            <option>6:00 AM</option>
                            <option>7:00 AM</option>
                            <option>8:00 AM</option>
                            <option>9:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>12:00 AM</option>
                            <option>1:00 PM</option>
                            <option>2:00 PM</option>
                            <option>3:00 PM</option>
                            <option>4:00 PM</option>
                            <option>5:00 PM</option>
                            <option>6:00 PM</option>
                            <option>7:00 PM</option>
                            <option>8:00 PM</option>
                            <option>9:00 PM</option>
                            <option>10:00 PM</option>
                            <option>11:00 PM</option>
                            <option>12:00 PM</option>
                        </FormSelect>
                    </FloatingLabel>
                </Col>
            </Row>
        </div>
    );
}

export default TimeSelector;