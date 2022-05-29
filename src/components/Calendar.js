import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { add } from 'date-fns';
import 'react-day-picker/dist/style.css';
import '../styles/Calendar.css'

function Calendar() {
    const [days, setDays] = useState([]);

    const footer =
        days && days.length > 0 ? (
            <p>{days.length} day{days.length > 1 && "s"} selected.</p>
        ) : (
            <p>Select one or more days.</p>
        );

    return (
        <DayPicker
            showOutsideDays
            mode="multiple"
            fromDate={new Date()}
            toDate={add(new Date(), {months: 12})}
            selected={days}
            onSelect={setDays}
            footer={footer}
        />
    );
}

export default Calendar;