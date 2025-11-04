"use client";

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";


const Step3 = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [students, setStudents] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const code = localStorage.getItem("room_code");
    if (code) {
      const parsedCode = JSON.parse(code);
      setRoomCode(parsedCode);

      const socket = new WebSocket(
        `wss://test-task-backend-production-80c6.up.railway.app/ws/quizzes/${parsedCode}/`
      );

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        toast.success("Yangi o'quvchi qo'shildi");
        if (message.event === "student_joined") {
          setStudents(message.payload.students);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("WebSocket xatosi yuz berdi");
      };

      return () => socket.close();
    }
  }, []);

  // const arr = [{name: "Abdulloh"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}]

  // useEffect(() => {
  //   if (arr.length === 20) {
  //     console.log("20 o'quvchi to'ldi");
  //     toast.success("20 ta o'quvchi qo'shildi!");
  //     router.push("/tests");
  //     // Here you can add logic to proceed when 20 students have joined
  //   }
  // }, [arr, router])
  

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