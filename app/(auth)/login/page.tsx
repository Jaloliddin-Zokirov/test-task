"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({ phone: "", password: "" });

  return (
    <div className="w-5/6 h-full mx-auto flex items-center justify-between gap-0.5">
      
      <div className="rounded-l-2xl w-2/4 h-4/5 bg-black flex place-items-center justify-center px-9">
        <h1 className="text-white text-6xl italic font-extrabold">Odatdagidan osonroq va unumliroq</h1>
      </div>

      <div className="rounded-r-2xl w-2/4 h-4/5 bg-black flex place-items-center justify-center px-9">
        <div className="w-3/4">
          <h1 className="text-white text-center text-3xl font-medium mb-16">Kirish</h1>

          <div className="flex flex-col gap-10 items-center mb-16">
            <Input
              placeholder="Telefon raqamingiz"
              className="text-white"
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <Input
              placeholder="Parolingiz"
              className="text-white"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <Button
            className="w-full bg-white text-black mb-10 cursor-pointer"
            onClick={() => {
              localStorage.setItem("access_token", JSON.stringify(data));
              router.push("/teacher");
            }}
          >
            Kirish
          </Button>
          <p className="font-medium text-sm text-white text-center cursor-pointer" onClick={() => router.push("/register")}>Ro’yhatdan o’tish</p>
        </div>
      </div>
    </div>
  )
}

export default Login