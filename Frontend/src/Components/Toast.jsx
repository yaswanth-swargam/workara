import React from 'react'

export default function Toast({message,type="success"}){
    const bg= type==='success' ? 'bg-green-500' : type==="error"? 'bg-red-500' : 'bg-gray-500';

    return (
        <div className={`fixed top-5 right-5 px-4 py-2 transition-all duration-300 ease-in-out rounded-lg text-white shadow-md ${bg}`}>
            {message}
        </div>
    )
}