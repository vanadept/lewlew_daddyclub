"use client";

import { useRef, useState } from "react";
import styles from "./hero.module.css";

const mvScenes = [
  {
    id: "kibouressha",
    number: "01",
    title: "KIBOU RESSHA - รถไฟแห่งความหวัง",
    subtitle: "THE FIRST JOURNEY",
    url: "https://www.youtube.com/watch?v=-HNfFArKiPQ",

    videos: [
      "/images/hero/kibouressha-mv-331-001.mp4",
      "/images/hero/kibouressha-mv-331-002.mp4",
      "/images/hero/kibouressha-mv-331-003.mp4",
      "/images/hero/kibouressha-mv-331-004.mp4",
      "/images/hero/kibouressha-mv-331-005.mp4",
    ],

    endingImage:
      "/images/hero/kibouressha-331-00A.png",
  },

  {
    id: "kimitodoko",
    number: "02",
    title: "KIMITODOKO",
    subtitle: "WHERE THE JOURNEY LEADS",
    url: "#",

    videos: [],

    endingImage: null,
  },
];

export default function Hero() {
  /*
   * activeMv
   * MV / Scene ที่กำลังแสดง
   */
  const [activeMv, setActiveMv] = useState(0);

  /*
   * videoIndex
   *
   * 0 = video 001
   * 1 = video 002
   * 2 = video 003
   * ...
   * -1 = เล่นครบแล้ว / แสดง ending image
   */
  const [videoIndex, setVideoIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentMv = mvScenes[activeMv];

  const currentVideo =
    videoIndex >= 0
      ? currentMv.videos[videoIndex] ?? null
      : null;

  const isFinished =
    currentMv.videos.length > 0 &&
    videoIndex === -1;

  /* =====================================================
     HERO CLICK / REPLAY
  ====================================================== */

  const handleHeroClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    /*
     * ถ้าคลิก link หรือ button
     * ไม่ต้อง trigger การเล่น video
     */
    const target = event.target as HTMLElement;

    if (
      target.closest("a") ||
      target.closest("button")
    ) {
      return;
    }

    /*
     * ถ้าเล่นครบทุก video แล้ว
     * ให้เริ่มใหม่ตั้งแต่ video 001
     */
    if (isFinished) {
      setVideoIndex(0);
      return;
    }

    /*
     * ถ้ายังมี video อยู่
     * ให้ลอง play จาก user interaction
     *
     * วิธีนี้สำคัญสำหรับ mobile browser
     * ที่อาจ block autoplay ตอนเปิดหน้า
     */
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();
    } catch (error) {
      console.warn(
        "Hero video play failed:",
        error
      );
    }
  };

  /* =====================================================
     VIDEO ENDED
  ====================================================== */

  const handleVideoEnded = () => {
    /*
     * ไม่มี video
     */
    if (currentMv.videos.length === 0) {
      return;
    }

    /*
     * ถ้ายังมี video ถัดไป
     *
     * 001 → 002
     * 002 → 003
     * 003 → 004
     * 004 → 005
     */
    if (
      videoIndex <
      currentMv.videos.length - 1
    ) {
      setVideoIndex(
        (current) => current + 1
      );

      return;
    }

    /*
     * video สุดท้ายจบแล้ว
     *
     * เปลี่ยนเป็น ending image
     * และหยุด animation
     */
    setVideoIndex(-1);
  };

  /* =====================================================
     CHANGE MV
  ====================================================== */

  const handleMvChange = (index: number) => {
    if (index === activeMv) {
      return;
    }

    setActiveMv(index);

    /*
     * MV ใหม่เริ่มจาก video แรก
     */
    setVideoIndex(0);
  };

  return (
    <section
      className={styles.hero}
      onClick={handleHeroClick}
    >
      {/* =====================================================
          CINEMATIC VIDEO
      ====================================================== */}

      <div
        className={styles.heroVisual}
        aria-hidden="true"
      >
        {isFinished &&
        currentMv.endingImage ? (
          /*
           * ENDING FRAME
           *
           * แสดงเมื่อ video ทั้งหมดเล่นจบ
           */
          <img
            src={currentMv.endingImage}
            alt=""
            className={`${styles.heroVideo} ${styles.active}`}
          />
        ) : currentVideo ? (
          /*
           * ACTIVE VIDEO
           */
          <video
            ref={videoRef}
            key={currentVideo}
            className={`${styles.heroVideo} ${styles.active}`}
            src={currentVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          />
        ) : (
          /*
           * FALLBACK
           */
          <div
            className={
              styles.heroVideoPlaceholder
            }
          />
        )}

        <div
          className={styles.heroColorGrade}
        />

        <div
          className={styles.heroVignette}
        />

        <div
          className={styles.heroGrain}
        />
      </div>

      {/* =====================================================
          TOP
      ====================================================== */}

      <div className={styles.heroTop}>
        {/* <div className={styles.heroEyebrow}>
          Lewlew CGM48 Fansite
        </div> */}

        {/* <div className={styles.mvSelector}>
          {mvScenes.map((mv, index) => (
            <button
              key={mv.id}
              type="button"
              className={`${styles.mvButton} ${
                index === activeMv
                  ? styles.mvButtonActive
                  : ""
              }`}
              onClick={() =>
                handleMvChange(index)
              }
              aria-label={`View ${mv.title}`}
              aria-pressed={
                index === activeMv
              }
            >
              <span>{mv.number}</span>

              <span
                className={
                  styles.mvButtonLine
                }
              />
            </button>
          ))}
        </div> */}
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className={styles.heroContent}>
        <div className={styles.heroCopy}>
          <div className={styles.heroChapter}>
            {/* <span>{currentMv.number}</span> */}

            <span>
              {currentMv.title}
            </span>

            <a
              href={currentMv.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                styles.mvWatchButton
              }
            >
              <span>Watch MV</span>

              <span>↗</span>
            </a>
          </div>

          <h1 className={styles.heroTitle}>
            <span>LEWLEW</span>

            <span
              className={styles.indent}
            >
              CGM48
            </span>

            <span
              className={styles.fullName}
            >
              Nutnicha Lertkiattikun
            </span>
          </h1>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className={styles.heroBottom}>
        <div className={styles.heroMood}>
          <span>
            {currentMv.subtitle}
          </span>

          <span
            className={
              styles.heroMoodLine
            }
          />
        </div>

        <a
          href="#about"
          className={
            styles.heroAboutButton
          }
        >
          <span>Meet Daddy!</span>

          <span
            className={
              styles.heroScrollArrow
            }
          >
            ↓
          </span>
        </a>

        <div className={styles.heroJourney}>
          <span
            className={
              styles.scrollLine
            }
          />

          <span>
            Moments begin here, Coming Soon.
          </span>
        </div>
      </div>
    </section>
  );
}