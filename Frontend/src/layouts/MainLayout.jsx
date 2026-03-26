

import Navbar from '../Components/Navbar.jsx'
import {Outlet} from 'react-router-dom'

export default function MainLayout(){
    return(
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-28 left-1/3 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
                <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            </div>

            <div className="relative">
                <Navbar/>
                <main className="p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}