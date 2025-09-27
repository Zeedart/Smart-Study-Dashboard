import styles from "./styles/timer.module.css";
import { useEffect, useState } from "react";
import SmallTimer from "./timerComps/SmallTimer";
import FullScreenTimer from "./timerComps/FullScreenTimer";
import sound3 from "../assets/sound-3.mp3";

export default function Timer({ pomodoro }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [time, setTime] = useState(pomodoro * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [popUpMsg, setPopUpMsg] = useState("");

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

    function playSound() {
        const audio = new Audio(sound3);
        audio.play();
    }

    function handleEnd() {
        const timeInMinutes = Math.floor((pomodoro * 60 - time) / 60);
        if (timeInMinutes != 0) {
            setPopUpMsg("⏰ Pomodoro finished! Take a break.");
            playSound();
            const now = new Date();
            const weekday = now.toLocaleDateString('en-US', {
                weekday: 'long',
            });

            const date = now.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });


            const hour24 = now.getHours();
            const minute = now.getMinutes();

            const timeInteger = hour24 * 100 + minute;


            const sessionData = {
                weekday: weekday,
                date: date,
                time: timeInteger,
                session: timeInMinutes
            };

            const storedHistory = localStorage.getItem('sessionHistory');
            let sessionHistory = storedHistory ? JSON.parse(storedHistory) : [];

            sessionHistory.push(sessionData);

            localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));

            setTime(pomodoro * 60);
            setIsRunning(false);
            setIsPaused(false);
            setIsFullScreen(false);
        }
        else {
            setTime(pomodoro * 60);
            setIsRunning(false);
            setIsPaused(false);
            setIsFullScreen(false);
        }
    }

    useEffect(() => {
        if (popUpMsg) {
            const timer = setTimeout(() => setPopUpMsg(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [popUpMsg]);

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

    useEffect(() => {
        setTime(pomodoro * 60);
        setIsRunning(false);
        setIsPaused(false);
    }, [pomodoro]);



    return (
        <>
            {popUpMsg && (
                <div className={styles.popup}>
                    {popUpMsg}
                </div>
            )}
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