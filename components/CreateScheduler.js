import React, { useState } from "react";

import EventNameInput from "./EventNameInput";
import DayPickerCalendar from "./DayPickerCalendar"
import TimeSelector from "./TimeSelector";
import SubmitButton from "./SubmitButton";
import { ProgressBar, Toast, ToastContainer } from "react-bootstrap";

import cuid from "cuid";
import { parse } from "date-fns";

function CreateScheduler() {
    const [eventName, setEventName] = useState("");
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("8:00 AM");
    const [endTime, setEndTime] = useState("5:00 PM");
    const [loading, setLoading] = useState(false);

    /*
    ERROR HANDLING
     */
    const [errors, setErrors] = useState([])
    function validateInputs() {
        const newErrors = []
        if (eventName === "") {
            newErrors.push(<><b>Event name</b> cannot be blank</>)
        }
        if (eventName.length > 255) {
            newErrors.push(<><b>Event name</b> cannot be more than 255 characters</>)
        }
        if (days.length === 0) {
            newErrors.push(<>Select at least <b>1 day</b></>)
        }
        if (startTime === endTime && startTime === "12:00 AM") {

        } else {
            if (parse(startTime, "p", new Date()) >= parse(endTime, "p", new Date())) {
                newErrors.push(<><b>First time must be earlier.</b></>)
            }
        }

        setErrors(newErrors)

        return newErrors.length;
    }

    function removeError(errorJsx) {
        const newErrors = errors.slice();
        newErrors.splice(newErrors.findIndex(jsx => jsx === errorJsx), 1)
        setErrors(newErrors)
    }

    // create the scheduler and redirect user to the Availability Page
    function handleSubmit() {
        if (validateInputs() > 0) { return } // if there are any errors, do not continue

        setLoading(true);
        fetch('/api/create-scheduler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: createUniqueURL(),
                eventName: eventName,
                days: days,
                startTime: parse(startTime, "p", new Date()),
                endTime: parse(endTime, "p", new Date()),
            })
        }).then(
            response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
        }).catch((error) => {
            console.error('Error: ', error)
            setLoading(false);
        })
    }

    return (
        <div className="App">
            {loading && (
                <div id="loadingOverlay">
                    <div>
                        <h3 className="loadingText">Creating scheduler...</h3>
                        <ProgressBar animated now={65}/>
                    </div>
                </div>)
            }
            <ToastContainer position="top-end" className="p-3">
                {errors.map((errorJsx, idx) => {
                    return (
                        <Toast onClose={() => removeError(errorJsx)} key={idx}>
                            <Toast.Header>
                                <img className="rounded me-2" alt="" />
                                <strong className="me-auto">Error</strong>
                            </Toast.Header>
                            <Toast.Body>{errorJsx}</Toast.Body>
                        </Toast>
                        )
                })}
            </ToastContainer>

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
                    text="Create Scheduler"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}

function createUniqueURL() {
    return cuid.slug();
}

export default CreateScheduler;
