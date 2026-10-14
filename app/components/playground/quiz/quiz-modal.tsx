"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { toJpeg } from "html-to-image";
import Image from "next/image";
import styles from "./quiz-modal.module.css";
import { isQuizReady, quizQuestions } from "./quiz-data";

type QuizModalProps = {
  onClose: () => void;
};

const confettiPieces = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${(index % 12) * 0.045}s`,
  duration: `${1.8 + (index % 7) * 0.18}s`,
  rotation: `${(index * 47) % 360}deg`,
  color: ["#FBFDC5", "#E8E9D8", "#86A68A", "#D8B7A0", "#476661"][index % 5],
}));

function getResultMessage(score: number, questionCount: number) {
  if (score === 5) {
    return {
      title: "สุดยอดตัวเหล็ก!",
      description: "คุณคือตัวเหล็กตัวจริงของแด่ดดี๊ คิดถึงเสมอไม่เจอก็ร้าก",
    };
  }

  if (score >= 3) {
    return {
      title: "เก่งมากเลยนะ!",
      description: "คุณรู้จักแด๊ดดี้ดีมากขึ้นแล้ว",
    };
  }

  if (score >= 1) {
    return {
      title: "ไปกันต่อ!",
      description: "ยังมีเรื่องราวของแด๊ดดี้ให้ค้นพบอีกเยอะเลยนะค้าบ",
    };
  }

  return {
    title: "ยินดีด้วยค้าบ คุณคือ คนบด!!",
    description: "แต่ไม่เป็นไรน้า ไว้มาทำความรู้จักแดดดี๊กันใหม่",
  };
}

function getResultImage(score: number): string {
  if (score === 0) {
    return "/images/playground/quiz/lewlew-quiz-no-score-331001.jpg";
  }

  if (score <= 2) {
    return "/images/playground/quiz/lewlew-quiz-low-score.jpg";
  }

  if (score <= 4) {
    return "/images/playground/quiz/lewlew-quiz-good-score.jpg";
  }

  return "/images/playground/quiz/lewlew-quiz-perfect-score.jpg";
}

export default function QuizModal({ onClose }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const ready = isQuizReady();
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionCount = quizQuestions.length;
  const result = getResultMessage(score, questionCount);

  const handleDownloadResult = useCallback(async () => {
  const node = resultCardRef.current;

  if (!node || isDownloading) return;

  setIsDownloading(true);
  setDownloadError("");

  try {
    await document.fonts.ready;

    const width = node.offsetWidth;
    const height = node.offsetHeight;

    const dataUrl = await toJpeg(node, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: "#F7F6EF",
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
    link.download = `lewlew-quiz-result-${score}-${questionCount}.jpg`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Failed to download quiz result:", error);
    setDownloadError("ดาวน์โหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้งนะครับ");
  } finally {
    setIsDownloading(false);
  }
}, [isDownloading, score, questionCount]);

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Keep keyboard focus inside the modal.
      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements =
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || isQuizFinished || !ready) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQuestion.correctAnswerIndex) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (currentQuestionIndex === questionCount - 1) {
      setIsQuizFinished(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Lewlew Daddy Club Quiz"
        aria-describedby="quiz-description"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="ปิดเกม"
        >
          <span aria-hidden="true">×</span>
        </button>

        {!ready ? (
          <div className={styles.setupState}>
            <span className={styles.eyebrow}>A LITTLE GAME FOR YOU</span>
            <div className={styles.sticker} aria-hidden="true">
              ♡
            </div>
            <h2 className={styles.title}>กำลังเตรียมเกมอยู่นะ!</h2>
            <p id="quiz-description" className={styles.description}>
              แบบทดสอบยังมีคำถามหรือเฉลยที่กรอกไม่ครบ กรุณาเติมข้อมูลให้ครบทั้ง
              10 ข้อใน quiz-data.ts ก่อนเริ่มเล่น
            </p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={onClose}
            >
              กลับไป Playground
            </button>
          </div>
        ) : isQuizFinished ? (
          <div className={styles.resultState} aria-live="polite">
            <div className={styles.confetti} aria-hidden="true">
              {confettiPieces.map((piece) => (
                <span
                  key={piece.id}
                  className={styles.confettiPiece}
                  style={
                    {
                      "--confetti-left": piece.left,
                      "--confetti-delay": piece.delay,
                      "--confetti-duration": piece.duration,
                      "--confetti-rotation": piece.rotation,
                      "--confetti-color": piece.color,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            {/* ส่วนนี้เท่านั้นที่จะถูกบันทึกเป็น JPG */}
            <div ref={resultCardRef} className={styles.downloadableResult}>
              <span className={styles.eyebrow}>YOUR LITTLE MEMORY</span>

              <div className={styles.resultImage}>
                <Image
                  src={getResultImage(score)}
                  alt={`ภาพผลคะแนน ${score} จาก ${questionCount} คะแนน`}
                  fill
                  sizes="320px"
                  className={styles.resultPhoto}
                />
              </div>

              <p className={styles.scoreLabel}>YOUR SCORE</p>

              <p className={styles.score}>
                {score}
                <span> / {questionCount}</span>
              </p>

              <h2 className={styles.title}>{result.title}</h2>

              <p className={styles.description}>{result.description}</p>
            </div>

            {/* ปุ่มอยู่นอกภาพ จึงไม่ติดไปใน JPG */}
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
                onClick={handleRestart}
              >
                Play Again ↻
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onClose}
              >
                กลับไป Playground
              </button>
            </div>

            {downloadError && (
              <p role="alert" className={styles.downloadError}>
                {downloadError}
              </p>
            )}
          </div>
        ) : (
          <div className={styles.gameState}>
            <div className={styles.gameHeader}>
              <span className={styles.eyebrow}>LEWLEW DADDY CLUB GAME</span>
              <span className={styles.scoreBadge}>♡ {score} points</span>
            </div>

            <div className={styles.progressInfo}>
              <span>QUESTION {currentQuestionIndex + 1}</span>
              <span>{questionCount} QUESTIONS</span>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="ความคืบหน้าของเกม"
              aria-valuemin={0}
              aria-valuemax={questionCount}
              aria-valuenow={currentQuestionIndex + 1}
            >
              <div
                className={styles.progressBar}
                style={{
                  width: `${((currentQuestionIndex + 1) / questionCount) * 100}%`,
                }}
              />
            </div>

            <div className={styles.questionArea}>
              <span className={styles.questionSticker} aria-hidden="true">
                {currentQuestionIndex % 2 === 0 ? "✿" : "♡"}
              </span>

              <h2 className={styles.question}>{currentQuestion.question}</h2>

              <p id="quiz-description" className={styles.description}>
                เลือกคำตอบที่คิดว่าถูกที่สุดได้เพียงหนึ่งข้อ
              </p>
            </div>

            <div className={styles.choices}>
              {currentQuestion.choices.map((choice, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswerIndex;

                let stateClass = "";

                if (selectedAnswer !== null && isSelected) {
                  stateClass = isCorrect ? styles.correct : styles.incorrect;
                } else if (selectedAnswer !== null && isCorrect) {
                  stateClass = styles.revealCorrect;
                }

                return (
                  <button
                    key={`${currentQuestion.id}-${index}`}
                    type="button"
                    className={`${styles.choice} ${stateClass}`}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.choiceLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={styles.choiceText}>{choice}</span>
                    {selectedAnswer !== null && isSelected && (
                      <span className={styles.answerIcon} aria-hidden="true">
                        {isCorrect ? "✓" : "✕"}
                      </span>
                    )}
                    {selectedAnswer !== null && !isSelected && isCorrect && (
                      <span className={styles.answerIcon} aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className={styles.feedback} aria-live="polite">
                <p
                  className={
                    selectedAnswer === currentQuestion.correctAnswerIndex
                      ? styles.feedbackCorrect
                      : styles.feedbackIncorrect
                  }
                >
                  {selectedAnswer === currentQuestion.correctAnswerIndex
                    ? "เก่งมาก! ตอบถูกแล้ว ♡"
                    : "ไม่เป็นไรนะ ลองข้อต่อไปกัน!"}
                </p>

                {currentQuestion.explanation && (
                  <p className={styles.explanation}>
                    {currentQuestion.explanation}
                  </p>
                )}

                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleNext}
                  autoFocus
                >
                  {currentQuestionIndex === questionCount - 1
                    ? "See My Result ✨"
                    : "Next Question →"}
                </button>
              </div>
            )}

            {/* <p className={styles.gameFooter}>EVERY MOMENT BEGINS WITH YOU.</p> */}
          </div>
        )}
      </div>
    </div>
  );
}
