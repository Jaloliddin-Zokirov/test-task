"use client";

const Results = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="w-2xl place-items-center justify-center flex flex-col gap-4">
        <h2 className="absolute top-4 w-2xl text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Natijalar</h2>
        <div className="absolute top-36 bg-black rounded-2xl py-2 px-8">
          <h3 className="w-full text-4xl font-bold py-4! bg-black text-white text-center rounded-2xl">Sizning natijangiz 90% to’g’ri 37 soniya</h3>
        </div>
        
        <p className="font-bold text-3xl">G'olib:</p>
        <div className="bg-black rounded-2xl py-2 px-8">
          <h3 className="w-2/3 mx-auto text-xl font-bold py-2 bg-black text-white text-center rounded-2xl">Doniyor 100% to’g’ri 23 Soniyada bajardi</h3>
        </div>
        
      </div>
    </div>
  )
}

export default Results