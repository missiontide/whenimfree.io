import { DayPicker } from 'react-day-picker';
import { add } from 'date-fns';
import 'react-day-picker/dist/style.css';

function DayPickerCalendar(props) {
    return (
        <div className="dayPicker">
            <DayPicker
                showOutsideDays
                mode="multiple"
                fromDate={new Date()}
                toDate={add(new Date(), {months: 12})}
                max={35}
                selected={props.days}
                onSelect={props.setDays}
            />
            <p className="dayPickerFooter">
                {props.days && props.days.length > 0 &&
                    <>{props.days.length} day{props.days.length > 1 && "s"} selected.</>
                }
            </p>
        </div>
    );
}

export default DayPickerCalendar;