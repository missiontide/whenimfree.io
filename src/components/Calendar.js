import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
        }
    }
    render () {
        return (
            <DatePicker
                inline
                monthsShown={2}
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        );
    }

    handleChange = (startDate) => {
        this.setState({
            startDate,
        });
    };
}

export default Calendar;