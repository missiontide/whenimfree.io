import React from "react";
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
                    scaleUnit={60}
                    scaleFormat="H:mm"
                    dayFormat="ddd MMM DD"
                />
            </div>
        )
    }
}

export default AvailabilityIndicator;