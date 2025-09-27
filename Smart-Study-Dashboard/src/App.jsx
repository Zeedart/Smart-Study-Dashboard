import { useState } from 'react'
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
  const [darkTheme, setDarkTheme] = useState(false)
  const [error, setError] = useState("")
  const [pomodoro, setPomodoro] = useState(25)

  function handleSettings(e) {
    e.preventDefault()
    setSettings(prev => !prev)
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
          <div className="popup-inner">
            <h2><FontAwesomeIcon icon={faHourglass} />Timer</h2>
            <form onSubmit={saveSettings}>
              <label>
                Pomodoro:
                <input type="number" min={5} defaultValue={25} max={120} name="pomodoro" />
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              </label>
              <button type="submit">OK</button>
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
      <Navbar username={username} handleSettings={handleSettings} />
      <Timer pomodoro={pomodoro} />
      <SessionLog />
      <div className="stats">
        <DataChart />
      </div>
      <Stats />
      <Footer />
    </>
  )
}

export default App
