"use client";

import { useRouter } from "next/navigation";

const Process = () => {
  const router = useRouter();

  const arr = [{name: "Abdulloh"}, {name: "Zamira"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}, {name: "Doniyor"}]

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Kirish uchun kod</h2>

          <div className="w-full flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-2xl mb-2">Kirish uchun kod:</p>
              <p className="w-80 h-60 flex place-items-center justify-center bg-black rounded-2xl py-4 px-8 text-white font-bold text-6xl">123456</p>
            </div>
            <div className="bg-black rounded-2xl py-4 px-8">
              <p className="mb-8 text-white text-2xl font-bold">O'quvchilar {arr.length}/20</p>
              <ol className="h-[60vh] overflow-y-scroll">
                {arr.map((item, index) => (
                  <li className="text-white font-bold text-xl" key={index}>{index + 1}. {item.name}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="w-80 py-4 bg-black text-white text-center rounded-2xl text-4xl font-bold cursor-pointer" onClick={() => router.push("/teacher/management/started")}>Boshlash</div>

        </div>
      </div>
    </div>
  )
}

export default Process