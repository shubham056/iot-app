import React,{useEffect} from 'react'
import { logout } from "../redux/features/AuthenticationSlice";
import { useDispatch } from "react-redux";

 const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("logout")
        dispatch(logout());
    }, [])
    

    return (
       <></>
    )
}

export default Logout;