// "use client";

// import { useCallback, useState } from "react";
// import Link from "next/link";
// import styles from "./playground.module.css";
// import QuizModal from "./quiz/quiz-modal";

// const skeletonCards = Array.from({ length: 3 }, (_, index) => index);



// export default function Playground() {
// const [isQuizOpen, setIsQuizOpen] = useState(false);

//   const closeQuiz = useCallback(() => {
//     setIsQuizOpen(false);
//   }, []);

//   return (
//     <section
//       className={styles.section}
//       id="playground"
//       aria-labelledby="playground-title"
//     >
//       <div className={styles.container}>
//         <header className={styles.header}>
//           <div>
//             {/* <span className={styles.eyebrow}>MADE WITH LOVE</span> */}
//             <h2 className={styles.title} id="playground-title">
//               Playground
//             </h2>
//             <p className={styles.description}>พื้นที่เล็ก ๆ ที่อยากให้เหล่าตัวเหล็กมาร่วมสนุกกัน</p>
//           </div>

//           <Link href="/playground" className={styles.viewAll}>
//             Explore Playground <span aria-hidden="true">↗</span>
//           </Link>
//         </header>

//         <div className={styles.feed}>
//           {skeletonCards.map((index) => (
//             <article className={styles.card} key={index}>
//               {index === 0 ? (
//                 <button
//                   type="button"
//                   className={styles.quizCardButton}
//                   onClick={() => setIsQuizOpen(true)}
//                   aria-label="Play Lewlew Fanclub Quiz"
//                 >
//                   <div className={styles.imageSkeleton}>
//                     <span className={styles.imageMark}>คุณคือตัวเหล็กของแด่ดดี๊ใช่หรือไม่?</span>
//                   </div>

//                   <div className={styles.cardBody}>
//                     <span className={styles.quizEyebrow}>
//                       PLAY THE QUIZ
//                     </span>

//                     <h3 className={styles.quizCardTitle}>
//                       คุณรู้จักหลิวหลิวมากแค่ไหน LV.1?
//                     </h3>

//                     <p className={styles.quizCardDescription}>
//                       มาทดสอบความเป็นตัวเหล็กของแด๊ดดี้กัน ♡
//                     </p>

//                     <div className={styles.cardFooter}>
//                       <span className={styles.quizCardAction}>Start Quiz</span>
//                       <span className={styles.arrow} aria-hidden="true">
//                         ↗
//                       </span>
//                     </div>
//                   </div>
//                 </button>
//               ) : (
//                 <>
//                   <div className={styles.imageSkeleton}>
//                     <span className={styles.imageMark}>COMMUNITY</span>
//                   </div>

//                   <div className={styles.cardBody}>
//                     <div className={styles.categorySkeleton} />
//                     <div className={styles.titleSkeleton} />
//                     <div className={styles.textSkeleton} />
//                     <div className={styles.textSkeletonShort} />

//                     <div className={styles.cardFooter}>
//                       <div className={styles.metaSkeleton} />
//                       <span className={styles.arrow} aria-hidden="true">
//                         ↗
//                       </span>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </article>
//           ))}
//         </div>

//         {isQuizOpen && <QuizModal onClose={closeQuiz} />}

//         {/* <p className={styles.footnote}>รอก่อนนะครับ เหล่าตัวเหล็กของแด๊ดดี้</p> */}
//       </div>
//     </section>
//   );
// }


"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import styles from "./playground.module.css";
import QuizModal from "./quiz/quiz-modal";
import CatchGame from "./catch_me/catch-me-game";

const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

export default function Playground() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCatchGameOpen, setIsCatchGameOpen] = useState(false);

  const catchGameButtonRef = useRef<HTMLButtonElement>(null);

  const closeQuiz = useCallback(() => {
    setIsQuizOpen(false);
  }, []);

  const closeCatchGame = useCallback(() => {
    setIsCatchGameOpen(false);
  }, []);

  return (
    <section
      className={styles.section}
      id="playground"
      aria-labelledby="playground-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title} id="playground-title">
              Playground
            </h2>
            <p className={styles.description}>
              พื้นที่เล็ก ๆ ที่อยากให้เหล่าตัวเหล็กมาร่วมสนุกกัน
            </p>
          </div>

          <Link href="/playground" className={styles.viewAll}>
            Explore Playground <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className={styles.feed}>
          {skeletonCards.map((index) => (
            <article className={styles.card} key={index}>
              {index === 0 ? (
                <button
                  type="button"
                  className={styles.quizCardButton}
                  onClick={() => setIsQuizOpen(true)}
                  aria-label="Play Lewlew Fanclub Quiz"
                >
                  <div className={styles.imageSkeleton}>
                    <span className={styles.imageMark}>
                      คุณคือตัวเหล็กของแด่ดดี๊ใช่หรือไม่?
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.quizEyebrow}>
                      PLAY THE QUIZ
                    </span>

                    <h3 className={styles.quizCardTitle}>
                      คุณรู้จักหลิวหลิวมากแค่ไหน LV.1?
                    </h3>

                    <p className={styles.quizCardDescription}>
                      มาทดสอบความเป็นตัวเหล็กของแด๊ดดี้กัน ♡
                    </p>

                    <div className={styles.cardFooter}>
                      <span className={styles.quizCardAction}>
                        Start Quiz
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </div>
                </button>
              ) : index === 1 ? (
                <button
                  ref={catchGameButtonRef}
                  type="button"
                  className={styles.quizCardButton}
                  onClick={() => setIsCatchGameOpen(true)}
                  aria-label="เล่น Catch the Good Stuff"
                >
                  <div
                    className={`${styles.imageSkeleton} ${styles.catchGameCover}`}
                  >
                    <span
                      className={styles.catchGameDecor}
                      aria-hidden="true"
                    >
                      ♡
                    </span>
                    <span className={styles.imageMark}>
                      ใจตัวเหล็ก มีแค่แดดดี๊คนเดียวจริงป่าว?
                    </span>
                    <span
                      className={styles.catchGameDecorSmall}
                      aria-hidden="true"
                    >
                      ✳
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.quizEyebrow}>
                      PLAY &amp; CATCH
                    </span>

                    <h3 className={styles.quizCardTitle}>
                      เห็นอย่างงี้ แดดดี๊ทั้งใจ
                    </h3>

                    <p className={styles.quizCardDescription}>
                      ขยับตะกร้า เก็บภาพหลิวหลิวให้ได้มากที่สุดใน 30 วินาที ♡
                    </p>

                    <div className={styles.cardFooter}>
                      <span className={styles.quizCardAction}>
                        Play Game
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </div>
                </button>
              ) : (
                <>
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
                </>
              )}
            </article>
          ))}
        </div>

        {isQuizOpen && <QuizModal onClose={closeQuiz} />}

        {isCatchGameOpen && (
          <CatchGame
            onClose={closeCatchGame}
            returnFocusRef={catchGameButtonRef}
          />
        )}
      </div>
    </section>
  );
}