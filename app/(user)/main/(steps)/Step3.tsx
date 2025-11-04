"use client";

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";


const Step3 = () => {
  const router = useRouter();
  const [students, setStudents] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const code = localStorage.getItem("room_code");
    if (code) {
      const parsedCode = JSON.parse(code);

      const socket = new WebSocket(
        `wss://test-task-backend-production-80c6.up.railway.app/ws/quizzes/${parsedCode}/`
      );

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.event === "student_joined") {
          toast.success("Yangi o'quvchi qo'shildi");
          setStudents(message.payload.students);
        }
        if (message.event === 'quiz_started') {
          toast.success("Test boshlandi!");
          const { quiz, time_remaining } = message.payload;
          localStorage.setItem("quiz_id", JSON.stringify(quiz.id));
          localStorage.setItem("questions", JSON.stringify(quiz.questions));
          localStorage.setItem("timer", time_remaining);
          router.push("/tests");
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("WebSocket xatosi yuz berdi");
      };

      return () => socket.close();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
        <h2 className="w-full text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Boshlanishiga oz qoldi</h2>
        <div className="bg-black rounded-2xl py-4 px-8">
          <h3 className="mb-8 text-white text-2xl font-bold">O'quvchilar {students.length}/20</h3>
          <ol className="h-[60vh] overflow-y-scroll">
            {students.map((item, index) => (
              <li className="text-white font-bold text-xl" key={index}>{index + 1}. {item.name}</li>
            ))}
          </ol>
        </div>
        <Button>Biroz kuting</Button>
      </div>
    </div>
  )
}

export default Step3