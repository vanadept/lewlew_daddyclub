import Link from "next/link";
import styles from "./moments.module.css";

const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

export default function Moments() {
  return (
    <section
      className={styles.section}
      id="moments"
      aria-labelledby="moments-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>A COLLECTION OF MEMORIES</span>
            <h2 className={styles.title} id="moments-title">
              Moments
            </h2>
            <p className={styles.description}>
              รวบรวมเหตุการณ์ ความประทับใจ ความใจฟูที่มีต่อแด๊ดดี้
            </p>
          </div>

          <Link href="/moments" className={styles.viewAll}>
            Explore All Moments <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className={styles.grid}>
          {skeletonCards.map((index) => (
            <article className={styles.card} key={index}>
              <div className={styles.imageSkeleton}>
                <span className={styles.imageMark}>MOMENT 0{index + 1}</span>
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
          A journal of memories, coming soon.
        </p>
      </div>
    </section>
  );
}