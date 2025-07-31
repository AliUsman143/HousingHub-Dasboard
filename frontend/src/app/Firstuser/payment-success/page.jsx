"use client";
import React, { useState } from "react";
import PropertyForm from "../addproperty/page"; // Import your PropertyForm component

const PaymentSuccess = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-2">
          Add Property
        </h1>
        <p className="text-lg text-gray-700">
          Add your first property to manage everything
        </p>
      </header>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center mb-12 w-full max-w-lg">
        {/* Step 1: Packages (Completed) */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm mt-2 text-blue-800 font-medium">Packages</p>
        </div>

        {/* Line between steps */}
        <div className="flex-1 h-1 bg-blue-700 mx-2"></div>

        {/* Step 2: Payment (Completed) */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm mt-2 text-blue-800 font-medium">Payment</p>
        </div>

        {/* Line between steps */}
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

        {/* Step 3: Add property (Current/Active) */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full border-2 border-blue-700 flex items-center justify-center text-blue-700 text-2xl font-bold">
            <div className="w-4 h-4 rounded-full bg-blue-700"></div>
          </div>
          <p className="text-sm mt-2 text-blue-800 font-medium">
            Add property
          </p>
        </div>
      </div>

      {/* Add Property Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center justify-center mb-6">
          {/* House Icon with Plus */}
          <div className="relative mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h2a1 1 0 001-1m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h6"
              />
            </svg>
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-orange-500 rounded-full p-1 border-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enter your property details to <br /> start managing your home
            systems
          </p>
        </div>

        {/* Add Property Button - now triggers popup */}
        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-lg flex items-center justify-center transition-colors duration-200 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Property
        </button>
      </div>

      {/* Property Form Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center  z-90">
          <div className="bg-white rounded-lg shadow-xl p-3 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center ">
              <h3 className="text-lg font-bold">Add Property Details</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Property Form Component */}
            <PropertyForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;