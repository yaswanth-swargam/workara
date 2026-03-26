
import React from 'react'
import {useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Button from './Button.jsx'
import {logoutUser} from '../store/authActons.js'
import { RiLogoutCircleRLine } from "react-icons/ri";


import Logo from '../assets/logo.png'

export default function Navbar(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate('/login')
    }

    
    return(
        <div className='bg-transparent px-3 py-3 pt-6 flex justify-center items-center text-slate-700 gap-20 border-b border-white/40 shadow-none'>
        <div className="flex gap-6 mt-4">
            <div>
                {/* <img src={Logo} width="150px"/> */}
                <h1 className='text-red-900 font-bold font-inter text-4xl'><Link to={'/'}>Work<span className='text-gray-700'>aRa</span></Link></h1>
            </div>
            <div className='flex items-center gap-6'>
                <Link to='/' className="text-slate-700 hover:text-sky-700">Home</Link>
                <Link to='/saved' className="text-slate-700 hover:text-sky-700">Saved</Link>
                
            </div>
        </div>
            <div className='mt-4'>
                <Button  onClick={handleLogout}><RiLogoutCircleRLine /></Button>
            </div>

    </div>
    )
}