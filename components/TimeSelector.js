import { useState } from "react";
import {FormSelect, Row, Col, FloatingLabel, Badge} from "react-bootstrap";

function TimeSelector(props) {
    const [selected, setSelected] = useState(false);

    return (
        <div className="timeSelectorDiv">
            <div className="badgeDiv">
                 <Badge bg={!selected ? "dark" : "secondary"}>3. Choose timeframe</Badge>
            </div>
            <Row className="g-2">
                <Col sm>
                    <FloatingLabel className="floatingLabel left" controlId="floatingSelectGrid" label="From">
                        <FormSelect
                            className="timeSelector left"
                            value={props.startTime}
                            onChange={(e) => {
                                setSelected(true);
                                props.setStartTime(e.target.value);
                            }}
                        >
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
                        </FormSelect>
                    </FloatingLabel>
                </Col>
                <Col sm>
                    <FloatingLabel controlId="floatingSelectGrid" label="Until">
                        <FormSelect
                            className="timeSelector right"
                            value={props.endTime}
                            onChange={(e) => {
                                setSelected(true);
                                props.setEndTime(e.target.value)
                            }}
                        >
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
                            <option>12:00 AM</option>
                        </FormSelect>
                    </FloatingLabel>
                </Col>
            </Row>
        </div>
    );
}

export default TimeSelector;