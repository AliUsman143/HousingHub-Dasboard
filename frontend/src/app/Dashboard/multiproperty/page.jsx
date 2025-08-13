"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import axios from "axios";
import Link from "next/link";
// Search Icon SVG
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

const PropertyPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardBackgroundColors = [
    "bg-red-300",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get("http://localhost:5000/api/properties", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("wtyrwey", res);

        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

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

  const filteredProperties = properties.filter(
    (property) =>
      property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.yearBuilt?.toString().includes(searchTerm)
  );

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
          className={`flex-1 flex items-center justify-center ${
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
            <p className="font-bold">Error loading properties</p>
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
            Property Management
          </h1>

          <div className="flex items-center space-x-4 md:space-x-6">
     
          </div>
        </div>

        {/* Search & Add Button */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search Property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Link href="/Dashboard/multiproperty/create">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow text-sm font-semibold">
              + Add Property
            </button>
          </Link>
        </div>

       {/* Property Cards */}
<div className="p-4 grid grid-cols-1 gap-3">
  {filteredProperties.map((property, index) => (
    <div
      key={property._id?.$oid || index}
      className={`rounded-lg shadow-md overflow-hidden ${
        cardBackgroundColors[index % cardBackgroundColors.length]
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 gap-4">
        {/* Image */}
        <div className="flex-shrink-0 relative w-24 h-24 sm:w-28 sm:h-28 mx-auto sm:mx-0">
          <img
            src={
              property.propertyImage
                ? `http://localhost:5000/uploads/${property.propertyImage}`
                : "https://placehold.co/128x128/cccccc/ffffff?text=Property"
            }
            alt="Property"
            className="rounded-lg object-cover w-full h-full"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/128x128/cccccc/ffffff?text=Property";
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,0 L 100,0 A 100,100 0 0,1 0,100 Z"
                fill="rgba(255, 255, 0, 0.5)"
              />
            </svg>
          </div>
        </div>

        {/* Property Info */}
        <div className="flex-1 text-sm sm:text-base space-y-2">
          <h2 className="text-lg font-bold break-words text-center sm:text-left">
            {property.propertyName || "Property Name"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
            <div>
              <span className="font-semibold text-black">Address:</span>
              <p className="text-gray-700 break-words">{property.address || "N/A"}</p>
            </div>
            <div>
              <span className="font-semibold text-black">Purchase Date:</span>
              <p className="text-gray-700">{property.purchaseDate || "N/A"}</p>
            </div>
            <div>
              <span className="font-semibold text-black">Year Built:</span>
              <p className="text-gray-700">{property.yearBuilt || "N/A"}</p>
            </div>
            <div>
              <span className="font-semibold text-black">Square Foot:</span>
              <p className="text-gray-700">{property.sizeSqft || "N/A"} sq ft</p>
            </div>
          </div>
        </div>

        {/* View Button */}
        <div className="flex justify-center sm:justify-end">
          <Link href={`/Dashboard/multiproperty/${property._id}/view`} passHref>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm w-full sm:w-auto">
              View Property
            </button>
          </Link>
        </div>
      </div>
    </div>
  ))}

  {filteredProperties.length === 0 && (
    <div className="bg-gray-100 text-center py-8 rounded-lg text-gray-500">
      No properties found.
    </div>
  )}
</div>

      </main>
    </div>
  );
};

export default PropertyPage;
