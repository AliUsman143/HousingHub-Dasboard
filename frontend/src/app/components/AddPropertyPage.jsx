"use client";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import PropertyFormPopup from "./PropertyFormPopup";

const AddPropertyPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddProperty = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitProperty = async (formData) => {
    try {
      const fd = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          fd.append(key, formData[key]);
        }
      }

      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        body: fd,
      });

      const result = await response.json();
      console.log(result);
      alert("Property submitted successfully!");
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-2 font-inter">
          Add Property
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Add your first property to manage everything
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12 w-full max-w-md">
        {/* Your progress indicator code */}
      </div>

      {/* Add Property Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <FaHome className="text-blue-200 text-6xl" />
          <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-orange-500 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <p className="text-gray-600 mb-8 text-base sm:text-lg px-4">
          Enter your property details to start managing your home systems
        </p>

        <button
          onClick={handleAddProperty}
          className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Property
        </button>
      </div>

      {/* Property Form Popup */}
      {showPopup && (
        <PropertyFormPopup
          onClose={handleClosePopup}
          onSubmit={handleSubmitProperty}
        />
      )}
    </div>
  );
};

export default AddPropertyPage;
