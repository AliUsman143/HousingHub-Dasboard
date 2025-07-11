"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import ProfileDropdown from "../components/ProfileDropdown";

const BellIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const CreatePackagesPage = () => {
  const [basicTagline, setBasicTagline] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicPropertyCount, setBasicPropertyCount] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleSave = () => {
    alert(`Save clicked!\nTagline: ${basicTagline}\nPrice: ${basicPrice}\nProperties: ${basicPropertyCount}`);
  };

  const handleCancel = () => {
    setBasicTagline("");
    setBasicPrice("");
    setBasicPropertyCount("");
    alert("Form cleared!");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main content */}
      <main
        className={`flex-1 px-4 sm:px-6 py-6 md:py-8 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
          {/* Mobile toggle button */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Packages</h1>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative cursor-pointer">
              <BellIcon className="h-6 w-6 md:h-7 md:w-7 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
            </div>
            <ProfileDropdown currentProfile={{
              profilePicture: "https://placehold.co/40x40/cccccc/ffffff?text=U",
              username: "Admin"
            }} />
          </div>
        </div>

        {/* Page Heading */}
        <div className="bg-white text-center rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-[#002f86]">Create Packages</h2>
            <p className="text-gray-500 text-sm">Set the prices as per your requirement</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Basic", "Standard", "Premium"].map((label, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl">
                <div className="bg-[#f57c00] text-white text-center py-3 font-bold rounded-t-2xl">
                  {label}
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={basicTagline}
                      onChange={(e) => setBasicTagline(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        value={basicPrice}
                        onChange={(e) => setBasicPrice(e.target.value)}
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Count</label>
                    <select
                      value={basicPropertyCount}
                      onChange={(e) => setBasicPropertyCount(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select count</option>
                      <option value="5">Up to 5</option>
                      <option value="20">Up to 20</option>
                      <option value="100">Up to 100</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-8 font-bold py-2 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#f57c00] text-white px-8 font-bold py-2 text-sm rounded hover:bg-[#003c99]"
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePackagesPage;