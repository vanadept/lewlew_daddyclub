"use client";

import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    // เช็คสถานะเริ่มต้นตอนโหลดคอมโพเนนต์
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav
      }
    >
      <div className={styles.navInner}>
        {/* <a href="/" className={styles.logo}> */}
          LEWLEW DADDYCLUB
        {/* </a> */}

        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="#news">Events</a>
          <a href="#moments">Moments</a>
          <a href="#fanclub">Fanclub</a>
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-label="Open navigation"
          aria-expanded="false"
        >
          <span className={styles.menuIcon}>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}