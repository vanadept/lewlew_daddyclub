// import Link from "next/link";
// import styles from "./events.module.css";

// const skeletonCards = Array.from({ length: 5 }, (_, index) => index);

// export default function Events() {
//   return (
//     <section
//       className={styles.section}
//       id="news"
//       aria-labelledby="events-title"
//     >
//       <div className={styles.container}>
//         <header className={styles.header}>
//           <div className={styles.headingGroup}>
//             <span className={styles.eyebrow}>THE NEW CHAPTER</span>
//             <h2 className={styles.title} id="events-title">
//               Upcoming Events
//             </h2>
//             <p className={styles.description}>
//               ติดตามข่าวสาร ผลงาน และกิจกรรมต่าง ๆ ของหลิวหลิวได้ที่นี่
//             </p>
//           </div>

//           <Link href="/events" className={styles.viewAll}>
//             View All Events <span aria-hidden="true">↗</span>
//           </Link>
//         </header>

//         <div className={styles.carousel}>
//           {skeletonCards.map((index) => (
//             <article className={styles.card} key={index}>
//               <div className={styles.imageSkeleton}>
//                 <span className={styles.comingSoon}>COMING SOON</span>
//               </div>

//               <div className={styles.cardBody}>
//                 <div className={styles.metaSkeleton} />
//                 <div className={styles.titleSkeleton} />
//                 <div className={styles.textSkeleton} />
//                 <div className={styles.textSkeletonShort} />
//               </div>
//             </article>
//           ))}
//         </div>

//         <p className={styles.footnote}>
//           New chapters will be announced here.
//         </p>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { facebookEventPosts } from "./events.data";
import styles from "./events.module.css";

export default function Events() {
  const posts = facebookEventPosts.slice(0, 5);

  return (
    <section
      className={styles.section}
      id="news"
      aria-labelledby="events-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>UPCOMING EVENTS</span>

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
          {posts.map((post) => (
            <article className={styles.card} key={post.id}>
              <a
                className={styles.postLink}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`เปิดโพสต์ Facebook${post.title ? `: ${post.title}` : ""}`}
              >
                <div className={styles.postImage}>
                  {post.imageUrl ? (
                    // ใช้เฉพาะ Direct Image URL ที่ตรวจสอบแหล่งที่มาแล้ว
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.postImageElement}
                      src={post.imageUrl}
                      alt={post.title || "ภาพจากโพสต์ Facebook ของ Lewlew"}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.imageFallback}>
                      <span className={styles.fallbackEyebrow}>
                        FACEBOOK JOURNAL
                      </span>

                      <span className={styles.fallbackTitle}>
                        Image coming soon
                      </span>

                      <span className={styles.fallbackHint}>
                        View original post ↗
                      </span>
                    </div>
                  )}

                  <span className={styles.sourceLabel}>
                    FACEBOOK <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>

              <div className={styles.cardBody}>
                {post.date && (
                  <p className={styles.postDate}>{post.date}</p>
                )}

                <h3 className={styles.postTitle}>
                  {post.title || "Handshake Event"}
                </h3>

                <a
                  className={styles.readPost}
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View original post <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* <p className={styles.footnote}>
          Moments and updates, collected along the way.
        </p> */}
      </div>
    </section>
  );
}