import React, { useState, useEffect } from "react";
import { parse, add, isEqual } from 'date-fns';
import DayColumn from "./DayColumn";

import '../styles/AvailabilityGrid.css'

function AvailabilityGrid(props) {
    const selectedDays = props.selectedDays;
    const startTime = () => {return parse(props.startTime, "p", new Date())}
    const endTime = () => {return parse(props.endTime, "p", new Date())}
    const [intervalsGrid, setIntervalsGrid] = useState([])

    
    useEffect(() => {
        const newIntervalsGrid = [];
        console.log(selectedDays)

        selectedDays.forEach((datetime) => {
            const newDayColumn = [];

            let startDatetime = add(new Date(datetime.getTime()), {hours: startTime().getHours()})
            let endDatetime = add(new Date(datetime.getTime()), {hours: endTime().getHours()})

            while (!isEqual(startDatetime, endDatetime)) {
                newDayColumn.push(startDatetime.getHours())
                startDatetime = add(startDatetime, {hours: 1})
            }

            newIntervalsGrid.push(newDayColumn)
        })

        setIntervalsGrid(newIntervalsGrid)
    }, [selectedDays])

    return (
        <div className="availabilityGrid">
            {intervalsGrid.map((col, colIdx) => { return (
                <DayColumn
                    key={colIdx}
                    rows={col}
                />
            )})}
        </div>
    )
}

export default AvailabilityGrid;