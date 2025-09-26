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

        const formatTimeInteger = (timeInteger) => {

        const hour24 = Math.floor(timeInteger / 100); 
        const minute = timeInteger % 100;             


        const ampm = hour24 >= 12 ? 'PM' : 'AM';


        const hour12 = hour24 % 12 || 12;


        const minuteString = String(minute).padStart(2, '0');

        return `${hour12}:${minuteString} ${ampm}`;
    };

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
                        <p>{formatTimeInteger(session.time)}</p>
                        <p>{session.session} mins</p>
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