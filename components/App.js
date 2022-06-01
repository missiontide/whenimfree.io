import React, { useState, useEffect } from "react";

import EventNameInput from "./EventNameInput";
import DayPickerCalendar from "./DayPickerCalendar"
import TimeSelector from "./TimeSelector";
import AvailabilityGrid from "./AvailabilityGrid";

function App() {
    const [days, setDays] = useState([]);
    useEffect(() => {

    }, [days]);

    const [startTime, setStartTime] = useState("8:00 AM");
    const [endTime, setEndTime] = useState("5:00 PM");

    return (
        <div className="App">
            <header className="App-header">
                whenimfree.io
            </header>
            <div>
                <EventNameInput />
                <DayPickerCalendar
                    days={days}
                    setDays={setDays}
                />
                <TimeSelector
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <AvailabilityGrid
                    selectedDays={days}
                    startTime={startTime}
                    endTime={endTime}
                />
            </div>
        </div>
    );
}

export default App;
