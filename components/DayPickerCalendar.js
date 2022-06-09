import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { add } from 'date-fns';
import 'react-day-picker/dist/style.css';
import {Badge} from "react-bootstrap";

function DayPickerCalendar(props) {

    const footer =
        props.days && props.days.length > 0 ? (
            <p><b>{props.days.length} day{props.days.length > 1 && "s"} selected.</b></p>
        ) : (
            <p style={{'height': '25.5px'}}></p>
        );

    return (
        <div className="dayPicker">
            <Badge bg={props.days && props.days.length > 0 ? "secondary" : "dark"}>2. Select day(s)</Badge>
            <DayPicker
                showOutsideDays
                mode="multiple"
                fromDate={new Date()}
                toDate={add(new Date(), {months: 12})}
                max={35}
                selected={props.days}
                onSelect={props.setDays}
                footer={footer}
            />
        </div>
    );
}

export default DayPickerCalendar;