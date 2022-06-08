import {useState, useEffect} from "react";
import AvailabilityGrid from "./AvailabilityGrid";
import NameInput from "./NameInput";
import SubmitButton from "./SubmitButton";

function AvailabilityApp(props) {
    const [intervalsGrid, setIntervalsGrid] = useState([])
    const [name, setName] = useState([])

    function handleSubmit() {
        console.log(name)
        console.log(props.schedule_id)

        fetch('/api/insert-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scheduler_id: props.scheduler_id,
                name: name,
                selectedIntervals: JSON.stringify(intervalsGrid),
            })
        }).then(
            response => {
                // window.location.reload();
            }).catch((error) => {
            console.error('Error: ', error)
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                whenimfree.io
            </header>
            <AvailabilityGrid
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