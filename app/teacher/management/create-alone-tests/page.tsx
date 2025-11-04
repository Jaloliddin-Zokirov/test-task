"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { postQuizzes } from "@/api/quizzes/quizzes";

const CreateAloneTest = () => {
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState(["", ""]);

  const addAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, ""]);
    }
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const StartTest = async () => {
    const data = {
      title: "Yakka tartibli test",
      questions: tests,
    };

    try {
      const response = await postQuizzes(data) as any;
      console.log(response);
      localStorage.setItem("room_code", JSON.stringify(response.room_code));
      localStorage.setItem("quiz_id", JSON.stringify(response.id));
      toast.success("Test muvaffaqiyatli yuborildi!");
      router.push("/teacher/management/process");
    } catch (error) {
      toast.error("Testni yuborishda xatolik yuz berdi!");
    }
  }

  const addTest = () => {
    if (!question.trim() || answers.some(a => !a.trim()) || !correctAnswer) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const data = {
      text: question,
      choices: answers.map((a) => ({
        text: a,
        is_correct: a === correctAnswer,
      })),
    };

    setTests([...tests, data]);
    setQuestion("");
    setAnswers(["", ""]);
    setCorrectAnswer("");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Yakka tartibli test yaratish</h2>

          <div className="w-full bg-black rounded-2xl py-4 px-8">
            <div className="grid w-full items-center gap-3 mb-6">
              <Label className="text-white" htmlFor="question">Savol matnini kiriting</Label>
              <Input
                className="text-white"
                type="text"
                placeholder="Savol ..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            
            <div className="grid w-full items-center gap-3 mb-6">
              <Label className="text-white" htmlFor="answers">Javob variantlarini kiriting</Label>
              {answers.map((answer, index) => (
                <Input
                  key={index}
                  className="text-white"
                  type="text"
                  placeholder={`Variant ${index + 1}`}
                  value={answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                />
              ))}
              <Button
                className="bg-transparent border-[#e5e5e5] border-[1px] cursor-pointer"
                onClick={addAnswer}
                disabled={answers.length >= 4}
              >
                Variant qo'shish +
              </Button>
            </div>

            <div className="grid w-full items-center gap-3 mb-6">
              <Label className="text-white" htmlFor="correct">To’g’ri javobni tanlang</Label>
              <Select onValueChange={(value) => setCorrectAnswer(value)}>
                <SelectTrigger className="w-full text-white">
                  <SelectValue placeholder="To'g'ri javobni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {answers.filter(answer => answer.trim() !== "").map((answer, index) => (
                    <SelectItem key={index} value={answer}>{answer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button
                className="w-2/5 bg-green-600 hover:bg-green-700 cursor-pointer"
                onClick={StartTest}
                disabled={tests.length === 0}
              >
                Testni boshlash
              </Button>
              <Button
                className="w-2/5 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                onClick={addTest}
              >
                Test qo‘shish
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default CreateAloneTest