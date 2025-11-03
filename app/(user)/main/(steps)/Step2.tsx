"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


const Step2 = ({setName}: {setName: (name: string) => void}) => {
  const [userName, setUserName] = useState("")

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-xs place-items-center justify-center flex flex-col gap-4">
        <Button className="w-full">Ismingizni kiriting</Button>
        <Input className="w-full border-black" type="text" placeholder="Ismingizni kiriting" value={userName} onChange={(e) => setUserName(e.target.value)} />
        {userName.length > 4 && <Button onClick={() => setName(userName)}>Davom etish</Button>}
      </div>
    </div>
  )
}

export default Step2