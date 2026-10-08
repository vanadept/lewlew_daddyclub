"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  },

  {
    id: "kimitodoko",
    number: "02",
    title: "KIMITODOKO",
    subtitle: "WHERE THE JOURNEY LEADS",
    videos: [],
  },
];

const FRAME_DURATION = 5000;

export default function Hero() {
  const [activeMv, setActiveMv] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentMv = mvScenes[activeMv];

  const currentVideo = currentMv.videos[activeVideo] ?? null;

  /* =====================================================
     PLAY CURRENT VIDEO
  ====================================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !currentVideo) return;

    video.load();

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser อาจ block autoplay
      });
    }
  }, [currentVideo]);

  /* =====================================================
     VIDEO ENDED
  ====================================================== */

  const handleVideoEnded = () => {
    if (!currentMv.videos.length) return;

    setActiveVideo((current) => {
      return (current + 1) % currentMv.videos.length;
    });
  };

  /* =====================================================
     CHANGE MV
  ====================================================== */

  const handleMvChange = (index: number) => {
    if (index === activeMv) return;

    setActiveMv(index);
    setActiveVideo(0);
  };

  return (
    <section className={styles.hero}>
      {/* =====================================================
          CINEMATIC VIDEO
      ====================================================== */}

      <div className={styles.heroVisual} aria-hidden="true">
        {currentVideo ? (
          <video
            ref={videoRef}
            key={`${currentMv.id}-${activeVideo}`}
            className={styles.heroVideo}
            src={currentVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          />
        ) : (
          <div className={styles.heroVideoPlaceholder} />
        )}

        <div className={styles.heroColorGrade}></div>

        <div className={styles.heroVignette}></div>

        <div className={styles.heroGrain}></div>
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
              onClick={() => handleMvChange(index)}
              aria-label={`View ${mv.title}`}
              aria-pressed={index === activeMv}
            >
              <span>{mv.number}</span>

              <span className={styles.mvButtonLine}></span>
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
            <span>{currentMv.title}</span>

            <a
              href={currentMv.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mvWatchButton}
            >
              <span>Watch MV</span>
              <span>↗</span>
            </a>
          </div>

          <h1 className={styles.heroTitle}>
            <span>LEWLEW</span>

            <span className={styles.indent}>CGM48</span>

            <span className={styles.fullName}>Nutnicha Lertkiattikun</span>
          </h1>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className={styles.heroBottom}>
        <div className={styles.heroMood}>
          <span>{currentMv.subtitle}</span>

          <span className={styles.heroMoodLine} />
        </div>

        <a href="#about" className={styles.heroAboutButton}>
          <span>Meet Daddy!</span>

          <span className={styles.heroScrollArrow}>↓</span>
        </a>

        <div className={styles.heroJourney}>
          <span className={styles.scrollLine} />

          <span>Moments begin here, Coming Soon.</span>
        </div>
      </div>
    </section>
  );
}
