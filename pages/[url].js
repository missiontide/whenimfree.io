import styles from '../styles/Home.module.css'
import AvailabilityApp from "../components/AvailabilityApp";
import dbConfig from "../db/knexfile";
import logo from "../public/logo.png";
import Image from "next/image";
import Link from 'next/link'
import FourOhFour from "./404"
import Head from "next/head";

function Page({
                  id: id,
                  url: url,
                  eventName: eventName,
                  days: days,
                  startTime: startTime,
                  endTime: endTime,
                  availabilities: availabilities,
}) {
    if (id === "error") { return FourOhFour(); }

    return (
        <>
            <div className={styles.container}>
                <p className="signature">
                    made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
                </p>
                <p>
                    <Link href="/">
                        <a><Image src={logo} className="App-logo" alt="logo" /></a>
                    </Link>
                </p>
                <AvailabilityApp
                    scheduler_id={id}
                    eventName={eventName}
                    selectedDays={JSON.parse(days)}
                    startTime={startTime}
                    endTime={endTime}
                    availabilities={JSON.parse(availabilities)}
                />
            </div>
            <Head>
                <title>{eventName + "| whenimfree.io"}</title>
                <meta property="og:url" content={"https://whenimfree.io/" + url} />
                <meta property="og:title" content={"See everyone's availability for " + eventName} />
                <meta property="og:description" content="whenimfree.io: Quickly find the best time for an event with friends!" />
                <meta property="og:image" content="https://whenimfree.io/social-media-card.png" />
                <meta property="og:type" content="website" />
            </Head>
        </>
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

    // invalid URL given
    if (scheduler.length === 0) {
        db.destroy();
        return { props: { id: "error"} }
    }

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