

function DayCell(props) {
    let className = "";
    // every 2nd and 4th cell is a thirty min or hour cell
    if (props.rowIdx % 4 === 0) className = "hour"
    else if ((props.rowIdx - 2) % 4 === 0) className = "thirty"

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

    let divStyle = {}
    let namesAvailableCount = props.interval['namesAvailable'].length;
    if (namesAvailableCount > 0) {
        let totalNames = namesAvailableCount + props.interval['namesUnavailable'].length;
        let alpha = namesAvailableCount / totalNames;

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
        >
        </div>
    );
}

export default DayCell;