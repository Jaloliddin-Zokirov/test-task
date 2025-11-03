"use client";

import { useEffect, useState } from "react";
import Step1 from "./(steps)/Step1"
import { toast } from "sonner";
import Step2 from "./(steps)/Step2";
import Step3 from "./(steps)/Step3";


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
    if (name.length >= 4) {
      console.log("Name entered:", name);
      // Here you can add logic to verify the name or proceed to the next step
      toast.success("Ism muvaffaqiyatli kiritildi!");
      setStep(3);
    }
  }, [name])


  return (
    <div className="w-full h-full">
      {step === 1 ? <Step1 otp={otp} setOtp={setOtp} /> : step === 2 ? <Step2 setName={setName} /> : <Step3 />}
    </div>
  )
}

export default UserPage