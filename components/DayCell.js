

function DayCell(props) {
    let className = "";
    // every 2nd and 4th cell is a thirty min or hour cell
    if (props.rowIdx % 4 === 0) className = "hour"
    else if ((props.rowIdx - 2) % 4 === 0) className = "thirty"

    // showing selected
    // and handling highlighting
    switch (props.interval['mouseoverHighlightAction']) {
        case "selecting":
            className += " selected"
            break;
        case "removing":
            break;
        default: // not being highlighted -- display the saved selected status
            if (props.interval['selected'] === true) {
                className += " selected"
            }
            break;
    }

    // intersecting availabilities background color
    let divStyle = {}
    let namesAvailableCount = props.interval['namesAvailable'] !== undefined ? props.interval['namesAvailable'].length : 0;
    if (namesAvailableCount > 0) {
        let alpha = namesAvailableCount / props.maxAvailableCount;
        divStyle = {
            background: `rgba(18, 18, 253, ${alpha})`
        }
    }

    return (
        <div
            style={divStyle}
            className={`dayCell ${className}`}
            onMouseDown={() => props.onMouseDown(props.interval)}
            onMouseOver={() => props.onMouseOver(props.interval)}
            onMouseOut={() => props.onMouseOut()}
        >
        </div>
    );
}

export default DayCell;