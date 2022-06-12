import {format} from "date-fns";

function AvailabilityList(props) {
    return (
        <div className="availabilityList">
            <span className="listInfo">
                <span className="listCount"><b>{props.namesAvailable.length}/{props.totalNames}</b></span><br/>
                <span className="availabilityDate">{format(props.intervalDatetime, "EEE, MMM d")}</span><br/>
                <span className="availabilityTime">{format(props.intervalDatetime, "h:mmaaa")}</span>
            </span>
            <div className="listNames">
                <span>
                    <b>Available:</b> {props.namesAvailable.join(", ")}
                        <br/>
                    <b>Unavailable:</b> {props.namesUnavailable.join(", ")}
                </span>
            </div>
        </div>
    );
}

export default AvailabilityList;