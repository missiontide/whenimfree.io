import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../styles/Calendar.css'

function Calendar() {
    const initialDays = [];
    const [days, setDays] = useState(initialDays);

    const footer =
        days && days.length > 0 ? (
            <p>You selected {days.length} day(s).</p>
        ) : (
            <p>Please pick one or more days.</p>
        );

    return (
        <DayPicker
            mode="multiple"
            min={1}
            selected={days}
            onSelect={setDays}
            footer={footer}
        />
    );
}

export default Calendar;