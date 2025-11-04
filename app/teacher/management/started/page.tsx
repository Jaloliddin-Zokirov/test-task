"use client";

import { postQuizzesFinish } from "@/api/quizzes/quizzes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Started = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const interval = setInterval(async () => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval); // timer tugagach intervalni to‘xtatamiz

          // API chaqirish
          const quizId = localStorage.getItem("quiz_id");
          if (quizId) {
            postQuizzesFinish(quizId, {})
                .then((res: any) => {
                  // scoreboard ichidan rank 1 talabaning ma'lumotini olish
                  const topStudent = res?.scoreboard?.find((s: any) => s.rank === 1);
                  if (topStudent) {
                    localStorage.setItem("top_student", JSON.stringify(topStudent));
                  }
  
                  // Natijalar sahifasiga yo'naltirish
                  router.push("/teacher/management/results");
                })
                .catch((err: any) => console.error("Quiz jo'natishda xatolik:", err));
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="absolute top-4 w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Test boshlandi</h2>
          
          <div className="w-3xs h-32 bg-black rounded-2xl py-2 px-8 place-items-center justify-center flex flex-col gap-4 cursor-pointer">
            <p className="w-full mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">Tugashiga {timeLeft} soniya qoldi</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Started