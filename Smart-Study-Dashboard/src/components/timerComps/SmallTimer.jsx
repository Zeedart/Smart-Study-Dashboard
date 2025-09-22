import styles from "../styles/timer.module.css"


export default function SmallTimer({ handleStart, toggleTimer }) {

    return (

        <div className={`${styles.btns}`}>
            <button onClick={() => {
                handleStart()
                toggleTimer()
            }} className={`${styles.startBtn}`}>Start</button>
        </div>
    )
}