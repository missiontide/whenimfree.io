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
      </>

  )
}
