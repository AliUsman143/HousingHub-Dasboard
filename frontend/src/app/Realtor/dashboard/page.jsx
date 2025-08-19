"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [homeownersData, setHomeownersData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // per page items
  const [totalPages, setTotalPages] = useState(1);

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

  useEffect(() => {
    const fetchHomeowners = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/homeowners?page=${page}&limit=${limit}`
        );
        const data = await response.json();
        setHomeownersData(data.data);
        setTotalPages(data.pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch homeowners:", error);
        setIsLoading(false);
      }
    };

    fetchHomeowners();
  }, [page]);

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

  const handleView = (userId) => {
    window.location.href = `/Realtor/dashboard/${userId}/view`;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this homeowner?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/homeowners/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setHomeownersData((prevData) =>
          prevData.filter((homeowner) => homeowner._id !== id)
        );
        alert("Homeowner deleted successfully.");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete homeowner.");
      }
    } catch (error) {
      console.error("Error deleting homeowner:", error);
      alert("Something went wrong while deleting.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-white">
        <div ref={sidebarRef}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div
          className={`flex-1 flex items-center justify-center transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg bg-[#f5f5f5] p-4 sm:p-5 text-center shadow-md">
            <h3 className="mb-2 text-sm sm:text-base font-semibold text-gray-600">
              Gifted Homeowners
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">12</p>
          </div>

          <div className="rounded-lg bg-[#f5f5f5] p-4 sm:p-5 text-center shadow-md">
            <h3 className="mb-2 text-sm sm:text-base font-semibold text-gray-600">
              Pending Invites
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">03</p>
          </div>

          <div className="rounded-lg bg-[#f5f5f5] p-4 sm:p-5 text-center shadow-md">
            <h3 className="mb-2 text-sm sm:text-base font-semibold text-gray-600">
              Accept Invites
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">09</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Property address
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date added
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {homeownersData.map((homeowner, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                    {homeowner.name}
                  </td>
                  <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {homeowner.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClasses(
                        homeowner.status
                      )}`}
                    >
                      {homeowner.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {homeowner.dateAdded}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <button className="hidden sm:inline-block text-xs text-indigo-600 hover:text-indigo-900">
                        Resend
                      </button>
                      <button
                        onClick={() => handleView(homeowner._id)}
                        className="text-gray-500 hover:text-gray-900"
                        aria-label="View"
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
                      <button
                        onClick={() => handleDelete(homeowner._id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete"
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-3 py-1 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Page;
