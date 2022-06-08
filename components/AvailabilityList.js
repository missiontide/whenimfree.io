import {format} from "date-fns";

function AvailabilityList(props) {
    // place both available and unavailable
    let tableRowNames = []
    const namesAvailable = props.namesAvailable.slice()
    const namesUnavailable = props.namesUnavailable.slice()

    while (namesAvailable.length + namesUnavailable.length > 0) {
        tableRowNames.push([
            namesAvailable.length > 0 ? namesAvailable.shift() : "",
            namesUnavailable.length > 0 ? namesUnavailable.shift() : "",
        ])
    }

    return (
        <div className="availabilityList">
            <h4>{props.namesAvailable.length}/{props.totalNames}</h4>
            <h5>{format(props.intervalDatetime, "EEE, MMM d yyyy, h:mmaaa")}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Available</th>
                        <th>Unavailable</th>
                    </tr>
                </thead>
                <tbody>
                {tableRowNames.map((col,idx) => {
                    return (
                        <tr key={idx}>
                            <td>{col[0]}</td>
                            <td>{col[1]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AvailabilityList;