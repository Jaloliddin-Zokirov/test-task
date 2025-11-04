"use client";

import { postQuizzesResults } from "@/api/quizzes/quizzes";
import { useEffect, useState } from "react";

const isClient = typeof window !== 'undefined';

const Results = () => {
  const roomCode = isClient ? JSON.parse(localStorage.getItem("room_code") || "null") : null;
  const studentId = isClient ? JSON.parse(localStorage.getItem("student_id") || "null") : null;

  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    if (isClient && roomCode && studentId) {
      const fetchResult = async () => {
        try {
          const result = await postQuizzesResults(roomCode, studentId);
          setData(result);
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      }
      fetchResult();
    }
  }, [roomCode, studentId])
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
        <h2 className="absolute top-4 w-2xl text-4xl font-bold !py-4 bg-black text-white text-center rounded-2xl">Natijalar</h2>
        <div className="absolute top-36 bg-black rounded-2xl py-2 px-8">
          <h3 className="w-full text-4xl font-bold !py-4 bg-black text-white text-center rounded-2xl">Sizning natijangiz {data?.student?.percentage}% to’g’ri.</h3>
        </div>
        
        <p className="font-bold text-3xl">G'olib:</p>
        <div className="bg-black rounded-2xl py-2 px-8">
          <h3 className="w-2/3 mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">{data?.winner?.name} {data?.winner?.percentage}% to’g’ri.</h3>
        </div>
        
      </div>
    </div>
  )
}

export default Results