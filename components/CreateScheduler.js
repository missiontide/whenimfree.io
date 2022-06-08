import React, { useState } from "react";

import EventNameInput from "./EventNameInput";
import DayPickerCalendar from "./DayPickerCalendar"
import TimeSelector from "./TimeSelector";
import SubmitButton from "./SubmitButton";
import AvailabilityGrid from "./AvailabilityGrid";
import { parse } from "date-fns";

function CreateScheduler() {
    const [eventName, setEventName] = useState([]);
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("8:00 AM");
    const [endTime, setEndTime] = useState("5:00 PM");

    function handleSubmit() {
        fetch('/api/create-scheduler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: 'asdfjkl',
                eventName: eventName,
                days: days,
                startTime: parse(startTime, "p", new Date()),
                endTime: parse(endTime, "p", new Date()),
            })
        }).then(
            response => response.json()
        ).then(data => {
            console.log(data)
        }).catch((error) => {
            console.error('Error: ', error)
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                whenimfree.io
            </header>
            <div>
                <EventNameInput
                    eventName={eventName}
                    setEventName={setEventName}
                />
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
                {/*<AvailabilityGrid*/}
                {/*    selectedDays={days}*/}
                {/*    startTime={startTime}*/}
                {/*    endTime={endTime}*/}
                {/*/>*/}
            </div>
        </div>
    );
}

export default CreateScheduler;
