import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="#" className={styles.logo}>
              LEWLEW
              <span>DADDY CLUB</span>
            </Link>

            <p className={styles.tagline}>Thanks for your support.</p>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            <Link href="#">Home</Link>
            <Link href="#news">Events</Link>
            <Link href="#moments">Moments</Link>
            <Link href="#fanclub">Fanclub</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={styles.disclaimer}>
            <p>Lewlew DaddyClub เป็นเว็บ fansite</p>
            <p>ที่จัดทำขึ้นโดยแฟนคลับ</p>
            <p>เพื่อสนับสนุนน้อง Lewlew CGM48 เท่านั้น</p>
            <p>ไม่ใช่เว็บไซต์อย่างเป็นทางการ</p>
          </div>

          <div className={styles.creditsGroup}>
            {" "}
            <p className={styles.eyebrow}> An unofficial fan-made website. </p>
            <p className={styles.credits}>
              {" "}
              Original Content & Artist © by BNK48 & CGM48{" "}
              <span> under Independent Artist Management (iAM) </span>{" "}
            </p>{" "}
          </div>
          <a className={styles.backToTop} href="#">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
