import { Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

function ProtectedRoute ({children}) {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to={"/login"} />
    }

    api.get("http://127.0.0.1:8000/")
    .then((response) => {
        // console.log(response);
        
    })
    .catch((error) => {
        console.log(error);
    })

    return children;
}

export default ProtectedRoute;