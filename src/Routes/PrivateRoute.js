import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";
import { RESET_ACTION } from '../redux/action-creators';
import { logout } from "../redux/features/AuthenticationSlice";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectUser);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null || user === undefined) {
    dispatch(logout())
  }
  if (user) {
    const decodedJwt = parseJwt(user.token);
    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log('JWT Token has been expired!')
      dispatch(logout())
      dispatch(RESET_ACTION())
      return <Navigate to="/" />
    }
    return isAuthenticated ? children : <Navigate to="/" />;
  }
  else {

    return <Navigate to="/" />
  }
}

export default PrivateRoute;