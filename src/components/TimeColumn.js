import {add, format} from 'date-fns';

function TimeColumn(props) {
    // create an array of the date-times from timeInterval object
    const timesToDisplay = props.timeIntervals.map((timeInterval) => timeInterval.time)

    // add the last hour
    const finalTime = add(new Date(timesToDisplay.at(-1)), {minutes: 15})
    timesToDisplay.push(finalTime)

    return (
        <div className="timeColumn disable-select">
            <div className="spacer"></div>
            {timesToDisplay.map((time, idx) =>
                <div className="timeCell" key={idx}>
                    {idx % 4 === 0 && format(time, "p")}
                </div>)
            }
        </div>
    );
}

export default TimeColumn;