"use client";
import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Link from "next/link";
import { useRouter } from "next/navigation";
const PropertyForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
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

  return (
    <div className="flex h-auto bg-white">
      {/* Main Content - now with fixed height */}
      <main className="flex-1 px-3 sm:px-4 pt-2 transition-all duration-300 ">
        {/* Compact Form Container */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-2xl mx-auto h-[75vh] flex flex-col">
          {/* Tiny Header */}
          <div className="bg-orange-500 rounded-t-lg -mx-4 -mt-4 px-4 py-1 mb-2">
            <h2 className="text-base font-bold text-white text-center">
              Property Details
            </h2>
          </div>

          {/* Ultra-Compact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col space-y-2"
          >
            {/* Mini Color Picker */}
            <div>
              <label className="block text-gray-700 text-xs mb-1">
                Theme Color
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full cursor-pointer border border-gray-300"
                  style={{ backgroundColor: colorTheme }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
                <input
                  type="text"
                  value={colorTheme}
                  readOnly
                  className="w-20 px-2 py-0.5 text-xs border border-gray-300 rounded bg-gray-50"
                />
                {showColorPicker && (
                  <div className="absolute z-10">
                    <HexColorPicker
                      color={colorTheme}
                      onChange={setColorTheme}
                      width={150}
                      height={150}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tiny Property Name */}
            <div>
              <label className="block text-gray-700 text-xs mb-1">
                Property Name
              </label>
              <input
                type="text"
                className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
              />
            </div>

            {/* Mini Image Upload */}
            <div>
              <label className="block text-gray-700 text-xs mb-1">Image</label>
              <input
                type="file"
                id="propertyImage"
                className="hidden"
                onChange={handleImageChange}
              />
              <div
                className="w-16 h-16 border border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("propertyImage").click()}
              >
                {propertyImage ? (
                  <img
                    src={URL.createObjectURL(propertyImage)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Compact Address */}
            <div>
              <label className="block text-gray-700 text-xs mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Super Compact Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
              {/* Purchase Date */}
              <div>
                <label className="block text-gray-700 text-xs mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label className="block text-gray-700 text-xs mb-1">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  required
                />
              </div>

              {/* Year Built */}
              <div>
                <label className="block text-gray-700 text-xs mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  required
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-gray-700 text-xs mb-1">
                  Interest Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-gray-700 text-xs mb-1">
                  Size (Sqft)
                </label>
                <input
                  type="number"
                  className="w-full px-2 py-0.5 text-xs border border-gray-300 rounded"
                  value={sizeSqft}
                  onChange={(e) => setSizeSqft(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tiny Buttons at Bottom */}
            <div className="flex justify-end space-x-2">
             <Link href="/Dashboard/dashboard">
                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-orange-500 text-white rounded"
                >
                  Save
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PropertyForm;
