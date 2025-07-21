"use client";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Link from "next/link";

const PropertyFormPopup = ({ onClose, onSubmit }) => {
  const [colorTheme, setColorTheme] = useState("#007bff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      colorTheme,
      propertyName,
      propertyImage,
      address,
      purchaseDate,
      purchasePrice,
      yearBuilt,
      interestRate,
      sizeSqft,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-orange-500 rounded-t-lg px-8 py-1 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Property Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Form fields remain the same as your CreatePropertyPage */}
          {/* Set Color Theme */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Set Color Theme
            </label>
            <div className="flex items-center space-x-3 relative">
              <div
                className="w-6 h-6 rounded-full cursor-pointer border border-gray-300 shadow-sm"
                style={{ backgroundColor: colorTheme }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              ></div>
              <input
                type="text"
                value={colorTheme}
                readOnly
                className="w-32 px-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showColorPicker && (
                <div className="absolute z-10 top-8 left-0">
                  <HexColorPicker
                    color={colorTheme}
                    onChange={setColorTheme}
                    width={200}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Property Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Property Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>
          {/* Property Image */}
          <div>
            <label
              htmlFor="propertyImage"
              className="block text-gray-700 text-sm font-semibold "
            >
              Property image
            </label>
            <input
              type="file"
              id="propertyImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div
              className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
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
                  <span className="text-gray-500 text-xs  text-center">
                    Upload Image
                  </span>
                </>
              )}
            </div>
            {propertyImage && (
              <p className="text-sm text-gray-500">{propertyImage.name}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-semibold "
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Grid for Purchase Date, Price, Year Built, Interest Rate, Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {/* Purchase Date */}
            <div>
              <label
                htmlFor="purchaseDate"
                className="block text-gray-700 text-sm font-semibold "
              >
                Purchase Date
              </label>
              <input
                type="date"
                id="purchaseDate"
                className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
              />
            </div>

            {/* Purchase Price */}
            <div>
              <label
                htmlFor="purchasePrice"
                className="block text-gray-700 text-sm font-semibold "
              >
                Purchase Price
              </label>
              <input
                type="number"
                id="purchasePrice"
                className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                required
              />
            </div>

            {/* Year Built */}
            <div>
              <label
                htmlFor="yearBuilt"
                className="block text-gray-700 text-sm font-semibold "
              >
                Year Built
              </label>
              <input
                type="number"
                id="yearBuilt"
                className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(e.target.value)}
                required
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="block text-gray-700 text-sm font-semibold "
              >
                Interest Rate
              </label>
              <input
                type="number"
                step="0.01"
                id="interestRate"
                className="w-full px-4  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            {/* Size (Sqft) */}
            <div>
              <label
                htmlFor="sizeSqft"
                className="block text-gray-700 text-sm font-semibold "
              >
                Size (Sqft)
              </label>
              <input
                type="number"
                id="sizeSqft"
                className="w-full px-4  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sizeSqft}
                onChange={(e) => setSizeSqft(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-6 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormPopup;
