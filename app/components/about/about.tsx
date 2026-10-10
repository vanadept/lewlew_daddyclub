"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./about.module.css";

// =========================================================
// PROFILE DATA
// =========================================================

type Profile = {
  id: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  label: string;
};

const profiles: Profile[] = [
  {
    id: "profile-01",
    image: "/images/profile/lewlew_profile_331_1.jpg",
    backgroundColor: "#ffffff",
    textColor: "#353D34",
    label: "PROFILE 01",
  },
  {
    id: "profile-02",
    image: "/images/profile/lewlew_profile_331_2.jpg",
    backgroundColor: "#476661",
    textColor: "#F7F6EF",
    label: "PROFILE 02",
  },
  {
    id: "profile-03",
    image: "/images/profile/lewlew_profile_331_3.jpg",
    backgroundColor: "#d2d4be",
    textColor: "#353D34",
    label: "PROFILE 03",
  },
  {
    id: "profile-04",
    image: "/images/profile/lewlew_profile_331_4.jpg",
    backgroundColor: "##eee3df",
    textColor: "#353D34",
    label: "PROFILE 04",
  },
];

export default function About() {
  // =========================================================
  // PROFILE STATE
  // =========================================================

  const [selectedProfileId, setSelectedProfileId] = useState(profiles[0].id);

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suppressClickRef = useRef(false);

  const selectedProfile =
    profiles.find((profile) => profile.id === selectedProfileId) ?? profiles[0];

  const clearHoldTimer = () => {
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  // =========================================================
  // AVATAR INTERACTION
  // Mobile: press and hold
  // Desktop: click
  // =========================================================

  const handleAvatarPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (event.pointerType !== "touch") {
      return;
    }

    clearHoldTimer();
    suppressClickRef.current = false;

    holdTimerRef.current = setTimeout(() => {
      suppressClickRef.current = true;
      setIsGalleryOpen(true);
      holdTimerRef.current = null;
    }, 450);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    // Desktop and keyboard activation.
    // A normal short tap also opens the gallery as a fallback.
    if (event.detail === 0 || event.detail > 0) {
      setIsGalleryOpen(true);
    }
  };

  // =========================================================
  // SELECT PROFILE
  // =========================================================

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setIsGalleryOpen(false);
  };

  // =========================================================
  // MODAL CONTROLS
  // =========================================================

  useEffect(() => {
    if (!isGalleryOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    return () => {
      clearHoldTimer();
    };
  }, []);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <div
          className={styles.aboutCard}
          style={
            {
              "--about-card-background": selectedProfile.backgroundColor,
              "--about-text-color": selectedProfile.textColor,
              "--about-divider-color":
                selectedProfile.textColor === "#F7F6EF"
                  ? "rgba(247, 246, 239, 0.35)"
                  : "rgba(53, 61, 52, 0.22)",
            } as CSSProperties
          }
        >
          {/* SOCIAL LINKS */}
          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com/lewlew.cgm48official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.7V13h2.7v8z"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/lewlew.cgm48official/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3.5"
                  y="3.5"
                  width="17"
                  height="17"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@lewlew.cgm485thgen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19.6 8.2a7.1 7.1 0 0 1-4.2-1.4v8.1a5.6 5.6 0 1 1-5.6-5.6c.4 0 .8 0 1.2.1v3.1a2.6 2.6 0 1 0 1.5 2.4V2.8h3a4.2 4.2 0 0 0 4.1 4.2z"
                />
              </svg>
            </a>
          </div>

          {/* PROFILE */}
          <div className={styles.aboutProfile}>
            <button
              type="button"
              className={styles.aboutAvatar}
              aria-label="Open Lewlew profile gallery"
              aria-haspopup="dialog"
              onPointerDown={handleAvatarPointerDown}
              onPointerUp={clearHoldTimer}
              onPointerLeave={clearHoldTimer}
              onPointerCancel={clearHoldTimer}
              onClick={handleAvatarClick}
            >
              <Image
                src={selectedProfile.image}
                alt="LEWLEW"
                width={1000}
                height={1000}
                className={styles.aboutAvatarImage}
                priority
              />
            </button>

            <div className={styles.aboutProfileLabel}>
              {/* Future profile metadata */}
            </div>
          </div>

          {/* INFORMATION */}
          <div className={styles.aboutInfo}>
            <div className={styles.aboutHeading}>
              <span className={styles.aboutHeadingEnglish}>LEWLEW</span>

              <span className={styles.aboutHeadingThai}>(หลิวหลิว)</span>
            </div>

            {/* FULL NAME */}
            <div className={styles.aboutFullName}>
              <h2 className={styles.aboutNameEnglish}>
                Nutnicha Lertkiattikun
              </h2>

              <p className={styles.aboutNameThai}>ณัฐณิชา เลิศเกียรติคุณ</p>
            </div>

            <p className={styles.aboutDescription}>
              สมาชิกวง CGM48 รุ่นที่ 5 พี่คนโตของรุ่น
              ที่ใครเห็นเป็นต้องตกหลุมรัก ด้วยความน่ารัก สดใส
              ถึงแม้จะชอบขายขำมากกว่าขายสวยก็ตาม
            </p>

            {/* DETAILS */}
            <div className={styles.aboutDetails}>
              <div className={styles.aboutDetail}>
                <span>Date of Birth</span>
                <strong>24-12-2006</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Birthplace</span>
                <strong>Phitsanulok</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Blood type</span>
                <strong>O</strong>
              </div>

              <div className={styles.aboutDetail}>
                <span>Hobby</span>
                <strong>-</strong>
              </div>
            </div>

            {/* EXPANDABLE PROFILE DETAILS */}
            <div className={styles.profileExpansion}>
              <button
                type="button"
                className={styles.profileExpandButton}
                onClick={() => setIsDetailsExpanded((current) => !current)}
                aria-expanded={isDetailsExpanded}
                aria-controls="profile-extra-details"
              >
                <span className={styles.profileExpandCopy}>
                  <span className={styles.profileExpandTitle}>
                    {isDetailsExpanded
                      ? "Show less"
                      : "ทำความรู้จักหลิวหลิวให้มากขึ้น"}
                  </span>

                  {/* <span className={styles.profileExpandSubtitle}>
                    PERSONALITY · INTERESTS · FAVORITES
                  </span> */}
                </span>

                <span
                  className={`${styles.profileExpandIcon} ${
                    isDetailsExpanded ? styles.profileExpandIconActive : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {isDetailsExpanded && (
                <div
                  id="profile-extra-details"
                  className={styles.profileExtraDetails}
                >
                  <div className={styles.profileExtraItem}>
                    <span>AKA / ฉายา</span>
                    <strong>แด๊ดดี้</strong>
                  </div>

                  <div className={styles.profileExtraItem}>
                    <span>Special Skill</span>
                    <strong>เล่นกีต้าร์</strong>
                  </div>

                  <div className={styles.profileExtraItem}>
                    <span>Favorite</span>
                    <strong>—</strong>
                  </div>

                  {/* <div className={styles.profileExtraItem}>
                    <span>Personality</span>
                    <strong>—</strong>
                  </div> */}

                  <div className={styles.profileExtraItem}>
                    <span>Fun Fact</span>
                    <strong>—</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ORBITAL PROFILE GALLERY MODAL
      ===================================================== */}

      {isGalleryOpen && (
        <div
          className={styles.galleryOverlay}
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className={styles.galleryModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-gallery-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.galleryHeader}>
              <button
                type="button"
                className={styles.galleryClose}
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Close profile gallery"
              >
                ×
              </button>
            </div>

            {/* ORBIT STAGE */}
            <div className={styles.orbitStage}>
              {/* <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`} /> */}

              <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} />

              {/* OTHER PROFILES — BACK LAYER */}
              {profiles
                .filter((profile) => profile.id !== selectedProfileId)
                .map((profile, index) => {
                  // Diagonal Orbit — top-left, top-right, bottom-right
                  const orbitPositions = [
                    { x: -155, y: -105 },
                    { x: 155, y: -95 },
                    { x: 155, y: 105 },
                  ];

                  const { x, y } = orbitPositions[index];

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      className={styles.orbitAvatar}
                      style={
                        {
                          "--orbit-x": `${x}px`,
                          "--orbit-y": `${y}px`,
                          "--orbit-index": index,
                        } as React.CSSProperties
                      }
                      onClick={() => handleSelectProfile(profile.id)}
                      aria-label={`Select ${profile.label}`}
                    >
                      <Image
                        src={profile.image}
                        alt={`Lewlew ${profile.label}`}
                        width={450}
                        height={450}
                        className={styles.orbitAvatarImage}
                      />

                      <span className={styles.orbitAvatarLabel}>
                        {profile.label}
                      </span>
                    </button>
                  );
                })}

              {/* CURRENT PROFILE — FRONT LAYER */}
              <button
                type="button"
                className={styles.orbitAvatarCurrent}
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Keep current profile"
                aria-current="true"
              >
                <Image
                  src={selectedProfile.image}
                  alt="Current Lewlew profile"
                  width={500}
                  height={500}
                  className={styles.orbitAvatarImage}
                  priority
                />

                <span className={styles.currentProfileIndicator}>CURRENT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
