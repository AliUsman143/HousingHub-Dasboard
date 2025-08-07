"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import { useRouter } from 'next/navigation';

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

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [maintenanceStatusFilter, setMaintenanceStatusFilter] = useState("");
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchSystems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appliances");
        setSystems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching systems:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSystems();
  }, []);

  const router = useRouter();

  const handleView = (id) => {
    router.push(`/Dashboard/homeSystemManagement/${id}/view`);
  };

  const filteredSystems = systems.filter((item) => {
    const matchesSearch = item.applianceName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = maintenanceStatusFilter
      ? item.maintenanceStatus === maintenanceStatusFilter
      : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-800";
      case "Urgent Repair":
        return "bg-red-100 text-red-800";
      case "Upcoming Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this system?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/appliances/${id}`);
      setSystems(systems.filter((system) => system._id !== id));
      alert("✅ System deleted successfully!");
    } catch (err) {
      console.error("Error deleting system:", err);
      alert("❌ Failed to delete system.");
    }
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="flex min-h-screen bg-white">
        <div ref={sidebarRef}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div className={`flex-1 p-6 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-bold">Error loading systems</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <main
        className={`flex-1 px-4 sm:px-6 py-6 md:py-8 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden mr-4 p-2 rounded-md bg-[#002f86] text-white"
            aria-label="Open sidebar"
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
            Home System Management
          </h1>
    
          <div className="flex items-center space-x-4 md:space-x-6">
         
          </div>
        </div>

        <div className="mb-8 px-0 sm:px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Search Input */}
            <div className="w-full md:w-64 lg:w-80">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search System..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border bg-[#FBFAFA] border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter & Add */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto md:ml-auto">
              {/* Maintenance Status Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-gray-600 whitespace-nowrap text-sm">
                  Filter by
                </span>
                <div className="relative w-full sm:w-auto">
                  <select
                    className="appearance-none px-4 py-1 pr-8 text-sm bg-[#FBFAFA] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={maintenanceStatusFilter}
                    onChange={(e) => setMaintenanceStatusFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Good">Good</option>
                    <option value="Urgent Repair">Urgent Repair</option>
                    <option value="Upcoming Maintenance">
                      Upcoming Maintenance
                    </option>
                  </select>
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

              {/* Add System Button */}
              <Link href="/Dashboard/homeSystemManagement/create" className="w-full sm:w-auto">
                <button
                  className="flex items-center justify-center px-4 sm:px-6 py-2 w-full bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors text-sm"
                >
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
                  <span className="whitespace-nowrap">Add System</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* System Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow-md p-2 sm:p-5">
          <div className="min-w-full overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Maintenance",
                    "Last Serviced",
                    "Purchase Date",
                    "Warranty",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-2 sm:px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredSystems.length > 0 ? (
                  filteredSystems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-4 flex items-center space-x-2 sm:space-x-3">
                        {item.image && (
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.applianceName}
                            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                          {item.applianceName || "-"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                            item.maintenanceStatus
                          )}`}
                        >
                          {item.maintenanceStatus || "-"}
                        </span>
                      </td>

                      <td className="px-2 sm:px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {item.installedBy?.lastServiced
                          ? new Date(item.installedBy.lastServiced).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {item.purchasedFrom?.purchaseDate
                          ? new Date(item.purchasedFrom.purchaseDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {item.purchasedFrom?.warrantyExpires
                          ? new Date(item.purchasedFrom.warrantyExpires).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-sm whitespace-nowrap flex gap-2 sm:gap-3">
                        <button
                          onClick={() => handleView(item._id)}
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
                          onClick={() => handleDelete(item._id)}
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
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-gray-500 py-6 text-sm"
                    >
                      No systems found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;