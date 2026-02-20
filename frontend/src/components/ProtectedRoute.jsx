import { Navigate } from "react-router-dom";
import api from "../api/axiosInstance";

const API = import.meta.env.VITE_API_URL;

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  api
    .get(API)
    .then((response) => {})
    .catch((error) => {
      console.log(error);
    });

  return children;
}

export default ProtectedRoute;
