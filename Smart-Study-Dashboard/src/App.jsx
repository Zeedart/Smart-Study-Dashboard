import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SessionLog from './components/SessionLog'

function App() {
  const [username, setUsername] = useState(localStorage.getItem('user') || "")
  const [error, setError] = useState("")

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


  return (
    <>
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

            <button>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </div>
      )}
      <Navbar username={username} />
      <Timer />
      <SessionLog />
    </>
  )
}

export default App
