import { Navigate } from "react-router-dom";

export default function authHeader() {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const decodedJwt = parseJwt(user.token);
    if (decodedJwt.exp * 1000 < Date.now()) {
      console.log('exp token')
      return <Navigate to="/" />
    } else {
      return { Authorization: 'Bearer ' + user.token };
    }

  } else {
    //return {};
    return <Navigate to="/" />
  }
}
