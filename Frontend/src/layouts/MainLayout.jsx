import Navbar from '../Components/Navbar.jsx'
import {Outlet} from 'react-router-dom'

export default function MainLayout(){
    return(
        <>
            <Navbar/>
            <main className='px-6 py-4'>
                <Outlet />
            </main>
        </>
    )
}