import DayCell from "./DayCell";

function DayColumn(props) {
    return (
        <div className="dayColumn">
            {props.rows.map((interval, rowIdx) => {return (
                <DayCell
                    key={rowIdx}
                    rowIdx={rowIdx}
                    interval={interval}
                />
            )})}
        </div>
    );
}

export default DayColumn;