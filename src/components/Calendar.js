import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import App from "../App";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Calendar() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
            inline
            monthsShown={2}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    );
}

export default Calendar;