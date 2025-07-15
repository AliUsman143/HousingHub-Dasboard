"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebarr";
import { useParams } from "next/navigation";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [editedProperty, setEditedProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setProperty(res.data);
        setEditedProperty(res.data); // Initialize editable copy
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property data.");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditedProperty({
      ...editedProperty,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/properties/${id}`,
        editedProperty
      );
      setProperty(editedProperty);
      setIsEditing(false);
      alert("✅ Property updated successfully");
    } catch (error) {
      console.error("❌ Error updating property:", error);
      alert("Failed to update property");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
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
        <div className="w-full max-w-4xl space-y-6">
          {/* Image and Top Section */}
          <div className="bg-white flex flex-col md:flex-row items-center p-4 relative">
            <div className="relative w-44 h-44 md:w-64 md:h-56 flex-shrink-0 mb-2 md:mb-0">
              <img
                src={`http://localhost:5000/uploads/${property.propertyImage}`}
                alt="Property"
                className="rounded-lg object-cover w-full h-full shadow-sm"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/192x192/cccccc/ffffff?text=No+Image";
                }}
              />
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,0 L 200,0 A 200,200 0 0,1 0,200 Z"
                    fill="#FFD700"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-grow md:ml-6 text-center md:text-left">
              {isEditing ? (
                <input
                  type="text"
                  name="propertyName"
                  value={editedProperty.propertyName}
                  onChange={handleInputChange}
                  className="text-xl sm:text-3xl font-bold border p-1 rounded w-full"
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {property.propertyName}
                </h2>
              )}

              {/* Color Theme */}
              <div className="flex items-center justify-center md:justify-start mb-4">
                <span className="text-gray-800 font-medium mr-2">
                  Color theme
                </span>
                <div
                  className="w-6 h-6 rounded-md border border-gray-300 mr-2"
                  style={{
                    backgroundColor: editedProperty?.colorTheme || "#cccccc",
                  }}
                ></div>
                <input
                  name="colorTheme"
                  value={editedProperty.colorTheme}
                  onChange={handleInputChange}
                  className={`px-2 py-1 border border-gray-300 rounded-md text-sm font-mono ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  disabled={!isEditing}
                />
              </div>

              {/* Edit/Save Button */}
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                className="flex items-center justify-center px-6 py-2 bg-[#FF8A8A] text-white rounded-md shadow-sm transition-colors"
              >
                {isEditing ? (
                  <>
                    <FaSave className="mr-2" /> Save
                  </>
                ) : (
                  <>
                    <CiEdit className="mr-2" /> Edit Property
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Property Details Section */}
          {/* <div className="bg-white px-6 relative">
           
           
            </div> */}
          <div className="flex justify-between items-center mb-2 px-7">
            <h3 className="text-xl font-bold text-gray-900">
              Property Details:
            </h3>
          </div>

          {/* Detail Section */}
          <div className="bg-white px-6 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#f5ecec] p-3 px-4 gap-4 text-gray-800">
              {[
                ["address", "Address"],
                ["purchaseDate", "Purchase Date"],
                ["yearBuilt", "Year Built"],
                ["sizeSqft", "Square Foot"],
              ].map(([key, label]) => (
                <div key={key}>
                  <strong className="font-semibold block text-black">
                    {label}:
                  </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={editedProperty[key]}
                      onChange={handleInputChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-700">{property[key] || "N/A"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
