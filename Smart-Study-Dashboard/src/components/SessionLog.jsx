import { useState, useEffect } from "react"
import styles from "./styles/sessionLog.module.css"
import JsonDownloadButton from './JsonDownloadButton';

export default function SessionLog() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const updateSessions = () => {
            setSessions(JSON.parse(localStorage.getItem('sessionHistory')) || []);
        };

        // Initial fetch on mount
        updateSessions();

        // Listen for storage events for real-time updates
        window.addEventListener('storage', updateSessions);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', updateSessions);
        };
    }, []); // The empty dependency array is crucial to prevent an infinite loop.


    function handleDownload() {

    }

    return (
        <>
            <div className={styles.sessionContainer}>
                {sessions.slice(-4).map((session, index) => (
                    <div key={index}>
                        <p>{session.weekday}</p>
                        <p>{session.date}</p>
                        <p>{session.time}</p>
                        <p>{session.session}</p>
                    </div>
                ))}
            </div>
            <div className={styles.btn}>
                <JsonDownloadButton
                    data={sessions}
                    filename="session_history.json"
                />
            </div>
        </>
    );
}