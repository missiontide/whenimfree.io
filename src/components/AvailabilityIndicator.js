import React from "react";
import moment from "moment";
import WeekCalendar from './WeekCalendar/WeekCalendar';
import './WeekCalendar/style.css';

class AvailabilityIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUid: 0,
            selectedIntervals: [],
        }
    }

    handleEventRemove = (event) => {
        console.log("handleEventRemove")
        const {selectedIntervals} = this.state;
        const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals.splice(index, 1);
            this.setState({selectedIntervals});
        }

    }

    handleEventUpdate = (event) => {
        console.log("handleEventUpdate")
        const {selectedIntervals} = this.state;
        const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
        if (index > -1) {
            selectedIntervals[index] = event;
            this.setState({selectedIntervals});
        }
    }

    handleSelect = (newIntervals) => {
        console.log("handleSelect")
        const {lastUid, selectedIntervals} = this.state;
        const intervals = newIntervals.map( (interval, index) => {

            return {
                ...interval,
                uid: lastUid + index
            }
        });
        console.log(newIntervals)
        console.log(intervals)
        this.setState({
            selectedIntervals: selectedIntervals.concat(intervals),
            lastUid: lastUid + newIntervals.length
        })
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
                    selectedIntervals={this.state.selectedIntervals}
                    onIntervalSelect={this.handleSelect}
                    onIntervalUpdate={this.handleEventUpdate}
                    onIntervalRemove={this.handleEventRemove}
                    eventSpacing={0}
                    useModal={false}
                />
            </div>
        )
    }
}

export default AvailabilityIndicator;