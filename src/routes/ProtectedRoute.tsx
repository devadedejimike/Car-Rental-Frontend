import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {token, loading} = useAuth();
    if(loading){
        <p>Loading.....</p>
    }

    if(!token){
        return <Navigate to='/auth' replace/>
    }

    return children
};

export default ProtectedRoute;