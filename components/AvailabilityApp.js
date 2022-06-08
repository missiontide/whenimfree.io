import {useState} from "react";
import AvailabilityGrid from "./AvailabilityGrid";
import NameInput from "./NameInput";
import SubmitButton from "./SubmitButton";
import { ProgressBar } from "react-bootstrap";

function AvailabilityApp(props) {
    const [intervalsGrid, setIntervalsGrid] = useState([])
    const [name, setName] = useState([])
    const [loading, setLoading] = useState(false);

    function handleSubmit() {

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
            <h3>
                <b>{props.eventName}</b>
            </h3>
            <AvailabilityGrid
                availabilities={props.availabilities}
                intervalsGrid={intervalsGrid}
                setIntervalsGrid={setIntervalsGrid}
                selectedDays={props.selectedDays}
                startTime={props.startTime}
                endTime={props.endTime}
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