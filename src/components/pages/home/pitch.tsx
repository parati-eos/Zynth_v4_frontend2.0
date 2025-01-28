'use client'
import React from 'react'
import { Boxes } from '../home/background-boxes.tsx'
import { cn } from '../../Utils/cn.ts'
import { useNavigate } from 'react-router-dom'

export function BackgroundBoxesDemo() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/auth/login')
  }
  return (
    <div className="h-[97vh] relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>
        Start pitching with Zynth.
      </h1>
      <br />
      <br />
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        <button
          onClick={handleClick}
          className="button-85 relative overflow-hidden bg-transparent hover:bg-[#5480c1] text-white py-2 px-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full transition duration-300 ease-in-out transform hover:translate-y-1"
        >
          Start Pitching
          <span className="absolute inset-0 bg-gradient-to-br from-[#5480c1] to-fuchsia-500 blur opacity-0 transition duration-300 rounded-full"></span>
          <span className="absolute inset-0 border-2 border-[#5480c1] rounded-full animate-pulse"></span>
        </button>
      </p>
    </div>
  )
}
