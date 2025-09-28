import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pfp from "../assets/PFP.jpg"
import styles from "../components/styles/navBar.module.css"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { faLanguage, faMoon, faGear, faSun } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({username, handleSettings, handleTheme, theme}) {
  return (
    <div className={`${styles.container } ${theme ? styles.containerLight: styles.containerDark}`}>
      <div className={`${styles.profile}`}>
        <img src={pfp} width={50} height={50} style={{ borderRadius: 100 }} />
        <p>{username}</p>
      </div>
      <div className={`${styles.settings}`}>
        {/*<FontAwesomeIcon className={`${styles.lang} ${theme ? styles.langLight : styles.langDark}`} icon={faLanguage}/>*/}

        {theme ?  <FontAwesomeIcon onClick={() => handleTheme()} className={`${styles.theme} ${theme ? styles.themeLight : styles.themeDark}`} icon={faMoon}/>: <FontAwesomeIcon onClick={() => handleTheme()} className={`${styles.theme} ${theme ? styles.themeLight : styles.themeDark}`} icon={faSun}/>}

        <FontAwesomeIcon onClick={handleSettings} className={`${styles.gear} ${theme ? styles.gearLight : styles.gearDark}`}  icon={faGear} />
      </div>
    </div>
  )
}
