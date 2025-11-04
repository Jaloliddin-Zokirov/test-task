"use client";

import { useEffect, useState } from "react";
import Step1 from "./(steps)/Step1"
import { toast } from "sonner";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";
import { postQuizzesJoin } from "@/api/quizzes/room";


const UserPage = () => {
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (otp.length === 6) {
      console.log("OTP entered:", otp);
      // Here you can add logic to verify the OTP or proceed to the next step
      toast.success("Kodni muvaffaqiyatli kiritdingiz!");
      setStep(2);
    }
  }, [otp])

  useEffect(() => {
    const joinQuestion = async () => {
      try {
        if (name.length >= 4 && otp.length === 6) {
          const response = await postQuizzesJoin({ room_code: otp, name: name });
          localStorage.setItem("room_code", JSON.stringify(otp));
          console.log("Name entered:", name);
          toast.success("Ism muvaffaqiyatli kiritildi!");
          setStep(3);
        } 
      } catch (error) {
        console.error("Error joining question:", error);
        toast.error("Testga qo'shilishda muammo yuzaga keldi iltimos qayta urinib ko'ring!");
        setStep(1);
      }
    }

    joinQuestion();
  }, [name])


  return (
    <div className="w-full h-full">
      {step === 1 ? <Step1 otp={otp} setOtp={setOtp} /> : step === 2 ? <Step2 setName={setName} /> : <Step3 />}
    </div>
  )
}

export default UserPage