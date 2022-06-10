import React, { useState, useEffect } from "react";
import AvailabilityGrid from "./AvailabilityGrid";
import dynamic from "next/dynamic"
const TimezoneSelect = dynamic(import('react-timezone-select'), {ssr: false}) // workaround for next.js hydration error
import NameInput from "./NameInput";
import SubmitButton from "./SubmitButton";
import {ProgressBar, Toast, ToastContainer, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import {IoIosCopy} from "react-icons/io"

function AvailabilityApp(props) {
    const [intervalsGrid, setIntervalsGrid] = useState([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [tooltipText, setTooltipText] = useState("Copy Link")

    /*
    ERROR HANDLING
    */
    const [errors, setErrors] = useState([])
    function validateInputs() {
        const newErrors = []

        if (name === "") {
            newErrors.push(<><b>Name</b> cannot be blank</>)
        }
        if (name.length > 255) {
            newErrors.push(<><b>Name</b> cannot be more than 255 characters</>)
        }
        if (noIntervalSelected()) {
            newErrors.push(<>Must highlight <b>at least one timeslot</b>.</>)
        }

        setErrors(newErrors)

        return newErrors.length;
    }

    function noIntervalSelected() {
        for (let i = 0; i < intervalsGrid.length; i++) {
            for (let j = 0; j < intervalsGrid[0].length; j++) {
                if (intervalsGrid[i][j].selected === true){
                    return false;
                }
            }
        }

        return true;
    }

    function removeError(errorJsx) {
        const newErrors = errors.slice();
        newErrors.splice(newErrors.findIndex(jsx => jsx === errorJsx), 1)
        setErrors(newErrors)
    }

    function handleSubmit() {
        if (validateInputs() > 0) { return }

        let simplifiedIntervalsGrid = intervalsGrid.slice()
        simplifiedIntervalsGrid.forEach((col) => {
            col.forEach((interval) => {
                delete interval.namesAvailable;
                delete interval.namesUnavailable;
                delete interval.mouseoverHighlightAction;
            })
        })

        setLoading(true);
        fetch('/api/insert-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scheduler_id: props.scheduler_id,
                name: name,
                selectedIntervals: JSON.stringify(simplifiedIntervalsGrid),
            })
        }).then(response => {
            if (response.status === 201) {
                window.location.reload();
            }
        }).catch((error) => {
            setLoading(false);
            console.error('Error: ', error)
        })
    }

    // Handles size change of Tooltip when text changes
    // See: https://react-bootstrap.github.io/components/overlays/#updating-position-dynamically
    const UpdatingTooltip = React.forwardRef(
        ({ tooltip, children, show: _, ...props }, ref) => {
            return (
                <Tooltip ref={ref} {...props}>
                    {children}
                </Tooltip>
            );
        },
    );

    return (
        <div className="App">
            {loading && (
                <div id="loadingOverlay">
                    <div>
                        <h3 className="loadingText">Adding your availability...</h3>
                        <ProgressBar animated now={65}/>
                    </div>
                </div>
            )}
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
            <div className="availabilityTimezoneDiv">
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                />
            </div>
            <h3>
                <b>{props.eventName}</b>&nbsp;&nbsp;
                <>
                    <OverlayTrigger
                        placement="top"
                        trigger={['hover', 'focus']}
                        overlay={(
                            <UpdatingTooltip >
                                {tooltipText}
                            </UpdatingTooltip>
                        )}>
                        <Button
                            variant="outline-dark"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setTooltipText("Copied!");
                            }}
                            onMouseEnter={() => setTooltipText("Copy Link")}>
                            <IoIosCopy />
                        </Button>
                    </OverlayTrigger>
                </>
            </h3>
            <AvailabilityGrid
                availabilities={props.availabilities}
                intervalsGrid={intervalsGrid}
                setIntervalsGrid={setIntervalsGrid}
                selectedDays={props.selectedDays}
                startTime={props.startTime}
                endTime={props.endTime}
                selectedTimezone={selectedTimezone}
            />
            <NameInput
                setName={setName}
            />
            <SubmitButton
                onClick={handleSubmit}
                text="Submit Availability"
            />
        </div>
    )
}

export default AvailabilityApp;