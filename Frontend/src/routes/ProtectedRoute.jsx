import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}){
    const status=useSelector((state)=>state.auth.status)
    
    if(!status){
        return <Navigate to="/login" replace />
    }

    return children;
}