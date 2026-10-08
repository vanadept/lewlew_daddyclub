import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>

        <a href="#" className={styles.logo}>
          LEWLEW DADDYCLUB
        </a>

        <nav className={styles.navLinks}>
          {/* <a href="#works">Works</a> */}
          <a href="#gallery">Gallery</a>
          <a href="#news">News</a>
          <a href="#fanclub">Fanclub</a>
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-label="Open navigation"
          aria-expanded="false"
        >
          {/* <span className={styles.menuText}>Menu</span> */}

          <span className={styles.menuIcon}>
            <span></span>
            <span></span>
          </span>
        </button>

      </div>
    </header>
  );
}