import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faHourglass } from '@fortawesome/free-solid-svg-icons'
import SessionLog from './components/SessionLog'
import DataChart from './components/DataChart'
import Stats from './components/Stats'
import Footer from './components/Footer.jsx'

function App() {
  const [username, setUsername] = useState(localStorage.getItem('user') || "")
  const [settings, setSettings] = useState(false)
  const [theme, setTheme] = useState(true) // I Set Black: false, Light: True
  const [error, setError] = useState("")
  const [pomodoro, setPomodoro] = useState(25)


  useEffect(() => {
    document.body.style.transition = "background-color 0.3s ease-in-out";

    if (theme) {
      document.body.style.backgroundColor = "#FEFFFE";
    } else {
      document.body.style.backgroundColor = "#121212";
    }
  }, [theme]);

  function handleSettings(e) {
    e.preventDefault()
    setSettings(prev => !prev)
  }

  function handleTheme(){
    setTheme(prev => !prev)
  }

  function handleLogin(e) {
    e.preventDefault()
    const name = e.target.elements.username.value.trim()

    if (!name) {
      setError("Please enter your name before logging in.")
      return
    }

    localStorage.setItem('user', name)
    setUsername(name)
    setError("")
  }

  function saveSettings(e) {
    e.preventDefault()
    const value = Number(e.target.elements.pomodoro.value)  // convert to number
    setPomodoro(value)
    setSettings(prev => !prev)
  }


  return (
    <>
      {settings === true && (
        <div className="popup">
          <div className={`popup-inner ${theme ? "popup-innerLight" : "popup-innerDark"}`}>
            <h2 className={`popup-header ${theme ? "popup-headerLight" : "popup-headerDark"}`}><FontAwesomeIcon icon={faHourglass} />Timer</h2>
            <form onSubmit={saveSettings}>
              <label>
                <p style={{ color: theme ? "#34495e" : "White" }}>Pomodoro:</p>
                <input type="number" min={5} defaultValue={25} max={120} name="pomodoro" />
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              </label>
              <button className={`submitBtn ${theme ? "submitBtnLight" : "submitBtnDark"}`} type="submit">OK</button>
            </form>

            <button>
              <FontAwesomeIcon onClick={() => setSettings(prev => !prev)} icon={faX} />
            </button>
          </div>
        </div>
      )
      }
      {username === "" && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Enter your name!</h2>
            <form onSubmit={handleLogin}>
              <label>
                Name:
                <input type="text" name="username" />
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
      <Navbar handleTheme={handleTheme} theme={theme} username={username} handleSettings={handleSettings} />
      <Timer theme={theme} pomodoro={pomodoro} />
      <SessionLog theme={theme}/>
      <div className="stats">
        <DataChart theme={theme} />
      </div>
      <Stats theme={theme}/>
      <Footer theme={theme}/>
    </>
  )
}

export default App
