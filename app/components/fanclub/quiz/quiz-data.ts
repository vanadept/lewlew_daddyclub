export type QuizQuestion = {
  id: number;
  question: string;
  choices: [string, string, string, string];
  correctAnswerIndex: number;
  explanation?: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "1.หลิวหลิวมีชื่อจริงว่าอะไรค้าบ?",
    choices: ["ณัฏฐณิชา สุภาพงษ์", "ณัฐณิชา เลิศเกียรติคุณ", "ณัฏฐณิชา มากมี", "ณัฏฐณิชา เลิศเกียรติคุณ"],
    correctAnswerIndex: 1,
    explanation: "คำตอบคือข้อ2 ครับ",
  },
  {
    id: 2,
    question: "2.หลิวหลิวเป็น center เพลงอะไรค้าบ?",
    choices: ["รถไฟแห่งความฝัน", "รถไฟแห่งความหวัง", "รถไฟสายรุ้ง", "สิ้นสุดทางแพ้"],
    correctAnswerIndex: 1,
    explanation: "รถไฟแห่งความหวัง ครับ",
  },
  {
    id: 3,
    question: "3.หลิวหลิวเป็นเมมเบอร์ CGM48 รุ่นที่เท่าไหร่ค้าบ?",
    choices: ["รุ่น 2", "รุ่น 3", "รุ่น 4", "รุ่น 5"],
    correctAnswerIndex: 3,
    explanation: "คำตอบคือ รุ่น 5 ครับ",
  },
  {
    id: 4,
    question: "4.เพลงเดบิวต์ของหลิวหลิวอยู่ใน Single ที่เท่าไหร่นะค้าบ?",
    choices: ["Single ที่ 9", "Single ที่ 10", "Single ที่ 11", "Single ที่ 12"],
    correctAnswerIndex: 2,
    explanation: "คำตอบคือ Single ที่ 11 ครับ",
  },
  {
    id: 5,
    question: "5.ฉายาแด่ดดี๊ของหลิวหลิวมาจากไหนค้าบ?",
    choices: ["ไลฟ์วันที่ 28 Jul 2026", "RS วันที่ 28 Jul 2026", "ไลฟ์วันที่ 5 Aug 2026", "RS วันที่ 28 Jul 2026"],
    correctAnswerIndex: 0,
    explanation: "คำตอบคือ ไลฟ์วันที่ 28 Jul 2026 ครับ",
  },
];


// ตรวจสอบข้อมูลก่อนเปิดให้เล่น เพื่อไม่ให้มีคำถามที่ยังกรอกไม่ครบ
export function isQuizReady(): boolean {
  return (
    quizQuestions.length === 5 &&
    quizQuestions.every(
      (question) =>
        question.question.trim().length > 0 &&
        question.choices.every((choice) => choice.trim().length > 0) &&
        Number.isInteger(question.correctAnswerIndex) &&
        question.correctAnswerIndex >= 0 &&
        question.correctAnswerIndex < 4,
    )
  );
}

