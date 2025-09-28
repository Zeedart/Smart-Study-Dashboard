import { useState, useMemo, useEffect } from "react" // Use useMemo for performance optimization
import styles from "./styles/stats.module.css"
export default function Stats({theme}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('sessionHistory');
        if (storedHistory) {
            try {
                setData(JSON.parse(storedHistory));
            } catch (e) {
                console.error("Could not parse session history:", e);
                setData([]);
            }
        }
    }, []);


    const now = new Date();


    const getDayStart = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());


    const todayDateString = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const currentMonthAbbr = now.toLocaleDateString('en-US', { month: 'short' });
    const currentYear = now.getFullYear();

    const currentDay = getDayStart(now);
    const dayOfWeek = currentDay.getDay();

    const weekStart = getDayStart(
        new Date(currentDay.setDate(currentDay.getDate() - dayOfWeek))
    );
    const weekEnd = getDayStart(
        new Date(weekStart.getTime() + (6 * 24 * 60 * 60 * 1000))
    );

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours > 0) {
            const minuteString = minutes !== 0
                ? ` and ${minutes} minutes`
                : "";

            return `${hours} hours${minuteString}`;
        }

        return `${minutes} minutes`;
    };


    const totalTodayMinutes = useMemo(() => {
        return data.reduce((total, ele) => {
            if (ele.date === todayDateString) {
                return total + ele.session;
            }
            return total;
        }, 0);
    }, [data, todayDateString]);

    const totalWeekMinutes = useMemo(() => {
        return data.reduce((total, ele) => {
            const sessionDate = getDayStart(new Date(ele.date));
            if (sessionDate >= weekStart && sessionDate <= weekEnd) {
                return total + ele.session;
            }
            return total;
        }, 0);
    }, [data, weekStart, weekEnd]);

    const totalMonthMinutes = useMemo(() => {
        return data.reduce((total, ele) => {
            const sessionDate = new Date(ele.date);
            const sessionMonthAbbr = sessionDate.toLocaleDateString('en-US', { month: 'short' });
            const sessionYear = sessionDate.getFullYear();

            if (sessionMonthAbbr === currentMonthAbbr && sessionYear === currentYear) {
                return total + ele.session;
            }
            return total;
        }, 0);
    }, [data, currentMonthAbbr, currentYear]);

    return (
        <div className={`${styles.statsContainer} ${theme? styles.statsContainerLight : styles.statsContainerDark}`}>
            
            <div className={`${styles.statCard} ${theme ? styles.statCardLight : styles.statCardDark}`}>
                <p className={theme ? styles.labelLight : styles.labelDark}>Today's Study</p>
                <p className={theme ? styles.valueLight : styles.valueDark}>{formatTime(totalTodayMinutes)}</p>
            </div>

            <div className={`${styles.statCard} ${theme ? styles.statCardLight : styles.statCardDark}`}>
                <p className={theme ? styles.labelLight : styles.labelDark}>This Week's Study</p>
                <p className={theme ? styles.valueLight : styles.valueDark}>{formatTime(totalWeekMinutes)}</p>
            </div>
            
            <div className={`${styles.statCard} ${theme ? styles.statCardLight : styles.statCardDark}`}>
                <p className={theme ? styles.labelLight : styles.labelDark}>This Month's Study</p>
                <p className={theme ? styles.valueLight : styles.valueDark}>{formatTime(totalMonthMinutes)}</p>
            </div>
        </div>
    )
}
