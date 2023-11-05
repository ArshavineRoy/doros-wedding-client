import React from 'react'
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/events")
    }
  return (
    <div>
      <div className="w-full bg-white-200 p-10 text-4xl flex mt-20">
        <h1 className="text-left">My Event</h1>
         <button className=' rounded-lg ml-auto bg-[#73332d] text-white w-40 h-14 text-base' onClick={handleNavigate}>Create Events </button>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 "></hr>

      <div className="w-full bg-white-200 p-10 text-4xl flex justify-center">
        <p className='text-center mt-20'>You do not have an event kindly create one to start</p>  
      </div>
      <div className='flex justify-center '>
      <button className='rounded-lg mx-auto bg-[#73332d] text-white w-60 h-14 text-base' onClick={handleNavigate}>Create Events </button>
      </div>
    </div>
  )
}

export default MyEvents;