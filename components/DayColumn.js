import DayCell from "./DayCell";
import { format } from 'date-fns';

function DayColumn(props) {
    const date = format(props.timeIntervals[0].time, "MMM d")
    const day = format(props.timeIntervals[0].time, "eee")

    let className = "dayColumn disable-select"
    if (props.nextDayIsAdjacent) {className += " nextDayIsAdjacent"}

    return (
        <div className={className}>
            <div className="date">
                {date}
                <div className="day">{day}</div>
            </div>
            {props.timeIntervals.map((interval, rowIdx) => {return (
                <DayCell
                    key={rowIdx}
                    rowIdx={rowIdx}
                    colIdx={props.colIdx}
                    interval={interval}
                    maxAvailableCount={props.maxAvailableCount}
                    onMouseDown={props.onMouseDown}
                    onMouseOver={props.onMouseOver}
                    onMouseOut={props.onMouseOut}
                    onTouchStart={props.onTouchStart}
                    onTouchMove={props.onTouchMove}
                    onTouchEnd={props.onTouchEnd}
                />
            )})}
        </div>
    );
}

export default DayColumn;