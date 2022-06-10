import React, {useState, useEffect} from "react";
import { add, isEqual, differenceInHours } from 'date-fns';
import DayColumn from "./DayColumn";
import TimeColumn from "./TimeColumn";
import AvailabilityList from "./AvailabilityList";
import ClearButton from "./ClearButton";

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
    const intervalsGrid = props.intervalsGrid;
    const setIntervalsGrid = props.setIntervalsGrid;
    const [maxAvailableCount, setMaxAvailableCount] = useState(0)

    // initializing intervals grid
    useEffect(() => {
        const newIntervalsGrid = [];
        selectedDays.sort((a,b) => {return new Date(a) - new Date(b)}); // sort the days

        // create a column for each selected day
        selectedDays.forEach((startDatetimeWithTimezone, colIdx) => {

            const newDayColumn = [];

            // calculating end datetime: selected startDatetime + difference between start and end time
            let intervalDatetime = new Date(startDatetimeWithTimezone);
            let hoursDifference = differenceInHours(endTime, startTime);
            let endDatetime = add(intervalDatetime, {hours: hoursDifference === 0 ? 24 : hoursDifference})

            let rowIdx = 0;
            // add an interval for every 15 minutes from start time to end time
            while (!isEqual(intervalDatetime, endDatetime)) {
                // each row is a time intervals in the day
                let rowInterval = {
                    time: intervalDatetime.getTime(),
                    selected: false,
                    colIdx: colIdx,
                    rowIdx: rowIdx,
                    namesAvailable: [],
                    namesUnavailable: [],
                    mouseoverHighlightAction: null, // used for determining whether to show as selected/unselected when highlighting
                };
                newDayColumn.push(rowInterval);
                intervalDatetime = add(intervalDatetime, {minutes: 15}) // increment by 15 minutes
                rowIdx++;
            }

            newIntervalsGrid.push(newDayColumn)
        })

        let max = 0;
        // Add loaded availabilities
        // add all the selected intervals by other users to respective col, row interval
        props.availabilities.forEach((availability) => {
            let name = availability.name;
            availability.selectedIntervals.forEach((col, colIdx) => {
                col.forEach((interval, rowIdx) => {
                    if (interval.selected === true) {
                        newIntervalsGrid[colIdx][rowIdx].namesAvailable.push(name)
                        if (newIntervalsGrid[colIdx][rowIdx].namesAvailable.length > max) {
                            max = newIntervalsGrid[colIdx][rowIdx].namesAvailable.length
                        }
                    } else {
                        newIntervalsGrid[colIdx][rowIdx].namesUnavailable.push(name)
                    }
                })
            })
        })
        setMaxAvailableCount(max); // this is amount of names on interval(s) w/ most intersecting availabilities

        setIntervalsGrid(newIntervalsGrid)
    }, [])


    const [selecting, setSelecting] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [origin, setOrigin] = useState({colIdx: undefined, rowIdx: undefined})

    /*
    MOUSE DOWN: set origin and whether user is selecting or removing
    */
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
                        if (selecting) newIntervalsGrid[i][j].mouseoverHighlightAction = "selecting";
                        if (removing) newIntervalsGrid[i][j].mouseoverHighlightAction = "removing";
                    } else {
                        newIntervalsGrid[i][j].mouseoverHighlightAction = null;
                    }
                }
            }
            setIntervalsGrid(newIntervalsGrid)
        }

        applyMouseOverHighlights()
    }, [toHere])

    const [showList, setShowList] = useState(false)
    const [namesAvailable, setNamesAvailable] = useState([])
    const [namesUnavailable, setNamesUnavailable] = useState([])
    const [intervalDatetime, setIntervalDatetime] = useState()
    function handleMouseOver(selectedInterval) {
        if (selecting || removing) {
            // if highlighting, handle highlights
            setToHere({colIdx: selectedInterval.colIdx, rowIdx: selectedInterval.rowIdx});
        } else {
            // otherwise, display who is available
            if (props.availabilities.length > 0) {
                setShowList(true)
                setNamesAvailable(selectedInterval.namesAvailable)
                setNamesUnavailable(selectedInterval.namesUnavailable)
                setIntervalDatetime(selectedInterval.time)
            }
        }
    }

    function handleMouseOut() {
        setShowList(false)
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
        const newIntervalsGrid = intervalsGrid.slice();

        let count = 0; // for setting somethingSelected
        for (let i = 0; i < newIntervalsGrid.length; i++) {
            for (let j = 0; j < newIntervalsGrid[0].length; j++) {
                let interval = newIntervalsGrid[i][j];
                if (interval.mouseoverHighlightAction === "selecting") interval.selected = true;
                if (interval.mouseoverHighlightAction === "removing") interval.selected = false;
                interval.mouseoverHighlightAction = null;
                if (interval.selected === true) count++;
            }
        }
        setSomethingSelected(count > 0)
        setIntervalsGrid(newIntervalsGrid)
    }

    const [somethingSelected, setSomethingSelected] = useState(false)
    function clearSelection() {
        const newIntervalsGrid = intervalsGrid.slice();

        for (let i = 0; i < newIntervalsGrid.length; i++) {
            for (let j = 0; j < newIntervalsGrid[0].length; j++) {
                newIntervalsGrid[i][j].selected = false;
            }
        }

        setIntervalsGrid(newIntervalsGrid)
        setSomethingSelected(false)
    }

    return (
        <>
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
                        maxAvailableCount={maxAvailableCount}
                        onMouseDown={handleMouseDown}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    />
                )})}
                {showList &&
                    <AvailabilityList
                        totalNames={props.availabilities.length}
                        intervalDatetime={intervalDatetime}
                        namesAvailable={namesAvailable}
                        namesUnavailable={namesUnavailable}
                    />
                }
            </div>
            <div className="badgeDiv">
                {somethingSelected &&
                    <ClearButton
                        text="Clear Selection"
                        onClick={clearSelection}
                    />
                }
            </div>
            <div className="caption">
                <p>Click and drag to indicate your availability.<br/>
                    Mouseover to see others&apos; availability.
                </p>
            </div>
        </>
    )
}

export default AvailabilityGrid;