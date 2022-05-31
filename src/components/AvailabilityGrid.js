import React, {useState, useEffect, useRef} from "react";
import { parse, add, isEqual } from 'date-fns';
import DayColumn from "./DayColumn";

import '../styles/AvailabilityGrid.css'
import TimeColumn from "./TimeColumn";

/*
interval object {
    time: time of interval
    selected: bool
    coldIdx: index of day columns
    rowIdx: index of interval
    liveHighlight: "selecting" || "removing" || null
}
 */

function AvailabilityGrid(props) {
    const selectedDays = props.selectedDays;
    const startTime = () => {return parse(props.startTime, "p", new Date())}
    const endTime = () => {return parse(props.endTime, "p", new Date())}
    const [intervalsGrid, setIntervalsGrid] = useState([])

    // initializing intervals grid
    useEffect(() => {
        const newIntervalsGrid = [];
        selectedDays.sort((a,b) => {return new Date(a) - new Date(b)}); // sort the days

        // create a column for each selected day
        selectedDays.forEach((datetime, colIdx) => {
            const newDayColumn = [];

            // calculating start & end datetime: start and end is the selected day + start time and end time respectively
            let startDatetime = add(new Date(datetime.getTime()), {hours: startTime().getHours()})
            let endTimeHours = endTime().getHours();
            let endDatetime = add(new Date(datetime.getTime()), {hours: endTimeHours === 0 ? 24 : endTimeHours})

            let rowIdx = 0;
            // add an interval for every 15 minutes from start time to end time
            while (!isEqual(startDatetime, endDatetime)) {
                // each row is a time intervals in the day
                newDayColumn.push({
                    time: startDatetime.getTime(),
                    selected: false,
                    colIdx: colIdx,
                    rowIdx: rowIdx,
                    liveHighlight: null,
                })
                startDatetime = add(startDatetime, {minutes: 15})
                rowIdx++;
            }

            newIntervalsGrid.push(newDayColumn)
        })

        setIntervalsGrid(newIntervalsGrid)
    }, [selectedDays])


    const [selecting, setSelecting] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [origin, setOrigin] = useState({colIdx: undefined, rowIdx: undefined})

    function handleMouseDown(selectedInterval) {
        const newIntervalsGrid = intervalsGrid.slice();
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
        setIntervalsGrid(newIntervalsGrid)
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
            setToHere({colIdx: selectedInterval.colIdx, rowIdx: selectedInterval.rowIdx});
        }
    }

    function applyMouseOverHighlights() {
        const newIntervalsGrid = intervalsGrid.slice();
        // select or de-select all cols and rows between origin and this interval
        for (let i = 0; i < intervalsGrid.length; i++) {
            for (let j = 0; j < intervalsGrid[0].length; j++) {
                if (Math.min(toHere.colIdx, origin.colIdx) <= i // within the origin -> toHere selection
                        && i <= Math.max(toHere.colIdx, origin.colIdx)
                        && Math.min(toHere.rowIdx, origin.rowIdx) <= j
                        && j <= Math.max(toHere.rowIdx, origin.rowIdx)
                ){
                    if (selecting) newIntervalsGrid[i][j].liveHighlight = "selecting";
                    if (removing) newIntervalsGrid[i][j].liveHighlight = "removing";
                } else {
                    newIntervalsGrid[i][j].liveHighlight = null;
                }

            }
        }

        setIntervalsGrid(newIntervalsGrid)
    }

    function handleMouseUp() {
        saveSelectionState();

        // cleanup
        setSelecting(false)
        setRemoving(false)
        setToHere({colIdx: undefined, rowIdx: undefined});
        document.removeEventListener("mouseup", handleMouseUp)
    }

    // iterate through intervals and set selected based on liveHighlight status
    // then sets all liveHighlight to null
    function saveSelectionState() {
        const newIntervalsGrid = intervalsGrid.slice();

        for (let i = 0; i < newIntervalsGrid.length; i++) {
            for (let j = 0; j < newIntervalsGrid[0].length; j++) {
                let interval = newIntervalsGrid[i][j];
                if (interval.liveHighlight === "selecting") interval.selected = true;
                if (interval.liveHighlight === "removing") interval.selected = false;
                interval.liveHighlight = null;
            }
        }

        setIntervalsGrid(newIntervalsGrid)
    }

    return (
        <div className="availabilityGrid">
            {intervalsGrid.length > 0 &&
                <TimeColumn
                    timeIntervals={intervalsGrid[0]}
                />
            }

            {intervalsGrid.map((col, colIdx) => { return (
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