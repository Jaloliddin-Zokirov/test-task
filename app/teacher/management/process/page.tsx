"use client";

import { postQuizzesStart } from "@/api/quizzes/quizzes";
import { getQuizzesRoom } from "@/api/quizzes/room";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Process = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [data, setData] = useState<QuizzesRoomResponse | undefined>(undefined);
  const [students, setStudents] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const code = localStorage.getItem("room_code");
    if (code) {
      setRoomCode(JSON.parse(code));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (roomCode) {
        const response = await getQuizzesRoom({ room_code: roomCode });
        setData(response as QuizzesRoomResponse);
      }
    };
    fetchData();
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode) return;

    const socket = new WebSocket(
      `wss://test-task-backend-production-80c6.up.railway.app/ws/quizzes/${roomCode}/`
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
  }, [roomCode]);

  const StartTest = async () => {
    localStorage.setItem("quiz_id", JSON.stringify(data!.id));
    try {
      const response = (await postQuizzesStart(data!.id, {
        title: data?.title || "",
        time_remaining: 60,
      })) as any;
      console.log(response);
      router.push("/teacher/management/started");
      toast.success("Test boshlandi");
    } catch (error) {
      console.error("Error starting test:", error);
      toast.error("Testni boshlashda xatolik yuz berdi");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">
            {data?.title ?? ""}
          </h2>

          <div className="w-full flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-2xl mb-2">Kirish uchun kod:</p>
              <p className="w-80 h-60 flex place-items-center justify-center bg-black rounded-2xl py-4 px-8 text-white font-bold text-6xl">
                {roomCode}
              </p>
            </div>
            <div className="bg-black rounded-2xl py-4 px-8">
              <p className="mb-8 text-white text-2xl font-bold">
                O'quvchilar {students.length}/20
              </p>
              <ol className="h-[60vh] overflow-y-scroll">
                {students.map((item, index) => (
                  <li className="text-white font-bold text-xl" key={index}>
                    {index + 1}. {item.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            className="w-80 py-4 bg-black text-white text-center rounded-2xl text-4xl font-bold cursor-pointer"
            onClick={StartTest}
          >
            Boshlash
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
