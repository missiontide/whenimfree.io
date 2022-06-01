import React, { useState } from "react";

import EventNameInput from "./EventNameInput";
import DayPickerCalendar from "./DayPickerCalendar"
import TimeSelector from "./TimeSelector";
import SubmitButton from "./SubmitButton";
import AvailabilityGrid from "./AvailabilityGrid";

function App() {
    const [days, setDays] = useState([]);
    // useEffect(() => {
    //
    // }, [days]);

    const [startTime, setStartTime] = useState("8:00 AM");
    const [endTime, setEndTime] = useState("5:00 PM");

    function handleSubmit() {

    }

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
                <SubmitButton
                    onClick={handleSubmit}
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
