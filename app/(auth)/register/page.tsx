"use client";

import { postRegister } from "@/api/auth/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();

  const [data, setData] = useState({ name: "", surname: "", phone: "", password: "", passwordConfirmation: "" });

  const handleRegister = async () => {
    if (data.password !== data.passwordConfirmation) {
      toast.error("Parollar mos emas");
      return;
    }
    try {
      const response = await postRegister(data) as RegisterResponse;
      localStorage.setItem("access_token", response.access);
      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi");
      router.push("/teacher");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Ro'yxatdan o'tishda xatolik yuz berdi");
    }
  };

  return (
    <div className="w-5/6 h-full mx-auto flex items-center justify-between gap-0.5">
      
      <div className="rounded-l-2xl w-2/4 h-4/5 bg-black flex place-items-center justify-center px-9">
        <h1 className="text-white text-6xl italic font-extrabold">Odatdagidan osonroq va unumliroq</h1>
      </div>

      <div className="rounded-r-2xl w-2/4 h-4/5 bg-black flex place-items-center justify-center px-9">
        <div className="w-3/4">
          <h1 className="text-white text-center text-3xl font-medium mb-10">Ro’yhatdan o’tish</h1>

          <div className="flex flex-col gap-6 items-center mb-10">
            <Input
              placeholder="Ismingiz"
              className="text-white"
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Input
              placeholder="Familiyangiz"
              className="text-white"
              type="text"
              value={data.surname}
              onChange={(e) => setData({ ...data, surname: e.target.value })}
            />
            <Input
              placeholder="Telefon raqamingiz"
              className="text-white"
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <Input
              placeholder="Parol o'ylab toping"
              className="text-white"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Input
              placeholder="Parolni tasdiqlang"
              className="text-white"
              type="password"
              value={data.passwordConfirmation}
              onChange={(e) => setData({ ...data, passwordConfirmation: e.target.value })}
            />
          </div>

          <Button
            className="w-full bg-white text-black mb-4 cursor-pointer"
            onClick={handleRegister}
          >
            Kirish
          </Button>
          <p className="font-medium text-sm text-white text-center cursor-pointer" onClick={() => router.push("/login")}>Avval ro’yhatdan o’tganmisiz?</p>
        </div>
      </div>
    </div>
  )
}

export default Register