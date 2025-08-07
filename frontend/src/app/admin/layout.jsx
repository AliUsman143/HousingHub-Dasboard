"use client";
import React from "react";
// import { ProfileProvider } from "../context/ProfileContext";
// import Header from './components/header/Header'

function layout({ children }) {
  return (
    <div>
      <div className="bg-gray-100">
        {/* <Header/> */}
    {children}
      </div>
    </div>
  );
}

export default layout;
