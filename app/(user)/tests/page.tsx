"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Tests = () => {
  const router = useRouter();
  const [answares, setAnswares] = useState({})

  const arr = [{id: 1, name: "Abdulloh"}, {id: 2, name: "Zamira"}, {id: 3, name: "Doniyor"}]

  useEffect(() => {
    if (Object.keys(answares).length === 3) {
      console.log("All questions answered:", answares);
      toast.success("Barcha savollarga javob berdingiz!");
      router.push("/results");
      // Here you can add logic to proceed when all questions have been answered
    }
  }, [answares])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
        <h2 className="absolute top-4 w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">To’g’ri javobni tanlang</h2>
        <div className="absolute top-36 bg-black rounded-2xl py-2 px-8">
          <h3 className="w-full text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">To’g’ri javobni tanlang</h3>
        </div>
        
        <ol className="flex items-center gap-4">
          {arr.map((item, index) => (
            <li className="bg-black rounded-2xl py-2 px-4 text-white font-bold text-xl" key={index}>
              <Button onClick={() => setAnswares(prev => ({ ...prev, [item.id]: item.name }))} className="cursor-pointer">{item.name}</Button>
            </li>
          ))}
        </ol>
        
        <Button className="absolute right-8 bottom-8">Tugashiga 54 soniya qoldi</Button>
      </div>
    </div>
  )
}

export default Tests