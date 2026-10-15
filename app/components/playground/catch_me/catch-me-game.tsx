"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { toJpeg } from "html-to-image";

import styles from "./catch-me-game.module.css";

const GAME_DURATION = 30;
const TARGET_IMAGE = "/images/playground/game2/3312935_000A11.png";

const ITEM_IMAGES = [
  TARGET_IMAGE,
  "/images/playground/game2/3312935_000A12.png",
  "/images/playground/game2/3312935_000A13.png",
  "/images/playground/game2/3312935_000A14.png",
  "/images/playground/game2/3312935_000A15.png",
] as const;

const RESULT_WON_IMAGE = "/images/playground/game2/002331-result-won.jpg";

const RESULT_DEFEAT_IMAGE = "/images/playground/game2/002331-result-defaet.jpg";

// ปรับขนาดไอเทมให้มองเห็นได้ง่ายขึ้น
const ITEM_SIZE = 76;

// ลดขนาด Player เพื่อเพิ่มความยากในการรับไอเทม
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 16;
const PLAYER_BOTTOM = 20;

const SPAWN_INTERVAL = 650;
const TICK_INTERVAL = 30;

type FallingItem = {
  id: number;
  src: string;
  x: number;
  y: number;
  speed: number;
};

type CatchGameProps = {
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

export default function CatchGame({ onClose, returnFocusRef }: CatchGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [playerX, setPlayerX] = useState(50);
  const [gameError, setGameError] = useState("");

  const arenaRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const itemsRef = useRef<FallingItem[]>([]);
  const nextIdRef = useRef(0);
  const scoreRef = useRef(0);
  const [redFlag, setRedFlag] = useState(0);
  const redFlagRef = useRef(0);
  const isPlayingRef = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  const resultCardRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const closeGame = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    onCloseRef.current();
  }, []);

  const updatePlayerPosition = useCallback((clientX: number) => {
    const arena = arenaRef.current;
    if (!arena) return;

    const rect = arena.getBoundingClientRect();
    if (!rect.width) return;

    const halfPlayerPercent = (PLAYER_WIDTH / 2 / rect.width) * 100;
    const nextX = Math.max(
      halfPlayerPercent,
      Math.min(
        100 - halfPlayerPercent,
        ((clientX - rect.left) / rect.width) * 100,
      ),
    );

    playerXRef.current = nextX;
    setPlayerX(nextX);
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isPlayingRef.current) return;
      updatePlayerPosition(event.clientX);
    },
    [updatePlayerPosition],
  );

  const startGame = useCallback(() => {
    itemsRef.current = [];
    nextIdRef.current = 0;

    scoreRef.current = 0;
    redFlagRef.current = 0;
    playerXRef.current = 50;
    isPlayingRef.current = true;

    setItems([]);
    setScore(0);
    setRedFlag(0);
    setTimeLeft(GAME_DURATION);
    setPlayerX(50);
    setGameError("");
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGame();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      isPlayingRef.current = false;
      returnFocusRef?.current?.focus();
    };
  }, [closeGame, returnFocusRef]);

  useEffect(() => {
    let cancelled = false;

    async function preloadImages() {
      try {
        await Promise.all(
          ITEM_IMAGES.map(
            (src) =>
              new Promise<void>((resolve, reject) => {
                const image = new window.Image();
                image.onload = () => resolve();
                image.onerror = () =>
                  reject(new Error(`โหลดภาพไม่สำเร็จ: ${src}`));
                image.src = src;
              }),
          ),
        );

        if (!cancelled) setIsReady(true);
      } catch {
        if (!cancelled) {
          setGameError(
            "โหลดภาพเกมไม่สำเร็จ กรุณาตรวจสอบไฟล์ภาพใน public/images/playground/game2/",
          );
        }
      }
    }

    void preloadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = 0;
    let spawnElapsed = 0;
    let timerElapsed = 0;
    let animationFrame = 0;
    let lastRender = 0;

    const tick = (timestamp: number) => {
      if (!isPlayingRef.current) return;

      if (!lastTime) lastTime = timestamp;
      const delta = Math.min(timestamp - lastTime, 50);
      lastTime = timestamp;

      spawnElapsed += delta;
      timerElapsed += delta;

      const arena = arenaRef.current;
      if (!arena) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      const arenaHeight = arena.clientHeight;
      const arenaWidth = arena.clientWidth;

      if (spawnElapsed >= SPAWN_INTERVAL) {
        spawnElapsed %= SPAWN_INTERVAL;

        const src = ITEM_IMAGES[Math.floor(Math.random() * ITEM_IMAGES.length)];
        const maxX = Math.max(0, arenaWidth - ITEM_SIZE);

        itemsRef.current.push({
          id: nextIdRef.current++,
          src,
          x: Math.random() * maxX,
          y: -ITEM_SIZE,
          speed: 100 + Math.random() * 100,
        });
      }

      const playerLeft =
        (playerXRef.current / 100) * arenaWidth - PLAYER_WIDTH / 2;
      const playerTop = arenaHeight - PLAYER_BOTTOM - PLAYER_HEIGHT;

      const remaining: FallingItem[] = [];
      let gainedPoints = 0;
      let gainedRedFlags = 0;

      for (const item of itemsRef.current) {
        item.y += (item.speed * delta) / 1000;

        const overlaps =
          item.x < playerLeft + PLAYER_WIDTH &&
          item.x + ITEM_SIZE > playerLeft &&
          item.y < playerTop + PLAYER_HEIGHT &&
          item.y + ITEM_SIZE > playerTop;

        if (overlaps) {
          if (item.src === TARGET_IMAGE) {
            gainedPoints += 1;
          } else {
            gainedRedFlags += 1;
          }

          // ชนแล้วนำไอเทมออกจากสนามทุกชนิด
          continue;
        }

        if (item.y < arenaHeight) {
          remaining.push(item);
        }
      }

      itemsRef.current = remaining;

      if (gainedPoints > 0) {
        scoreRef.current += gainedPoints;
        setScore(scoreRef.current);
      }

      if (gainedRedFlags > 0) {
        redFlagRef.current += gainedRedFlags;
        setRedFlag(redFlagRef.current);
      }

      if (timestamp - lastRender >= TICK_INTERVAL) {
        lastRender = timestamp;
        setItems([...remaining]);
      }

      if (timerElapsed >= 1000) {
        const secondsElapsed = Math.floor(timerElapsed / 1000);
        timerElapsed -= secondsElapsed * 1000;

        setTimeLeft((previous) => {
          const next = Math.max(0, previous - secondsElapsed);

          if (next === 0) {
            isPlayingRef.current = false;
            setIsPlaying(false);
          }

          return next;
        });
      }

      if (isPlayingRef.current) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const handleArenaPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isPlayingRef.current) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      updatePlayerPosition(event.clientX);
    },
    [updatePlayerPosition],
  );

  const isGameOver = !isPlaying && timeLeft === 0;

  const isDefeated = redFlag > score;

  const resultImage = isDefeated ? RESULT_DEFEAT_IMAGE : RESULT_WON_IMAGE;

  const handleDownloadResult = useCallback(async () => {
    const node = resultCardRef.current;

    if (!node || isDownloading) return;

    setIsDownloading(true);
    setDownloadError("");

    try {
      await document.fonts.ready;

      // รอให้ browser วาดผลลัพธ์และรูปภาพให้เรียบร้อย
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );

      const width = node.offsetWidth;
      const height = node.offsetHeight;

      if (!width || !height) {
        throw new Error("Result card has no dimensions");
      }

      const dataUrl = await toJpeg(node, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#F8F7F0",
        cacheBust: true,
        width,
        height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          margin: "0",
          transform: "none",
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `lewlew-catch-result-score-${score}-redflag-${redFlag}.jpg`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download catch game result:", error);
      setDownloadError("ดาวน์โหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้งนะครับ");
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, score, redFlag]);

  return (
    <div className={styles.backdrop}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catch-game-title"
        aria-describedby="catch-game-description"
      >
        <header className={styles.header}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>LEWLEW DADDY CLUB</span>
            <h2 id="catch-game-title" className={styles.title}>
              เห็นอย่างงี้ แดดดี๊ทั้งใจ
            </h2>
            <p id="catch-game-description" className={styles.description}>
              เก็บภาพหลิวหลิวให้ได้มากที่สุดภายใน 30 วินาที
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={closeGame}
            aria-label="ปิดเกมและกลับไป Playground"
          >
            ×
          </button>
        </header>

        {gameError ? (
          <div className={styles.message} role="alert">
            <p>{gameError}</p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => window.location.reload()}
            >
              โหลดหน้าใหม่
            </button>
          </div>
        ) : !isReady ? (
          <div className={styles.message} role="status">
            กำลังเตรียมภาพสำหรับเกม...
          </div>
        ) : (
          <>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>SCORE</span>
                <strong className={styles.statValue} aria-live="polite">
                  {score}
                </strong>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statLabel}>RED FLAG</span>
                <strong
                  className={styles.statValue}
                  data-red-flag="true"
                  aria-live="polite"
                >
                  {redFlag}
                </strong>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statLabel}>TIME LEFT</span>
                <strong
                  className={styles.statValue}
                  aria-live="off"
                  data-urgent={timeLeft <= 5 && isPlaying}
                >
                  00:{String(timeLeft).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div
              ref={arenaRef}
              className={styles.arena}
              onPointerDown={handleArenaPointerDown}
              onPointerMove={handlePointerMove}
              onContextMenu={(event) => event.preventDefault()}
              aria-label="พื้นที่เล่นเกม ลากเพื่อควบคุมแท่งรับไอเทม"
            >
              <span className={styles.arenaLabel} aria-hidden="true">
                CATCH ME, IF YOU CAN
              </span>

              {items.map((item) => (
                <div
                  key={item.id}
                  className={styles.fallingItem}
                  style={{
                    left: item.x,
                    top: item.y,
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                  }}
                  aria-hidden="true"
                >
                  <Image
                    src={item.src}
                    alt=""
                    width={ITEM_SIZE}
                    height={ITEM_SIZE}
                    draggable={false}
                    sizes={`${ITEM_SIZE}px`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}

              <div
                className={styles.player}
                style={{
                  left: `${playerX}%`,
                  width: PLAYER_WIDTH,
                  height: PLAYER_HEIGHT,
                }}
                aria-hidden="true"
              />

              {!isPlaying && !isGameOver && (
                <div className={styles.overlayMessage}>
                  <span className={styles.eyebrow}>READY, DADDY?</span>
                  <p>พร้อมเก็บความน่ารักหรือยัง?</p>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={startGame}
                  >
                    เริ่มเกม
                  </button>
                </div>
              )}
            </div>

            <p className={styles.hint}>
              ลากเมาส์หรือแตะลากในสนามเพื่อรับภาพหลิวหลิว
            </p>

            {isGameOver && (
              <div className={styles.overlayMessage} aria-live="polite">
                <div ref={resultCardRef} className={styles.downloadableResult}>
                  <span className={styles.eyebrow}>LEWLEW DADDY CLUB</span>

                  <h3>
                    {isDefeated ? "ฮั่นแน่ ไอ้พวกคนบด !!" : "เก่งมากเลยค้าบ ♡"}
                  </h3>

                  <div
                    className={`${styles.resultImage} ${
                      !isDefeated ? styles.resultWonImage : ""
                    }`}
                  >
                    <Image
                      src={resultImage}
                      alt={isDefeated ? "ผลลัพธ์ Red Flag" : "ผลลัพธ์ผู้ชนะ"}
                      width={600}
                      height={400}
                      sizes="(max-width: 600px) 85vw, 600px"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <p>
                    {isDefeated
                      ? "Red Flag เยอะกว่าคะแนนปกติแล้วนะค้าบ"
                      : "คุณคือตัวเหล็กของแด่ดดี๊"}
                  </p>

                  <p>
                    คะแนนปกติ <strong>{score}</strong>
                    {" · "}
                    Red Flag <strong>{redFlag}</strong>
                  </p>
                </div>

                <div className={styles.resultActions}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleDownloadResult}
                    disabled={isDownloading}
                  >
                    {isDownloading ? "กำลังบันทึกภาพ..." : "Download JPG ↓"}
                  </button>

                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={startGame}
                  >
                    เล่นอีกครั้ง
                  </button>

                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={closeGame}
                  >
                    กลับไป Playground
                  </button>
                </div>

                {downloadError && <p role="alert">{downloadError}</p>}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
