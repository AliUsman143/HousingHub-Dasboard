"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import ProfileDropdown from "../components/ProfileDropdown";
import { CiBellOn } from "react-icons/ci";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);



  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 px-4 sm:px-6 py-6 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden mr-4 p-2 rounded-md bg-[#002f86] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Welcome Ali
            </h1>
          </div>

          <div className="flex items-center space-x-4 self-end sm:self-auto">
            <div className="relative cursor-pointer">
              <CiBellOn className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full" />
            </div>
            <ProfileDropdown
              currentProfile={{
                profilePicture:
                  "https://placehold.co/40x40/cccccc/ffffff?text=U",
                username: "Admin",
              }}
            />
          </div>
        </div>

       

   
      </main>
    </div>
  );
};

export default Page;