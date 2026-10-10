import Link from "next/link";
import styles from "./events.module.css";

const skeletonCards = Array.from({ length: 5 }, (_, index) => index);

export default function Events() {
  return (
    <section
      className={styles.section}
      id="news"
      aria-labelledby="events-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>THE NEW CHAPTER</span>
            <h2 className={styles.title} id="events-title">
              Upcoming Events
            </h2>
            <p className={styles.description}>
              ติดตามข่าวสาร ผลงาน และกิจกรรมต่าง ๆ ของหลิวหลิวได้ที่นี่
            </p>
          </div>

          <Link href="/events" className={styles.viewAll}>
            View All Events <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className={styles.carousel}>
          {skeletonCards.map((index) => (
            <article className={styles.card} key={index}>
              <div className={styles.imageSkeleton}>
                <span className={styles.comingSoon}>COMING SOON</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.metaSkeleton} />
                <div className={styles.titleSkeleton} />
                <div className={styles.textSkeleton} />
                <div className={styles.textSkeletonShort} />
              </div>
            </article>
          ))}
        </div>

        <p className={styles.footnote}>
          New chapters will be announced here.
        </p>
      </div>
    </section>
  );
}