import dynamic from "next/dynamic"
const TimezoneSelect = dynamic(import('react-timezone-select'), {ssr: false}) // workaround for next.js hydration error
import { FormSelect, Row, Col, FloatingLabel } from "react-bootstrap";

function TimeSelector(props) {

    return (
        <div>
            <div className="timezoneDiv">
                <TimezoneSelect
                    value={props.selectedTimezone}
                    onChange={props.setSelectedTimezone}
                />
            </div>
            <div className="timeSelectorDiv first">
                <FloatingLabel className="floatingLabel left" controlId="floatingSelectGrid" label="From">
                    <FormSelect
                        className="left"
                        value={props.startTime}
                        onChange={(e) => {props.setStartTime(e.target.value);}}
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
                        <option>12:00 PM</option>
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
            </div>
            <div className="timeSelectorDiv">
                <FloatingLabel controlId="floatingSelectGrid" label="Until">
                    <FormSelect
                        value={props.endTime}
                        onChange={(e) => {props.setEndTime(e.target.value)}}
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
                        <option>12:00 PM</option>
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
            </div>
        </div>
    );
}

export default TimeSelector;