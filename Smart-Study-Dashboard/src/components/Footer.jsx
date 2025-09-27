import styles from './styles/footer.module.css'; // Assuming you reuse the same module for simple styling

export default function Footer() {
  // Use the current year for the copyright notice
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className={styles.appFooter}>
      
      <div className={styles.footerBrand}>
        FocusFlow 📚
      </div>


      <p className={styles.footerCredit}>Made with ❤️ by <a href="https://github.com/Zeedart">Yazeed Alkalmi</a></p>

      <p className={styles.footerCopy}>
        &copy; {currentYear} FocusFlow. All rights reserved.
      </p>

    </footer>
  );
}