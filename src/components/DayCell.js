

function DayCell(props) {
    let className = "";
    // every 2nd and 4th cell is a thirty min or hour cell
    if (props.rowIdx % 4 === 0) className = "hour"
    else if ((props.rowIdx - 2) % 4 === 0) className = "thirty"

    if (props.interval['selected'] === true) {
        className += " selected"
    }

    return (
        <div
            className={`dayCell ${className}`}
            onMouseDown={() => props.onMouseDown(props.interval)}
            onMouseOver={() => props.onMouseOver(props.interval)}
        >
        </div>
    );
}

export default DayCell;