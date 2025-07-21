"use client";

import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa"; // Icon for the card tab
import Link from "next/link"; // Import Link for navigation
const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United States", // Default value as in the image
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details Submitted:", formData);
    alert("Payment details submitted!");
    // In a real application, you'd process the payment here
  };

  // Common input styles
  const inputStyle =
    "p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-gray-800";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const sectionWrapperStyle =
    "bg-white p-3 sm:p-5 rounded-lg shadow-sm border border-gray-200";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-2 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-1 font-inter">
          Payment
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Pay for your home management needs
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-5 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border-2 border-blue-800">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Packages</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border-2 border-blue-800">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-blue-800 mt-2 font-medium">
            Payment
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Add property</span>
        </div>
      </div>

      {/* Payment Details Card   */}
      <div className="w-full max-w-2xl">
        <div className="bg-orange-500 text-white text-center py-2 rounded-t-lg font-semibold text-xl">
          Payment Details
        </div>
        <div className={sectionWrapperStyle}>
          {/* Payment Method Tabs (only Card shown in image) */}
          <div className="flex justify-start mb-4">
            <button className="flex items-center px-6 py-2 bg-blue-50 border border-blue-200 rounded-md text-blue-700 font-medium shadow-sm">
              <FaCreditCard className="mr-2 text-xl" />
              Card
            </button>
            {/* Other payment methods would go here */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className={labelStyle}>
                Card number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 1234 1234 1234"
                  className={inputStyle}
                  maxLength="19" // 16 digits + 3 spaces
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                  {/* Placeholder for card logos */}
                  <img
                    src="https://placehold.co/30x20/ffffff/000000?text=VISA"
                    alt="Visa"
                    className="h-5 rounded"
                  />
                  <img
                    src="https://placehold.co/30x20/ffffff/000000?text=MC"
                    alt="Mastercard"
                    className="h-5 rounded"
                  />
                  <img
                    src="https://placehold.co/30x20/ffffff/000000?text=DISC"
                    alt="Discover"
                    className="h-5 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className={labelStyle}>
                  Expiry
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM / YY"
                  className={inputStyle}
                  maxLength="7" // MM / YY (5 chars) + space (1 char) + slash (1 char)
                />
              </div>
              <div>
                <label htmlFor="cvc" className={labelStyle}>
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="CVC"
                  className={inputStyle}
                  maxLength="4"
                />
              </div>
            </div>

            {/* Country and Postal Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className={labelStyle}>
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
              <div>
                <label htmlFor="postalCode" className={labelStyle}>
                  Postal code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="90210"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 ">
              <Link href="/Firstuser/PackagesPagemain">
                <button
                  type="button"
                  className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
