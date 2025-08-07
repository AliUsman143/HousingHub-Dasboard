"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";

// Search Icon Component
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

const ContractorManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contractorsData, setContractorsData] = useState([]);
  const [filterService, setFilterService] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
const [isEditMode, setIsEditMode] = useState(false); // ⬅️ Add this state
const [editedContractor, setEditedContractor] = useState(null); // Editable data

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
    const fetchContractors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contractors");
        const data = await response.json();
        setContractorsData(data.contractors || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch contractors:", error);
        setIsLoading(false);
      }
    };

    fetchContractors();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contractor?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/contractors/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setContractorsData((prev) =>
          prev.filter((contractor) => contractor._id !== id)
        );
        alert("Contractor deleted successfully.");
      } else {
        alert("Failed to delete contractor.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // Filter logic
  const filteredContractors = contractorsData.filter((contractor) => {
    const matchesSearch =
      contractor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.companyname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contractor.phone?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService =
      filterService === "All" || contractor.servicetype === filterService;

    return matchesSearch && matchesService;
  });
  // Function to open the modal and set the selected contractor
  const handleView = (contractor) => {
    setSelectedContractor(contractor);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContractor(null); // Clear selected contractor when closing
  };

  const renderField = (label, key) => (
  <div>
    <p className="font-bold text-sm">{label}</p>
    {isEditMode ? (
      <input
        type="text"
        value={editedContractor?.[key] || ""}
        onChange={(e) =>
          setEditedContractor({ ...editedContractor, [key]: e.target.value })
        }
        className="w-full border rounded px-2 py-1 text-sm"
      />
    ) : (
      <p className="text-base">{selectedContractor?.[key] || "N/A"}</p>
    )}
  </div>
);


  // Loader
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
            Contractor Management
          </h1>

          <div className="flex items-center space-x-4 md:space-x-6">
          
         
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 px-0 sm:px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Search */}
            <div className="w-full md:w-64 lg:w-80">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search contractors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border bg-[#FBFAFA] border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter and Add */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto md:ml-auto">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 whitespace-nowrap text-sm">
                  Filter by Service
                </span>
                <div className="relative">
                  <select
                    className="appearance-none px-4 py-1 pr-8 text-sm bg-[#FBFAFA] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Landscaping">Landscaping</option>
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

              <button
                className="flex items-center justify-center px-6 py-2 w-full bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors text-sm"
                onClick={() =>
                  (window.location.href =
                    "/Dashboard/contractorManagement/create")
                }
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
                Add Contractor
              </button>
            </div>
          </div>
        </div>

        {/* Contractor Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow-md mx-0 sm:mx-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredContractors.length > 0 ? (
                filteredContractors.map((contractor) => (
                  <tr key={contractor._id}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {contractor.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {contractor.companyname}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800">
                        {contractor.servicetype}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {contractor.phone}
                    </td>
                    <td className="px-4 py-4 text-sm text-left flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                      <button
                        onClick={() => handleView(contractor)} // Pass the whole contractor object
                        className="text-gray-500 hover:text-gray-900 flex items-center justify-center sm:inline-block"
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
                        onClick={() => handleDelete(contractor._id)}
                        className="text-red-600 hover:text-red-900"
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
                    No contractors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {/* Contractor Details Modal */}
      {isModalOpen && selectedContractor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/90 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#FF8A8A] text-white p-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-xl font-semibold">Contractor Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Editable Name */}
              {isEditMode ? (
                <input
                  type="text"
                  value={editedContractor?.name || ""}
                  onChange={(e) =>
                    setEditedContractor({
                      ...editedContractor,
                      name: e.target.value,
                    })
                  }
                  className="text-2xl font-bold text-gray-800 text-center mb-4 w-full border border-gray-300 rounded px-3 py-2"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                  {selectedContractor.name}
                </h2>
              )}

              {/* Buttons */}
              <div className="flex justify-center space-x-4 mb-6">
                <button className="px-4 py-2 bg-[#FF8A8A] text-white rounded-md shadow-sm hover:bg-[#f8a1a1] transition-colors text-sm">
                  Call now
                </button>
                {!isEditMode ? (
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 transition-colors text-sm"
                    onClick={() => {
                      setIsEditMode(true);
                      setEditedContractor({ ...selectedContractor });
                    }}
                  >
                    Edit Detail
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `http://localhost:5000/api/contractors/${editedContractor._id}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(editedContractor),
                            }
                          );
                          if (res.ok) {
                            alert("Contractor updated successfully.");
                            setSelectedContractor(editedContractor);
                            setIsEditMode(false);
                          } else {
                            alert("Failed to update contractor.");
                          }
                        } catch (error) {
                          console.error(error);
                          alert("Something went wrong.");
                        }
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 p-4 text-black">
                {renderField("Service Type", "servicetype")}
                {renderField("Company Name", "companyname")}
                {renderField("Contact Phone", "phone")}
                {renderField("Email", "email")}
                {renderField("Company Website", "companywebsite")}
              </div>

              {/* Additional Notes */}
              <div className="pt-4">
                <p className="font-semibold text-sm mb-1">Additional Note:</p>
                {isEditMode ? (
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    value={editedContractor?.additionalnote || ""}
                    onChange={(e) =>
                      setEditedContractor({
                        ...editedContractor,
                        additionalnote: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-base text-gray-600 leading-relaxed">
                    {selectedContractor.additionalnote ||
                      "No additional notes."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorManagement;
