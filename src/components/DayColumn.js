import DayCell from "./DayCell";

function DayColumn(props) {
    return (
        <div className="dayColumn">
            {props.rows.map((interval, rowIdx) => {return (
                <DayCell
                    key={rowIdx}
                />
            )})}
        </div>
    );
}

export default DayColumn;