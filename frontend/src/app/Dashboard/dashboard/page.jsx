"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import ProfileDropdown from "../components/ProfileDropdown";
import { CiBellOn } from "react-icons/ci";
import Link from "next/link";
import StGamerPropertyCard from "../../components/StGamerPropertyCard";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [latestProperty, setLatestProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch the latest property
  useEffect(() => {
    const fetchLatestProperty = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/properties");
        if (response.ok) {
          const properties = await response.json();
          // Get the most recently added property (first in the array since they're sorted by createdAt: -1)
          if (properties.length > 0) {
            setLatestProperty(properties[0]);
          }
        } else {
          console.error("Failed to fetch properties");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestProperty();
  }, []);

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

        {/* Latest Property Card Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Latest Property Added</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : latestProperty ? (
            <StGamerPropertyCard property={latestProperty} />
          ) : (
            <div className="bg-gray-100 text-center py-8 rounded-lg text-gray-500">
              No properties found. <Link href="/Firstuser/addproperty" className="text-blue-500 hover:underline">Add your first property</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;