"use client";

import { useRouter } from "next/navigation";

const Management = () => {
  const router = useRouter();
  
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="absolute top-4 w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Qanday test yaratmoqchisiz?</h2>
          
          <div className="flex items-center gap-8">
            <div className="w-xs h-32 bg-black rounded-2xl py-2 px-8 place-items-center justify-center flex flex-col gap-4 cursor-pointer" onClick={() => router.push("/teacher/management/create-alone-tests")}>
              <p className="w-full mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">Yakka</p>
            </div>

            <div className="w-xs h-32 bg-black rounded-2xl py-2 px-8 place-items-center justify-center flex flex-col gap-4 cursor-pointer" onClick={() => router.push("/teacher/management/create-group-tests")}>
              <p className="w-full mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">Jamoaviy</p>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Management