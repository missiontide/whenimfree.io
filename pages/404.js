import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from "next/image";
import logo from "../public/logo.png";
import { Button } from "react-bootstrap";

export default function FourOhFour() {
    return (
        <div className={styles.container}>
            <p className="signature">
                made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
            </p>
            <p>
                <Link href="/">
                    <a><Image src={logo} className="App-logo" alt="logo" /></a>
                </Link>
            </p>
            <div className="App">
                <h3>This event doesn't exist!</h3>
                <p>Double-check your link or...</p>
                <Link href="/">
                    <a>
                        <Button variant="primary">Make a new event scheduler</Button>
                    </a>
                </Link>
            </div>
        </div>
    )
}