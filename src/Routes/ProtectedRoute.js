import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";
function ProtectedRoute({ children }) {
    //const isAuthenticated = useSelector(selectUser);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user",user)
    const isAuthenticated = useSelector(selectUser);
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default ProtectedRoute;