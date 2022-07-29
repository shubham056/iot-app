import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";
import { logout } from "../redux/features/AuthenticationSlice";
function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectUser);
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log("user private roure value",user)

  if(user === undefined){
    dispatch(logout())
    }

  console.log("isAuthenticated private roure value",isAuthenticated)
  return isAuthenticated  ? children : <Navigate to="/" />;
}

export default PrivateRoute;