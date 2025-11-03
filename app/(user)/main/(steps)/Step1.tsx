"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const Step1 = ({otp, setOtp}: {otp: string; setOtp: (otp: string) => void}) => {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-xs place-items-center justify-center flex flex-col gap-4">
        <Button className="w-full">Kirish uchun kodni kiriting</Button>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot className="border-black" index={0} />
            <InputOTPSlot className="border-black" index={1} />
            <InputOTPSlot className="border-black" index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className="border-black" index={3} />
            <InputOTPSlot className="border-black" index={4} />
            <InputOTPSlot className="border-black" index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}

export default Step1