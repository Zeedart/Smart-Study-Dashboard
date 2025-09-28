import styles from './styles/footer.module.css';

export default function Footer({theme}) {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className={`${styles.appFooter} ${theme ? styles.appFooterLight : styles.appFooterDark}`}>
      
      <div className={theme ? styles.footerBrandLight : styles.footerBrandDark}>
        FocusFlow 📚
      </div>


      <p className={styles.footerCredit}>Made with ❤️ by <a className={`${theme ? styles.nameLight : styles.nameDark}`}  href="https://github.com/Zeedart">Yazeed Alkalmi</a></p>

      <p className={styles.footerCopy}>
        &copy; {currentYear} FocusFlow. All rights reserved.
      </p>

    </footer>
  );
}