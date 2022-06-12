import styles from '../styles/Home.module.css'
import CreateScheduler from '../components/CreateScheduler'
import logo from "../public/logo.png";
import Image from "next/image";
import Head from 'next/head'

export default function Home() {
  return (
      <>
          <div className={styles.container}>
              <p className="signature">
                  made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
              </p>
              <Image src={logo} className="App-logo" alt="logo" />
              <CreateScheduler />
          </div>
          <Head>
              <title>whenimfree.io</title>
              <meta property="og:url" content="https://whenimfree.io" />
              <meta property="og:title" content="whenimfree.io - Get availability fast!" />
              <meta property="og:description" content="Quickly find the best time for an event with friends!" />
              <meta property="og:image" content="https://whenimfree.io/social-media-card.png" />
              <meta property="og:type" content="website" />
          </Head>
      </>

  )
}
