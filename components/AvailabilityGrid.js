import React, {useState, useEffect} from "react";
import { add, isEqual, differenceInHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import DayColumn from "./DayColumn";
import TimeColumn from "./TimeColumn";
import AvailabilityList from "./AvailabilityList";
import ClearButton from "./ClearButton";
import { Card, Form } from "react-bootstrap"

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
    const selectedTimezone = props.selectedTimezone;
    const intervalsGrid = props.intervalsGrid;
    const setIntervalsGrid = props.setIntervalsGrid;
    const [maxAvailableCount, setMaxAvailableCount] = useState(0)
    const [touchToView, setTouchToView] = useState(false)

    // initializing intervals grid
    useEffect(() => {
        const newIntervalsGrid = [];
        selectedDays.sort((a,b) => {return new Date(a) - new Date(b)}); // sort the days

        // create a column for each selected day
        selectedDays.forEach((startDatetimeWithTimezone, colIdx) => {

            const newDayColumn = [];

            // apply selected timezone to our utc startDatetime
            let intervalDatetime = utcToZonedTime(new Date(startDatetimeWithTimezone), selectedTimezone.value)

            // calculating end datetime: selected startDatetime + difference between start and end time
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
    }, [props.selectedTimezone])


    const [selecting, setSelecting] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [origin, setOrigin] = useState({colIdx: undefined, rowIdx: undefined})

    /*
    MOUSE DOWN: set origin and whether user is selecting or removing
    */
    function handleMouseDown(selectedInterval) {
        if (props.isMobile) { return }
        initializeHighlighting(selectedInterval)
        document.addEventListener("mouseup", handleMouseUp)
    }

    function initializeHighlighting(selectedInterval) {
        const newIntervalsGrid = intervalsGrid.slice();
        const {colIdx, rowIdx} = selectedInterval

        if (newIntervalsGrid[colIdx][rowIdx].selected === false) {
            newIntervalsGrid[colIdx][rowIdx].selected = true;
            setSelecting(true)
        } else {
            newIntervalsGrid[colIdx][rowIdx].selected = false;
            setRemoving(true)
        }
        setOrigin({
            colIdx: colIdx,
            rowIdx: rowIdx,
        })
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
        if (props.isMobile) { return } // prevent a weird touch up = mouseover trigger
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

    /*
    TOUCH SUPPORT
    */
    function handleTouchStart(selectedInterval){
        if (touchToView) {
            // viewing availabilities
            setShowList(true)
            setNamesAvailable(selectedInterval.namesAvailable)
            setNamesUnavailable(selectedInterval.namesUnavailable)
            setIntervalDatetime(selectedInterval.time)
        }  else {
            // selecting & highlighting intervals
            initializeHighlighting(selectedInterval)
        }
    }

    function handleTouchMove(e) {
        if (e.touches.length === 1) {
            // must use elementFromPoint to get actual touch target
            let touch = e.touches[0];
            let target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target === null) return true;

            let colIdx = target.getAttribute('colidx');
            let rowIdx = target.getAttribute('rowidx');
            if (colIdx === null || rowIdx === null) return true;

            const selectedInterval = intervalsGrid[colIdx][rowIdx]
            if (touchToView) {
                // viewing availabilities
                setNamesAvailable(selectedInterval.namesAvailable)
                setNamesUnavailable(selectedInterval.namesUnavailable)
                setIntervalDatetime(selectedInterval.time)
            } else {
                // selecting & highlighting intervals to here
                setToHere({colIdx: selectedInterval.colIdx, rowIdx: selectedInterval.rowIdx});
            }
        } else {
            return true;
        }
    }

    function handleTouchEnd() {
        if (touchToView) {
            setShowList(false)
        } else {
            saveSelectionState();

            // cleanup
            setSelecting(false)
            setRemoving(false)
            setToHere({colIdx: undefined, rowIdx: undefined});
        }
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

    function nextDayIsAdjacent(currentIdx) {
        // only returns true if the difference in hours between this and next column interval is 24 hours
        if (currentIdx === intervalsGrid.length - 1) { return false }
        return 24 === differenceInHours(intervalsGrid[currentIdx + 1][0].time, intervalsGrid[currentIdx][0].time)
    }

    // Content of availability list: showing availabilities or (mobile-only) toggle selecting -> viewing
    let availabilityListCardContent = <></>
    if (showList) { // if hovering or touching show the availability list
        availabilityListCardContent = (
            <AvailabilityList
                totalNames={props.availabilities.length}
                intervalDatetime={intervalDatetime}
                namesAvailable={namesAvailable}
                namesUnavailable={namesUnavailable}
            />
        )
    } else if (props.isMobile) { // if mobile, show a switch to turn on touch viewing
        availabilityListCardContent = (
            <>
                <span className="switchCaption">
                    {touchToView ? "Touch a time to see who's free" : "Touch a time to select when you're free"}
                </span>

                <div className="availabilitySwitch">

                    <span>Add Yours</span>
                    &nbsp;
                    <Form.Switch
                        checked={touchToView}
                        onChange={()=>{setTouchToView(!touchToView)}}
                    />
                    &nbsp;
                    <span>See Others&apos;</span>
                </div>
            </>
        )
    } else { // not mobile and not mouse over-ing, display instruction
        availabilityListCardContent = <p className="caption">Mouseover a time to see others&apos; availability.</p>
    }

    return (
        <>
            <div className="availabilityGrid">
                {maxAvailableCount > 0 && (
                    <div className="availabilityListSpace">
                        <Card className="availabilityListCard">
                            {availabilityListCardContent}
                        </Card>
                    </div>
                )}
                <div className="gridSpace">
                {intervalsGrid.length > 0 &&
                    <TimeColumn
                        timeIntervals={intervalsGrid[0]}
                    />
                }

                {intervalsGrid.map((col, colIdx) => { return (
                    <DayColumn
                        key={colIdx}
                        colIdx={colIdx}
                        nextDayIsAdjacent={nextDayIsAdjacent(colIdx)}
                        timeIntervals={col}
                        maxAvailableCount={maxAvailableCount}
                        onMouseDown={handleMouseDown}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                )})}
                </div>
                <div className="clearSelectionDiv">
                    {somethingSelected ?
                        <ClearButton
                            text="Clear Selection"
                            onClick={clearSelection}
                        /> : <p>{!props.isMobile && "Click and drag to indicate your availability."}</p>
                    }
                </div>
            </div>

        </>
    )
}

export default AvailabilityGrid;