import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { add } from 'date-fns';
import 'react-day-picker/dist/style.css';

function DayPickerCalendar(props) {

    const footer =
        props.days && props.days.length > 0 ? (
            <p>{props.days.length} day{props.days.length > 1 && "s"} selected.</p>
        ) : (
            <p>Select one or more days.</p>
        );

    return (
        <DayPicker
            showOutsideDays
            mode="multiple"
            fromDate={new Date()}
            toDate={add(new Date(), {months: 12})}
            selected={props.days}
            onSelect={props.setDays}
            footer={footer}
        />
    );
}

export default DayPickerCalendar;