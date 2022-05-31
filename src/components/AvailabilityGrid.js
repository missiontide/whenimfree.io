import React, { useState, useEffect } from "react";
import { parse, add, isEqual } from 'date-fns';
import DayColumn from "./DayColumn";

import '../styles/AvailabilityGrid.css'
import TimeColumn from "./TimeColumn";

function AvailabilityGrid(props) {
    const selectedDays = props.selectedDays;
    const startTime = () => {return parse(props.startTime, "p", new Date())}
    const endTime = () => {return parse(props.endTime, "p", new Date())}
    const [intervalsGrid, setIntervalsGrid] = useState([])

    // initializing intervals grid
    useEffect(() => {
        const newIntervalsGrid = [];
        selectedDays.sort((a,b) => {return new Date(a) - new Date(b)}); // sort the days

        // each column is a selected day
        selectedDays.forEach((datetime) => {
            const newDayColumn = [];

            // start and end is the selected day + start time and end time respectively
            let startDatetime = add(new Date(datetime.getTime()), {hours: startTime().getHours()})
            let endTimeHours = endTime().getHours();
            let endDatetime = add(new Date(datetime.getTime()), {hours: endTimeHours === 0 ? 24 : endTimeHours})


            while (!isEqual(startDatetime, endDatetime)) {
                // each row is a time intervals in the day
                newDayColumn.push({
                    time: startDatetime.getTime(),
                    selected: false,
                })
                startDatetime = add(startDatetime, {minutes: 15})
            }

            newIntervalsGrid.push(newDayColumn)
        })

        setIntervalsGrid(newIntervalsGrid)
    }, [selectedDays])

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
                />
            )})}
        </div>
    )
}

export default AvailabilityGrid;