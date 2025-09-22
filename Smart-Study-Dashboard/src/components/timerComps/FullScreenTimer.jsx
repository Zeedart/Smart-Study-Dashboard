import styles from "../styles/timer.module.css";

export default function FullScreenTimer({ handleEnd, handlePause, isPaused }) {
  return (
      <div className={styles.btns}>
        {isPaused ? (
          <button onClick={handlePause} className={styles.ResumeBtn}>
            Resume
          </button>
        ) : (
          <button onClick={handlePause} className={styles.PauseBtn}>
            Pause
          </button>
        )}
        <button onClick={handleEnd} className={styles.endBtn}>
          End
        </button>
      </div>
  );
}