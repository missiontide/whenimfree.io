import styles from '../styles/Home.module.css'
import AvailabilityApp from "../components/AvailabilityApp";
import dbConfig from "../db/knexfile";

function Page({
                  id: id,
                  url: url,
                  eventName: eventName,
                  days: days,
                  startTime: startTime,
                  endTime: endTime,
                  availabilities: availabilities,
}) {

    console.log(JSON.parse(availabilities))

    return (
        <div className={styles.container}>
            <AvailabilityApp
                scheduler_id={id}
                selectedDays={JSON.parse(days)}
                startTime={startTime}
                endTime={endTime}
                availabilities={JSON.parse(availabilities)}
            />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { url } = context.query;

    const db = require('knex')(dbConfig['development'])
    const scheduler = await db('scheduler')
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
    })

    const availabilities = await db('availability')
        .select({
            name: 'name',
            selectedIntervals: 'selectedIntervals',
        }).where({
            scheduler_id: scheduler[0]['id'],
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            db.destroy();
        })

    console.log(availabilities)
    return {
        props: {
            id: scheduler[0]['id'],
            url: scheduler[0]['url'],
            eventName: scheduler[0]['eventName'],
            days: JSON.stringify(scheduler[0]['days']),
            startTime: scheduler[0]['startTime'].toJSON(),
            endTime: scheduler[0]['endTime'].toJSON(),
            availabilities: JSON.stringify(availabilities),
        }
    }
}

export default Page