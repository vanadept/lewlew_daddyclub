// "use client";

// import { useEffect, useState } from "react";
// import styles from "./navbar.module.css";

// import Link from "next/link";

// const menuItems = [
//   { label: "Home", href: "/" },
//   { label: "Feed", href: "#feed" },
//   { label: "Schedule", href: "#schedule" },
//   { label: "Playground", href: "#playground" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Close the menu with Escape and prevent background scrolling.
//   useEffect(() => {
//     if (!isMenuOpen) return;

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsMenuOpen(false);
//       }
//     };

//     const previousOverflow = document.body.style.overflow;

//     document.body.style.overflow = "hidden";
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isMenuOpen]);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header
//         className={scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav}
//       >
//         <div className={styles.navInner}>
//           <Link
//             href="/"
//             className={styles.logo}
//             aria-label="LEWLEW Daddy Club — Home"
//           >
//             <span className={styles.logoMain}>LEWLEW</span>
//             <span className={styles.logoSub}>DADDYCLUB</span>
//           </Link>

//           <nav className={styles.navLinks} aria-label="Main navigation">
//             <a href="#feed">Feed</a>
//             <a href="#schedule">Schedule</a>
//             <a href="#playground">Playground</a>
//           </nav>

//           <button
//             className={`${styles.menuButton} ${
//               isMenuOpen ? styles.menuButtonOpen : ""
//             }`}
//             type="button"
//             aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
//             aria-expanded={isMenuOpen}
//             aria-controls="side-navigation"
//             onClick={() => setIsMenuOpen((open) => !open)}
//           >
//             <span className={styles.menuIcon} aria-hidden="true">
//               <span /> <span />
//               <span />{" "}
//             </span>
//           </button>
//         </div>

//         {/* Side menu overlay */}
//         <div
//           className={`${styles.menuOverlay} ${
//             isMenuOpen ? styles.menuOverlayOpen : ""
//           }`}
//           aria-hidden="true"
//         >
//           <button
//             className={styles.overlayButton}
//             type="button"
//             tabIndex={isMenuOpen ? 0 : -1}
//             aria-label="Close navigation menu"
//             onClick={closeMenu}
//           />
//         </div>
//       </header>

//       {/* Right-side navigation panel */}
//       <aside
//         id="side-navigation"
//         className={`${styles.sideMenu} ${
//           isMenuOpen ? styles.sideMenuOpen : ""
//         }`}
//         role="dialog"
//         aria-modal="true"
//         aria-label="Site navigation"
//         aria-hidden={!isMenuOpen}
//         inert={!isMenuOpen}
//       >
//         <div className={styles.sideMenuHeader}>
//           <span className={styles.sideMenuEyebrow}></span>

//           <button
//             className={styles.closeButton}
//             type="button"
//             aria-label="Close navigation"
//             onClick={closeMenu}
//             tabIndex={isMenuOpen ? 0 : -1}
//           >
//             <span />
//             <span />
//           </button>
//         </div>

//         <nav className={styles.sideMenuLinks} aria-label="Side navigation">
//           {menuItems.map((item, index) => (
//             <a
//               key={item.label}
//               href={item.href}
//               className={styles.sideMenuLink}
//               onClick={closeMenu}
//               tabIndex={isMenuOpen ? 0 : -1}
//               style={
//                 {
//                   "--menu-index": index,
//                 } as React.CSSProperties
//               }
//             >
//               {/* <span className={styles.sideMenuNumber}>
//                 0{index + 1}
//               </span> */}

//               <span className={styles.sideMenuLabel}>{item.label}</span>

//               {/* <span className={styles.sideMenuArrow} aria-hidden="true">
//                 ↗
//               </span> */}
//             </a>
//           ))}
//         </nav>

//         <div className={styles.sideMenuFooter}>
//           <span>AN UNOFFICIAL FAN-MADE WEBSITE</span>
//           <span>For support LewlewCGM48</span>
//         </div>
//       </aside>
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "lewlew-theme";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Feed", href: "#feed" },
  { label: "Schedule", href: "#schedule" },
  { label: "Playground", href: "#playground" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme;

    if (currentTheme === "dark" || currentTheme === "light") {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    const nextTheme: Theme =
      theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme remains active for this page session.
    }
  };

  return (
    <>
      <header
        className={
          scrolled
            ? `${styles.nav} ${styles.scrolled}`
            : styles.nav
        }
      >
        <div className={styles.navInner}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="LEWLEW Daddy Club — Home"
          >
            <span className={styles.logoMain}>LEWLEW</span>
            <span className={styles.logoSub}>DADDYCLUB</span>
          </Link>

          <nav
            className={styles.navLinks}
            aria-label="Main navigation"
          >
            <a href="#feed">Feed</a>
            <a href="#schedule">Schedule</a>
            <a href="#playground">Playground</a>
          </nav>

          <div className={styles.navActions}>
            <button
              className={styles.themeToggle}
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              aria-pressed={theme === "dark"}
              title={
                theme === "light"
                  ? "Dark mode"
                  : "Light mode"
              }
            >
              <span aria-hidden="true">
                {theme === "light" ? "☾" : "☀"}
              </span>
              <span className={styles.themeLabel}>
                {theme === "light" ? "DARK" : "LIGHT"}
              </span>
            </button>

            <button
              className={`${styles.menuButton} ${
                isMenuOpen ? styles.menuButtonOpen : ""
              }`}
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={isMenuOpen}
              aria-controls="side-navigation"
              onClick={() =>
                setIsMenuOpen((open) => !open)
              }
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`${styles.menuOverlay} ${
            isMenuOpen ? styles.menuOverlayOpen : ""
          }`}
          aria-hidden="true"
        >
          <button
            className={styles.overlayButton}
            type="button"
            tabIndex={isMenuOpen ? 0 : -1}
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
        </div>
      </header>

      <aside
        id="side-navigation"
        className={`${styles.sideMenu} ${
          isMenuOpen ? styles.sideMenuOpen : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className={styles.sideMenuHeader}>
          <span className={styles.sideMenuEyebrow} />

          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close navigation"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span />
            <span />
          </button>
        </div>

        <nav
          className={styles.sideMenuLinks}
          aria-label="Side navigation"
        >
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.sideMenuLink}
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
              style={
                {
                  "--menu-index": index,
                } as React.CSSProperties
              }
            >
              <span className={styles.sideMenuLabel}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className={styles.sideMenuFooter}>
          <span>AN UNOFFICIAL FAN-MADE WEBSITE</span>
          <span>For support LewlewCGM48</span>
        </div>
      </aside>
    </>
  );
}
