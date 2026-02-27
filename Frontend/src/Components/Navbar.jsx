import React from 'react'
import {useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Button from './Button.jsx'
import {logoutUser} from '../store/authActons.js'
import Logo from '../assets/logo.png'

export default function Navbar(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate('/login')
    }
    return(
        <div className="bg-white shadow-md px-3 flex justify-between items-center text-blue-300 gap-5">
            <div>
                <img src={Logo} width="150px"/>
            </div>
            <div className='flex items-center gap-6'>
                <Link to='/' className="text-gray-700 hover:text-red-600">Home</Link>
                <Link to='/saved' className="text-gray-700 hover:text-red-600">Saved</Link>
                <Button bgColor='bg-red-600' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}