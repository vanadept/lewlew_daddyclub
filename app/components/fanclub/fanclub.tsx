import Link from "next/link";
import styles from "./fanclub.module.css";

const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

export default function Fanclub() {
  return (
    <section
      className={styles.section}
      id="fanclub"
      aria-labelledby="fanclub-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>MADE WITH LOVE</span>
            <h2 className={styles.title} id="fanclub-title">
              Fanclub
            </h2>
            <p className={styles.description}>
              มาเป็นตัวเหล็กของแด๊ดดี้ซะดี ๆ   
            </p>
          </div>

          <Link href="/fanclub" className={styles.viewAll}>
            Explore Fanclub <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className={styles.feed}>
          {skeletonCards.map((index) => (
            <article className={styles.card} key={index}>
              <div className={styles.imageSkeleton}>
                <span className={styles.imageMark}>COMMUNITY</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.categorySkeleton} />
                <div className={styles.titleSkeleton} />
                <div className={styles.textSkeleton} />
                <div className={styles.textSkeletonShort} />

                <div className={styles.cardFooter}>
                  <div className={styles.metaSkeleton} />
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.footnote}>
          รอก่อนนะครับ เหล่าตัวเหล็กของแด๊ดดี้
        </p>
      </div>
    </section>
  );
}