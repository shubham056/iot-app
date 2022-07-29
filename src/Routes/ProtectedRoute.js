import { Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";
function ProtectedRoute({ children }) {
    //const isAuthenticated = useSelector(selectUser);
    const isAuthenticated = useSelector(selectUser);
  return !isAuthenticated  ? children : <Navigate to="/" />;
}

export default ProtectedRoute;