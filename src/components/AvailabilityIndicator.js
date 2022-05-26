import React from "react";
import moment from "moment";
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

class AvailabilityIndicator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <WeekCalendar
                    startTime={moment({h:8, m:0})}
                    endTime={moment({h:21, m:0})}
                    scaleUnit={30}
                    scaleFormat="H:mm"
                    dayFormat="ddd MMM DD"
                />
            </div>
        )
    }
}

export default AvailabilityIndicator;