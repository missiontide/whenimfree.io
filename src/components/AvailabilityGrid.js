import React, { useState, useEffect } from "react";
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

    function handleMouseUp() {
        console.log("MOUSEUP!!!")
        setSelecting(false)
        setRemoving(false)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    function handleMouseOver(selectedInterval) {
        // console.log(`${origin.colIdx}, ${origin.rowIdx}`)
        if (selecting || removing) {
            const newIntervalsGrid = intervalsGrid.slice();
            const {colIdx, rowIdx} = selectedInterval

            // select or de-select all cols and rows between origin and this interval
            for (let i = Math.min(colIdx, origin.colIdx); i <= Math.max(colIdx, origin.colIdx); i++) {
                for (let j = Math.min(rowIdx, origin.rowIdx); j <= Math.max(rowIdx, origin.rowIdx); j++) {
                    // console.log(`${i}, ${j}`)
                    if (selecting) newIntervalsGrid[i][j].selected = true;
                    if (removing) newIntervalsGrid[i][j].selected = false;
                }
            }

            setIntervalsGrid(newIntervalsGrid)
        }
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