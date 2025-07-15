"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebarr";
import ProfileDropdown from "../../components/ProfileDropdown";
import { CiBellOn } from "react-icons/ci";
import { HexColorPicker } from "react-colorful";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(true);

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

  const [colorTheme, setColorTheme] = useState("#007bff"); // Default blue
  const [showColorPicker, setShowColorPicker] = useState(false); // To toggle color picker visibility
  const [propertyName, setPropertyName] = useState("");
  const [propertyImage, setPropertyImage] = useState(null); // Stores the File object
  const [address, setAddress] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [sizeSqft, setSizeSqft] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPropertyImage(e.target.files[0]);
    }
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("colorTheme", colorTheme);
  formData.append("propertyName", propertyName);
  formData.append("address", address);
  formData.append("purchaseDate", purchaseDate);
  formData.append("purchasePrice", purchasePrice);
  formData.append("yearBuilt", yearBuilt);
  formData.append("interestRate", interestRate);
  formData.append("sizeSqft", sizeSqft);
  if (propertyImage) {
    formData.append("propertyImage", propertyImage);
  }

  try {
    const response = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    alert("Property submitted successfully!");
  } catch (err) {
    console.error(err);
    alert("Submission failed!");
  }
};

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen bg-white">
  //       <div ref={sidebarRef}>
  //         <Sidebar
  //           isSidebarOpen={isSidebarOpen}
  //           toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
  //         />
  //       </div>
  //       <div
  //         className={`flex-1 flex items-center justify-center transition-all duration-300 ${
  //           isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
  //         }`}
  //       >
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //       </div>
  //     </div>
  //   );
  // }

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

          <div className="flex items-center space-x-4 self-end sm:self-auto">
            <div className="relative cursor-pointer">
              <CiBellOn className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full" />
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

        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-orange-500 rounded-t-lg -mx-8 -mt-8 px-8 py-2 mb-4">
            <h2 className="text-xl font-bold text-white text-center">
              Property Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Set Color Theme */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Set Color Theme
              </label>
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full cursor-pointer border border-gray-300 shadow-sm"
                  style={{ backgroundColor: colorTheme }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>
                <input
                  type="text"
                  value={colorTheme}
                  readOnly // Make it read-only as it's controlled by the picker
                  className="w-32 px-3 py-1 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showColorPicker && (
                  <div className="absolute z-10 mt-48 -ml-32">
                    {" "}
                    {/* Adjust position as needed */}
                    <HexColorPicker
                      color={colorTheme}
                      onChange={setColorTheme}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Property Name */}
            <div>
              <label
                htmlFor="propertyName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Property Name
              </label>
              <input
                type="text"
                id="propertyName"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
              />
            </div>

            {/* Property Image */}
            <div>
              <label
                htmlFor="propertyImage"
                className="block text-gray-700 text-sm font-semibold mb-1"
              >
                Property image
              </label>
              <input
                type="file"
                id="propertyImage"
                accept="image/*"
                className="hidden" // Hide default file input
                onChange={handleImageChange}
              />
              <div
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById("propertyImage").click()}
              >
                {propertyImage ? (
                  <img
                    src={URL.createObjectURL(propertyImage)}
                    alt="Property Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-500 text-xs mt-1 text-center">
                      Upload Image
                    </span>
                  </>
                )}
              </div>
              {propertyImage && (
                <p className="text-sm text-gray-500 mt-1">
                  {propertyImage.name}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Grid for Purchase Date, Price, Year Built, Interest Rate, Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Purchase Date */}
              <div>
                <label
                  htmlFor="purchaseDate"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Purchase Date
                </label>
                <input
                  type="date" // Use type="date" for date input
                  id="purchaseDate"
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label
                  htmlFor="purchasePrice"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Purchase Price
                </label>
                <input
                  type="number" // Use type="number" for currency
                  id="purchasePrice"
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  required
                />
              </div>

              {/* Year Built */}
              <div>
                <label
                  htmlFor="yearBuilt"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Year Built
                </label>
                <input
                  type="number"
                  id="yearBuilt"
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  required
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label
                  htmlFor="interestRate"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Interest Rate
                </label>
                <input
                  type="number"
                  step="0.01" // Allows decimal values for interest rate
                  id="interestRate"
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              {/* Size (Sqft) */}
              <div>
                <label
                  htmlFor="sizeSqft"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Size (Sqft)
                </label>
                <input
                  type="number"
                  id="sizeSqft"
                  className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sizeSqft}
                  onChange={(e) => setSizeSqft(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
               onClick={() =>
              (window.location.href = "/Dashboard/multiproperty")
            }
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Page;






