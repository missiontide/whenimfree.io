import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CreateScheduler from '../components/CreateScheduler'

export default function Home() {
  return (
    <div className={styles.container}>
        <CreateScheduler />
    </div>
  )
}
