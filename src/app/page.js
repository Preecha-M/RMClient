"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/rice-field.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">WELCOME TO</h1>
        <h2 className="text-6xl font-extrabold">RICE LEAF DISEASES DETECTION</h2>
        <p className="text-lg mt-4">แพลตฟอร์มที่จะช่วยให้คุณสามารถวิเคราะห์โรคที่เกิดบนใบข้าวได้ง่ายและรวดเร็ว</p>
        
        <Link href="/detect">
          <button className="mt-6 bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300">
            Click Here To Start
          </button>
        </Link>
      </div>
    </div>
  );
}
