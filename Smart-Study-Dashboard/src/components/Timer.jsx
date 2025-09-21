import styles from "./styles/timer.module.css"

export default function Timer(){
    
    return (
        <>
            <div className={`${styles.timerContainer}`}>
                <p>25:00</p>
                <div className={`${styles.btns}`}>
                    <button className={`${styles.startBtn}`}>Start</button>
                    <button className={`${styles.endBtn}`}>End</button>
                    <button className={`${styles.resetBtn}`}>Reset</button>
                </div>
            </div>
        </>
    )
}