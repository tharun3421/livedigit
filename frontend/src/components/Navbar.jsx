import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-[6vh]  p-4 mt-2">
        <img className="w-auto h-12 ml-6 mt-4" src="../public/Livedigitlogo.png" alt="LOGO" />   
      <h1 className="mr-6 mt-4 border rounded-2xl cursor-pointer px-4 py-1 uppercase font-medium text-sm">Home</h1>
    </div>
  )
}

export default Navbar