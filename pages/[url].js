import styles from '../styles/Home.module.css'
import AvailabilityGrid from "../components/AvailabilityGrid";
import dbConfig from "../db/knexfile";

function Page({
                  url: url,
                  eventName: eventName,
                  days: days,
                  startTime: startTime,
                  endTime: endTime,
}) {
    console.log(url)
    console.log(eventName)
    console.log(days)
    console.log(new Date(startTime))
    console.log(new Date(endTime))

    return (
        <div className={styles.container}>
            <AvailabilityGrid
                selectedDays={JSON.parse(days)}
                startTime={startTime}
                endTime={endTime}
            />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { url } = context.query;

    const db = require('knex')(dbConfig['development'])
    const data = await db('scheduler')
        .select({
            id: 'id',
            url: 'url',
            eventName: 'eventName',
            days: 'days',
            startTime: 'startTime',
            endTime: 'endTime',
        }).where({
        url: url,
    }).catch((err) => {
            console.log(err)
    }).finally(() => {
        db.destroy();
    })

    console.log(data)
    return {
        props: {
            url: data[0]['url'],
            eventName: data[0]['eventName'],
            days: JSON.stringify(data[0]['days']),
            startTime: data[0]['startTime'].toJSON(),
            endTime: data[0]['endTime'].toJSON(),
        }
    }
}

export default Page