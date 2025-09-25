import { useState, useEffect } from "react"
import styles from "./styles/sessionLog.module.css"
import JsonDownloadButton from './JsonDownloadButton';

export default function SessionLog() {
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        const updateSessions = () => {
            setSessions(JSON.parse(localStorage.getItem('sessionHistory')) || []);
        };

        
        updateSessions();

        
        window.addEventListener('storage', updateSessions);

        
        return () => {
            window.removeEventListener('storage', updateSessions);
        };
    }, []);

    return (
        <>
            <div className={styles.sessionContainer}>
                {sessions.length === 0 ? 
                <div className={styles.session}>
                    <p>Start a sessions!</p>
                </div>
                : sessions.slice(-4).map((session, index) => (
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