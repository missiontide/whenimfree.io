import DayCell from "./DayCell";
import { format } from 'date-fns';

function DayColumn(props) {
    const date = format(props.timeIntervals[0].time, "MMM d")
    const day = format(props.timeIntervals[0].time, "eee")

    return (
        <div className="dayColumn disable-select">
            <div className="date">
                {date}
                <div className="day">{day}</div>
            </div>
            {props.timeIntervals.map((interval, rowIdx) => {return (
                <DayCell
                    key={rowIdx}
                    rowIdx={rowIdx}
                    interval={interval}
                    onMouseDown={props.onMouseDown}
                    onMouseOver={props.onMouseOver}
                />
            )})}
        </div>
    );
}

export default DayColumn;