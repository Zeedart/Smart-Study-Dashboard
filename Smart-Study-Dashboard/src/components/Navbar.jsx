import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pfp from "../assets/PFP.jpg"
import styles from "../components/styles/navBar.module.css"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { faLanguage, faMoon } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({username}) {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.profile}`}>
        <img src={pfp} width={50} height={50} style={{ borderRadius: 100 }} />
        <p>{username}</p>
      </div>
      <div className={`${styles.settings}`}>
        <FontAwesomeIcon className={`${styles.lang}`} icon={faLanguage}/>

        <FontAwesomeIcon className={`${styles.theme}`} icon={faMoon}/>
      </div>
    </div>
  )
}
