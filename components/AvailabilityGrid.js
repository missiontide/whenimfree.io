import React, {useState, useEffect} from "react";
import { add, isEqual } from 'date-fns';
import DayColumn from "./DayColumn";
import TimeColumn from "./TimeColumn";

/*
interval object {
    time: time of interval
    selected: bool
    coldIdx: index of day columns
    rowIdx: index of interval
    mouseoverHighlightAction: "selecting" || "removing" || null
}
 */

function AvailabilityGrid(props) {
    const selectedDays = props.selectedDays;
    const startTime = new Date(props.startTime);
    const endTime = new Date(props.endTime);

    // initializing intervals grid
    useEffect(() => {
        const newIntervalsGrid = [];
        selectedDays.sort((a,b) => {return new Date(a) - new Date(b)}); // sort the days

        // create a column for each selected day
        selectedDays.forEach((datetime, colIdx) => {
            datetime = new Date(datetime);
            let date = new Date(datetime.toDateString())// remove time component
            const newDayColumn = [];

            // calculating start & end datetime: start and end is the selected day + start time and end time respectively
            let startDatetime = add(new Date(date.getTime()), {hours: startTime.getHours()})
            let endTimeHours = endTime.getHours();
            let endDatetime = add(new Date(date.getTime()), {hours: endTimeHours === 0 ? 24 : endTimeHours})

            let rowIdx = 0;
            // add an interval for every 15 minutes from start time to end time
            while (!isEqual(startDatetime, endDatetime)) {
                // each row is a time intervals in the day
                let rowInterval = {
                    time: startDatetime.getTime(),
                    selected: false,
                    colIdx: colIdx,
                    rowIdx: rowIdx,
                    namesAvailable: [],
                    namesUnavailable: [],
                    mouseoverHighlightAction: null, // used for determining whether to show as selected/unselected when highlighting
                };
                newDayColumn.push(rowInterval);
                startDatetime = add(startDatetime, {minutes: 15}) // increment by 15 minutes
                rowIdx++;
            }

            newIntervalsGrid.push(newDayColumn)
        })

        let availabilities = [
            {
                name:"fakePatrick",
                selectedIntervals: [
                    {
                        time: new Date(),
                        selected: true,
                        colIdx: 2,
                        rowIdx: 2,
                    },
                    {
                        time: new Date(),
                        selected: true,
                        colIdx: 3,
                        rowIdx: 4,
                    }
                ]
            },
            {
                name:"billy",
                selectedIntervals: [
                    {
                        time: new Date(),
                        selected: true,
                        colIdx: 0,
                        rowIdx: 10,
                    },
                ]
            }
        ]

        // add all the selected intervals by other users to respective col, row interval
        props.availabilities.forEach((availability) => {
            let name = availability.name;
            availability.selectedIntervals.forEach((col, colIdx) => {
                col.forEach((interval, rowIdx) => {
                    if (interval.selected === true) {
                        newIntervalsGrid[colIdx][rowIdx].namesAvailable.push(name)
                    } else {
                        newIntervalsGrid[colIdx][rowIdx].namesUnavailable.push(name)
                    }
                })
            })
        })

        props.setIntervalsGrid(newIntervalsGrid)
    }, [])


    const [selecting, setSelecting] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [origin, setOrigin] = useState({colIdx: undefined, rowIdx: undefined})

    /*
    MOUSE DOWN: set origin and whether user is selecting or removing
    */
    function handleMouseDown(selectedInterval) {
        const newIntervalsGrid = props.intervalsGrid.slice();
        const {colIdx, rowIdx} = selectedInterval
        const interval = newIntervalsGrid[colIdx][rowIdx]

        if (interval.selected === false) {
            interval.selected = true;
            setSelecting(true)
        } else {
            interval.selected = false;
            setRemoving(true)
        }
        setOrigin({
            colIdx: colIdx,
            rowIdx: rowIdx,
        })
        document.addEventListener("mouseup", handleMouseUp)
        props.setIntervalsGrid(newIntervalsGrid)
    }

    /*
    MOUSE OVER: Highlight the cells within origin -> toHere selection
     */
    const [toHere, setToHere] = useState({colIdx: undefined, rowIdx: undefined})
    useEffect(() => {
        if (toHere['colIdx'] === undefined) return;

        applyMouseOverHighlights()
    }, [toHere])

    function handleMouseOver(selectedInterval) {
        if (selecting || removing) {
            // if highlighting, handle highlights
            setToHere({colIdx: selectedInterval.colIdx, rowIdx: selectedInterval.rowIdx});
        } else {
            // otherwise, display who is available

        }
    }

    function applyMouseOverHighlights() {
        const newIntervalsGrid = props.intervalsGrid.slice();
        // select or de-select all cols and rows between origin and this interval
        for (let i = 0; i < props.intervalsGrid.length; i++) {
            for (let j = 0; j < props.intervalsGrid[0].length; j++) {
                if (Math.min(toHere.colIdx, origin.colIdx) <= i // within the origin -> toHere selection
                        && i <= Math.max(toHere.colIdx, origin.colIdx)
                        && Math.min(toHere.rowIdx, origin.rowIdx) <= j
                        && j <= Math.max(toHere.rowIdx, origin.rowIdx)
                ){
                    if (selecting) newIntervalsGrid[i][j].mouseoverHighlightAction = "selecting";
                    if (removing) newIntervalsGrid[i][j].mouseoverHighlightAction = "removing";
                } else {
                    newIntervalsGrid[i][j].mouseoverHighlightAction = null;
                }

            }
        }

        props.setIntervalsGrid(newIntervalsGrid)
    }

    function handleMouseUp() {
        saveSelectionState();

        // cleanup
        setSelecting(false)
        setRemoving(false)
        setToHere({colIdx: undefined, rowIdx: undefined});
        document.removeEventListener("mouseup", handleMouseUp)
    }

    // iterate through intervals and set selected based on mouseoverHighlightAction status
    // then sets all mouseoverHighlightAction to null
    function saveSelectionState() {
        const newIntervalsGrid = props.intervalsGrid.slice();

        for (let i = 0; i < newIntervalsGrid.length; i++) {
            for (let j = 0; j < newIntervalsGrid[0].length; j++) {
                let interval = newIntervalsGrid[i][j];
                if (interval.mouseoverHighlightAction === "selecting") interval.selected = true;
                if (interval.mouseoverHighlightAction === "removing") interval.selected = false;
                interval.mouseoverHighlightAction = null;
            }
        }

        props.setIntervalsGrid(newIntervalsGrid)
    }

    return (
        <div className="availabilityGrid">
            {props.intervalsGrid.length > 0 &&
                <TimeColumn
                    timeIntervals={props.intervalsGrid[0]}
                />
            }

            {props.intervalsGrid.map((col, colIdx) => { return (
                <DayColumn
                    key={colIdx}
                    timeIntervals={col}
                    onMouseDown={handleMouseDown}
                    onMouseOver={handleMouseOver}
                />
            )})}
        </div>
    )
}

export default AvailabilityGrid;