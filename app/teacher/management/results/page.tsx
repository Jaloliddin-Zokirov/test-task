"use client";

const Results = () => {
  const topStudent = JSON.parse(localStorage.getItem("top_student") || "{}");
  
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
          <h2 className="absolute top-4 w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Natijalar</h2>
          
          <p className="font-bold text-3xl mb-2">G'olib:</p>
          <div className="w-xs h-32 bg-black rounded-2xl py-2 px-8 place-items-center justify-center flex flex-col gap-4 cursor-pointer">
            <p className="w-full mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">{topStudent?.name} {topStudent?.score}% to’g’ri</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Results