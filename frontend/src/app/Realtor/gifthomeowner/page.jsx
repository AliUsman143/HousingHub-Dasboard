"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr"; // Assuming this path is correct
import ProfileDropdown from "../components/ProfileDropdown"; // Assuming this path is correct
import { CiBellOn } from "react-icons/ci";
import Link from "next/link";

// Search Icon Component (retained as is)
const SearchIcon = ({ className }) => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const GiftHomeowner = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [homeownersData, setHomeownersData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // Default filter to 'All' for flexibility

  // Close sidebar on outside click
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

  // Fetch Homeowners Data
  useEffect(() => {
    const fetchHomeowners = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/homeowners");
        const data = await response.json();
        setHomeownersData(data.homeowners || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch homeowners:", error);
        setIsLoading(false);
      }
    };

    fetchHomeowners();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this homeowner?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/homeowners/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setHomeownersData((prev) =>
          prev.filter((homeowner) => homeowner._id !== id)
        );
        alert("Homeowner deleted successfully.");
      } else {
        alert("Failed to delete homeowner.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // Status styling
  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filtered data based on search term and selected status
  const filteredUsers = homeownersData.filter((homeowner) => {
    const matchesSearch =
      homeowner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homeowner.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || homeowner.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Navigate to detail view
  const handleView = (userId) => {
    // Make sure the path is correct relative to your project structure
    window.location.href = `/Realtor/dashboard/${userId}/view`;
  };

  // Loader (retained as is)
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    );
  }

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
        className={`flex-1 px-4 sm:px-6 py-6 md:py-8 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden mr-4 p-2 rounded-md bg-[#002f86] text-white"
            aria-label="Open sidebar" // Added for accessibility
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

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Gift Home Owner
          </h1>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative cursor-pointer">
              <CiBellOn className="h-6 w-6 md:h-7 md:w-7 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
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

        {/* Search, Filter, and Add Homeowner Section */}
        <div className="mb-8 px-0 sm:px-5"> {/* Added horizontal padding for small screens */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"> {/* Increased gap for md */}
            {/* Search Input */}
            <div className="w-full md:w-64 lg:w-80"> {/* Adjusted width for larger screens */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border bg-[#FBFAFA] border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter and Add Homeowner Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto md:ml-auto"> {/* Adjusted layout for smaller screens */}
              <div className="flex items-center space-x-2"> {/* Group filter label and select */}
                <span className="text-gray-600 whitespace-nowrap text-sm">Filter by</span>
                <div className="relative">
                  <select
                    className="appearance-none px-4 py-1 pr-8 text-sm bg-[#FBFAFA] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Expired">Expired</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <Link href="/Realtor/addhomeowner" className="w-full sm:w-auto"> {/* Make link full width on small screens */}
                <button className="flex items-center justify-center px-6 py-2 w-full bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors text-sm">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Add Homeowner
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow-md mx-0 sm:mx-5"> {/* Added horizontal margin for small screens */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((homeowner) => (
                  <tr key={homeowner._id}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {homeowner.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {homeowner.address}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClasses(
                          homeowner.status
                        )}`}
                      >
                        {homeowner.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {homeowner.dateAdded}
                    </td>
                    <td className="px-4 py-4 text-sm text-left flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"> {/* Actions responsive */}
                      <button
                        onClick={() => handleView(homeowner._id)}
                        className="text-gray-500 hover:text-gray-900 flex items-center justify-center sm:inline-block" // Centered for stacked buttons
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                      {/* You might consider a "Resend Invitation" button here if applicable */}
                      {/* <button className="text-xs text-indigo-600 hover:text-indigo-900">
                        Resend invitation
                      </button> */}
                      <button
                        onClick={() => handleDelete(homeowner._id)}
                        className="text-red-600 hover:text-red-900 flex items-center justify-center sm:inline-block" // Centered for stacked buttons
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No homeowners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GiftHomeowner;