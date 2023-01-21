import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/todos");
  }, []);

  return (
    <>
      <SideNav />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
