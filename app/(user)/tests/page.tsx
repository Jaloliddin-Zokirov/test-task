"use client";

import { postQuizzesAnswers } from "@/api/quizzes/quizzes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const isClient = typeof window !== 'undefined';

interface Choice {
  id: number;
  text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  text: string;
  choices: Choice[];
}

const Tests = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswered, setAllAnswered] = useState(false);
  const [timer, setTimer] = useState<number>(() => {
    if (isClient) {
      const savedTimer = localStorage.getItem("timer");
      return savedTimer ? JSON.parse(savedTimer) : 0;
    }
    return 0;
  });
  const [answers, setAnswers] = useState<{ [key: number]: { choice_id: number, latency_ms: number } }>({});
  const answerStartRef = useRef(Date.now()); // Savolga javob bosilganda vaqtni hisoblash uchun

  // Timer <= 0 bo'lganda ham javoblarni yuborish
  useEffect(() => {
    if (timer <= 0) {
      sendAnswers(answers);
      router.push("/results");
    }
  }, [timer]);

  const sendAnswers = async (answersObj: typeof answers) => {
    if (!isClient) return;

    const room_code = JSON.parse(localStorage.getItem("room_code") || "null");
    const student_idStr = localStorage.getItem("student_id");

    if (!room_code || !student_idStr) {
      toast.error("room_code yoki student_id mavjud emas!");
      return;
    }

    const student_id = Number(student_idStr);
    if (Number.isNaN(student_id)) {
      toast.error("student_id noto'g'ri formatda!");
      return;
    }

    const payload = {
      answers: Object.entries(answersObj).map(([question_id, data]) => ({
        question_id: Number(question_id),
        choice_id: data.choice_id,
        latency_ms: data.latency_ms
      }))
    };

    await postQuizzesAnswers(room_code, student_id, payload)
      .then(() => toast.success("Javoblar yuborildi!"))
      .catch(() => toast.error("Xatolik yuz berdi!"));
  };

  useEffect(() => {
    if (isClient) {
      const saved = JSON.parse(localStorage.getItem("questions") || "[]");
      setQuestions(saved);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("timer", JSON.stringify(timer));
    }
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      router.push("/results");
    }
  }, [timer, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (choiceId: number) => {
    const currentQuestion = questions[currentIndex];
    const latency = Date.now() - answerStartRef.current;

    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [currentQuestion.id]: {
          choice_id: choiceId,
          latency_ms: latency
        }
      };

      // Agar barcha savollar javoblangan bo'lsa
      if (Object.keys(newAnswers).length === questions.length) {
        setAllAnswered(true); // o'rtada yakuniy ekranni ko'rsatish
        sendAnswers(newAnswers); // javoblarni yuborish
      }

      return newAnswers;
    });

    // Keyingi savolga o'tish
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      answerStartRef.current = Date.now(); // keyingi savol uchun timer reset
    }
  };

  if (questions.length === 0) return <div>Yuklanmoqda...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
        {!allAnswered ? (
          <>
            <h2 className="absolute top-4 w-2xl text-4xl font-bold !py-4 bg-black text-white text-center rounded-2xl">To’g’ri javobni tanlang</h2>
            <div className="absolute top-36 bg-black rounded-2xl py-2 px-8">
              <h3 className="w-full text-4xl font-bold !py-4 bg-black text-white text-center rounded-2xl">{currentQuestion.text}</h3>
            </div>
            
            <ol className="flex items-center gap-4">
              {currentQuestion.choices.map(choice => (
                <li className="bg-black rounded-2xl py-2 px-4 text-white font-bold text-xl" key={choice.id}>
                  <Button onClick={() => handleAnswer(choice.id)} className="cursor-pointer">{choice.text}</Button>
                </li>
              ))}
            </ol>
            
            <Button className="absolute right-8 bottom-8">Tugashiga {timer} soniya qoldi</Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-96 w-full">
            <h2 className="text-8xl font-bold text-black text-center">Tugashiga {timer} soniya qoldi</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tests