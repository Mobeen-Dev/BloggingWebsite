import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getAccount()
      .then((res) => {
        if (res.$id) {
          dispatch(login({ userData: res }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (!loading)
    return (
      <>
        <div className="min-h-screen flex flex-warp content-between bg-gray-400">
          {" "}
          Loading .......
          <div>
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
      </>
    );
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
