import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutAction() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutAction;