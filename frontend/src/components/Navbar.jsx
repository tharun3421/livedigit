import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[6vh] p-4 mt-2">
      
      <img
        className="w-auto h-12 ml-6 mt-4"
        src="/Livedigitlogo.png"
        alt="LOGO"
      />

      {/* Animated Button */}
      <h1 className="relative mr-6 mt-4 border rounded-2xl px-4 py-1 uppercase font-medium text-sm overflow-hidden cursor-pointer group">
        
        {/* Background Layer */}
        <span className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>

        {/* Text */}
        <span className="relative z-10 group-hover:text-white">
          Home
        </span>

      </h1>
    </div>
  )
}

export default Navbar