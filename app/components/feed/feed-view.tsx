import styles from "./feed-view.module.css";

export default function FeedView() {
  return (
    <main className={styles.page}>
      <section
        className={styles.section}
        aria-labelledby="feed-page-title"
      >
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>
              LITTLE MOMENTS, MORE MEMORIES
            </span>

            <h1 className={styles.title} id="feed-page-title">
              All Updates
            </h1>

            <p className={styles.description}>
              รวมข่าวสาร กิจกรรม และเรื่องราวของแด๊ดดี้
              ไว้ในที่เดียวสำหรับเหล่าตัวเหล็ก ♡
            </p>
          </header>

          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardVisual}>
                <span className={styles.visualMark} aria-hidden="true">
                  ✳
                </span>
                <span className={styles.visualLabel}>
                  SOMETHING IS BLOOMING
                </span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.category}>COMING SOON</span>

                <h2 className={styles.cardTitle}>
                  A little more to share
                </h2>

                <p className={styles.cardDescription}>
                  กำลังเตรียมเรื่องราวและอัปเดตใหม่ ๆ
                  มาให้เหล่าตัวเหล็กได้ติดตามกันนะครับ
                </p>

                <span className={styles.cardFooter}>
                  Coming soon <span aria-hidden="true">♡</span>
                </span>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardVisual}>
                <span className={styles.visualMark} aria-hidden="true">
                  ✿
                </span>
                <span className={styles.visualLabel}>
                  LITTLE UPDATES
                </span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.category}>IN THE MAKING</span>

                <h2 className={styles.cardTitle}>
                  More memories, soon
                </h2>

                <p className={styles.cardDescription}>
                  พื้นที่สำหรับข่าวสารและโมเมนต์น่ารัก ๆ
                  จะเปิดให้ติดตามเร็ว ๆ นี้
                </p>

                <span className={styles.cardFooter}>
                  Stay tuned <span aria-hidden="true">↗</span>
                </span>
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardVisual}>
                <span className={styles.visualMark} aria-hidden="true">
                  ♡
                </span>
                <span className={styles.visualLabel}>
                  MADE FOR THE FANCLUB
                </span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.category}>COMING SOON</span>

                <h2 className={styles.cardTitle}>
                  A space for our community
                </h2>

                <p className={styles.cardDescription}>
                  แล้วมาพบกันในพื้นที่เล็ก ๆ
                  ที่รวบรวมเรื่องราวของพวกเราไว้ด้วยกัน
                </p>

                <span className={styles.cardFooter}>
                  See you soon <span aria-hidden="true">♡</span>
                </span>
              </div>
            </article>
          </div>

          <p className={styles.footnote}>
            ขอบคุณที่อยู่ด้วยกันนะครับ แล้วพบกันเร็ว ๆ นี้ ♡
          </p>
        </div>
      </section>
    </main>
  );
}