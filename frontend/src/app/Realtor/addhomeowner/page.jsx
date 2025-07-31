"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import ProfileDropdown from "../components/ProfileDropdown";
import { CiBellOn } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";

const plans = [
  {
    name: "Basic",
    description: "Manage 1 property with essential tracking",
    price: "5$",
    propertiesIncluded: 1,
    paymentType: "One time payment",
    isHighlighted: true, // Based on the blue border in the image
  },
  {
    name: "Standard",
    description: "Manage up to 3 properties with smart alerts",
    price: "15$",
    propertiesIncluded: 3,
    paymentType: "One time payment",
    isHighlighted: false,
  },
  {
    name: "Premium",
    description: "Manage up to 6 properties with advanced automation",
    price: "40$",
    propertiesIncluded: 6,
    paymentType: "One time payment",
    isHighlighted: false,
  },
];

const Page = () => { // Renamed 'page' to 'Page' for standard component naming convention
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [activeTab, setActiveTab] = useState("homeownerDetails"); // State to manage active tab

  // State for form fields
  const [homeownerName, setHomeownerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");

  const handleNext = () => {
    // Here you would typically handle form submission or move to the next step
    console.log("Next button clicked!");
    console.log({
      homeownerName,
      emailAddress,
      phoneNumber,
      propertyAddress,
    });
    // For a multi-step form, you might switch to the 'packages' tab
    // setActiveTab('packages');
  };
  const handleBuyNowClick = (planName) => {
    console.log(`Buy Now clicked for ${planName} plan!`);
    // Here you would add logic for purchase, e.g., redirect to checkout page
  };

  const handleCancel = () => {
    // Here you would typically reset the form or navigate back
    console.log("Cancel button clicked!");
    setHomeownerName("");
    setEmailAddress("");
    setPhoneNumber("");
    setPropertyAddress("");
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
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

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Add Home Owner
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

        {/* ------------------------------------------ */}
        <div className="bg-white px-4 sm:px-8 w-full "> {/* Added px-4 for smaller screens */}
          {/* Tabs Navigation */}
          <div className="flex flex-wrap space-x-2 sm:space-x-4 mb-5"> {/* Added flex-wrap for smaller screens, adjusted spacing */}
            <button
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors mb-2 sm:mb-0 ${ /* Adjusted padding, added mb for wrapping */
                activeTab === "homeownerDetails"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("homeownerDetails")}
            >
              Homeowner Details
            </button>
            <button
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors mb-2 sm:mb-0 ${
                activeTab === "packages"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("packages")}
            >
              Packages
            </button>
            <button
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors mb-2 sm:mb-0 ${
                activeTab === "payments"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
          </div>

          {/* Form Content */}
          {activeTab === "homeownerDetails" && (
            <div className="bg-[#F8F8F8] px-4 sm:px-8 py-5 rounded-lg shadow-md"> {/* Adjusted padding */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6"> {/* Adjusted heading size */}
                Add Homeowner Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8"> {/* Responsive grid */}
                <div>
                  <label
                    htmlFor="homeownerName"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Homeowner Name
                  </label>
                  <input
                    type="text"
                    id="homeownerName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={homeownerName}
                    onChange={(e) => setHomeownerName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      +92
                    </span>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="propertyAddress"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Property Address
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs (Packages, Payments) */}
          {activeTab === "packages" && (
            <div className="py-8 sm:py-12 bg-[#f8f8f8] rounded-lg p-4 sm:p-7 text-center text-gray-600"> {/* Adjusted padding */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20"> {/* Responsive grid, adjusted gap */}
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-md p-5 text-center flex flex-col justify-between
                   ${plan.isHighlighted ? "border-2 border-orange-500" : ""}`}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {plan.description}
                      </p>
                      <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-3"> {/* Adjusted text size */}
                        {plan.price}
                      </p>

                      <div className="space-y-4 mb-4">
                        <div className="flex items-center justify-center text-gray-700">
                          {/* House Icon */}
                          <svg
                            className="w-5 h-5 mr-2 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          <span>
                            {plan.propertiesIncluded} property included
                          </span>
                        </div>
                        <div className="flex items-center justify-center text-gray-700">
                          {/* Clock Icon */}
                          <svg
                            className="w-5 h-5 mr-2 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>{plan.paymentType}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyNowClick(plan.name)}
                      className="mt-auto px-6 sm:px-8 py-2 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "payments" && (
            <div className="bg-[#f8f8f8] rounded-lg p-4 sm:p-7 text-gray-600"> {/* Adjusted padding */}
              <div className="p-0 sm:p-5"> {/* Adjusted padding for inner div */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4"> {/* Adjusted heading size */}
                  Payment Details
                </h2>

                {/* Payment Method Icon */}
                <div className="w-16 h-12 sm:w-20 sm:h-16 bg-blue-100 border mb-3 border-blue-300 rounded-sm flex items-center justify-center text-blue-500"> {/* Adjusted icon container size */}
                  <FaRegCreditCard className="w-8 h-6 sm:w-10 sm:h-8" /> {/* Adjusted icon size */}
                </div>

                {/* Card Number */}
                <div className="mb-2">
                  <label
                    htmlFor="cardNumber"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Payment Logos */}
                  <div className="mt-2 flex justify-end space-x-1">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" // Updated image sources to direct URLs for better rendering
                      alt="Visa"
                      className="h-5"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                      alt="Mastercard"
                      className="h-5"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                      alt="American Express"
                      className="h-5"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Discover_Card_logo.svg/1200px-Discover_Card_logo.svg.png"
                      alt="Discover"
                      className="h-5"
                    />
                  </div>
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Expiry
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      placeholder="XXX"
                      className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {/* Pay button */}
                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                        onClick={() => console.log("Pay button clicked!")}
                    >
                        Pay Now
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;