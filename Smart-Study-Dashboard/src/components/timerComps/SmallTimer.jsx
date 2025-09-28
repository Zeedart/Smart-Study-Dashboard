import styles from "../styles/timer.module.css"


export default function SmallTimer({ handleStart, toggleTimer, theme }) {

    return (

        <div className={`${styles.btns}`}>
            <button onClick={() => {
                handleStart()
                toggleTimer()
            }} className={`${theme ? styles.startLight: styles.startDark}`}>Start</button>
        </div>
    )
}