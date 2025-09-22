import styles from "./styles/timer.module.css";
import { useEffect, useState } from "react";
import SmallTimer from "./timerComps/SmallTimer";
import FullScreenTimer from "./timerComps/FullScreenTimer";

export default function Timer() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        setIsFullScreen(prev => !prev);
    };

    function handleStart() {
        setIsRunning(true);
        setIsPaused(false);
    }

    function handleEnd() {
        const now = new Date();
        const date = now.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const timeInMinutes = Math.floor((25 * 60 - time) / 60);

        const sessionData = {
            date: date,
            time: `${timeInMinutes} mins`
        };

        const storedHistory = localStorage.getItem('sessionHistory');
        let sessionHistory = storedHistory ? JSON.parse(storedHistory) : [];

        sessionHistory.push(sessionData);

        localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));

        // Reset the timer states
        setTime(25 * 60);
        setIsRunning(false);
        setIsPaused(false);
        setIsFullScreen(false);
        console.log(localStorage)
    }

    function handlePause() {
        setIsPaused(prev => !prev);
    }

    useEffect(() => {
        let interval = null;
        if (isRunning && !isPaused && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            handleEnd();
        }
        return () => clearInterval(interval);
    }, [isRunning, isPaused, time]);

    return (
        <>
            <div className={`${isFullScreen ? styles.fullTimerContainer : styles.timerContainer}`}>
                <p>{formatTime(time)}</p>
                {isFullScreen ?
                    <FullScreenTimer
                        handleEnd={handleEnd}
                        handlePause={handlePause}
                        isPaused={isPaused}
                    />
                    :
                    <SmallTimer handleStart={handleStart} toggleTimer={toggleTimer} />
                }
            </div>
        </>
    );
}