import styles from '../styles/Home.module.css'
import CreateScheduler from '../components/CreateScheduler'
import logo from "../public/logo.png";
import Image from "next/image";

export default function Home() {
  return (
      <>
          <title>whenimfree.io</title>
          <div className={styles.container}>
              <p className="signature">
                  made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
              </p>
              <Image src={logo} className="App-logo" alt="logo" />
              <CreateScheduler />
          </div>
          <meta property="og:url" content="https://whenimfree.io" />
          <meta property="og:title" content="whenimfree.io - Get availability fast!" />
          <meta property="og:description" content="Quickly find the best time for an event with friends!" />
          <meta property="og:image" content="../public/website-social-card.png" />
          <meta property="og:type" content="website" />
      </>

  )
}
