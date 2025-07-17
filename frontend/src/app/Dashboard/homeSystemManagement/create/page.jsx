"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebarr";
import { CiBellOn } from "react-icons/ci";
import { HexColorPicker } from "react-colorful";
import { FaCloudUploadAlt } from "react-icons/fa"; // For the upload icon
import { MdOutlineDateRange } from "react-icons/md"; // For the calendar icon
import axios from "axios";
import ProfileDropdown from "../../components/ProfileDropdown";
import Link from "next/link";

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

  const [formData, setFormData] = useState({
    applianceName: "",
    modelNumber: "",
    brand: "",
    applianceType: "",
    serialNumber: "",
    maintenanceStatus: "",
    applianceImage: null,

    // Purchased from
    purchaseCompanyName: "",
    purchaseContactName: "",
    purchasePhoneNo: "",
    purchaseEmail: "",
    warrantyExpire: "",
    purchaseDate: "",
    purchaseCompanyWebsite: "",

    // Installed by
    installCompanyName: "",
    installContactName: "",
    installPhoneNo: "",
    installContractor: "",
    installEmail: "",
    installationDate: "",
    lastServiced: "",
    installCompanyWebsite: "",

    // Purchased by
    purchasedByCompanyName: "",
    purchasedByContactName: "",
    purchasedByPurchaseDate: "",
    purchasedByCompanyWebsite: "",
    purchasedByPhoneNo: "",

    additionalNotes: "",
  });

  // Handle input changes for text and select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      applianceImage: e.target.files[0], // Store the file object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare nested objects as expected by the backend
    const purchasedFrom = {
      companyName: formData.purchaseCompanyName,
      contactName: formData.purchaseContactName,
      phoneNo: formData.purchasePhoneNo,
      email: formData.purchaseEmail,
      warrantyExpires: formData.warrantyExpire,
      purchaseDate: formData.purchaseDate,
      companyWebsite: formData.purchaseCompanyWebsite,
    };

    const installedBy = {
      companyName: formData.installCompanyName,
      contactName: formData.installContactName,
      phoneNo: formData.installPhoneNo,
      contractor: formData.installContractor,
      email: formData.installEmail,
      lastServiced: formData.lastServiced,
      installationDate: formData.installationDate,
      companyWebsite: formData.installCompanyWebsite,
    };

    const purchasedBy = {
      companyName: formData.purchasedByCompanyName,
      contactName: formData.purchasedByContactName,
      purchaseDate: formData.purchasedByPurchaseDate,
      companyWebsite: formData.purchasedByCompanyWebsite,
      phoneNo: formData.purchasedByPhoneNo,
    };

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("applianceName", formData.applianceName);
    formDataToSend.append("modelNumber", formData.modelNumber);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("applianceType", formData.applianceType);
    formDataToSend.append("serialNumber", formData.serialNumber);
    formDataToSend.append("maintenanceStatus", formData.maintenanceStatus);
    formDataToSend.append("purchasedFrom", JSON.stringify(purchasedFrom));
    formDataToSend.append("installedBy", JSON.stringify(installedBy));
    formDataToSend.append("purchasedBy", JSON.stringify(purchasedBy));
    formDataToSend.append("additionalNotes", formData.additionalNotes);

    if (formData.applianceImage) {
      formDataToSend.append("image", formData.applianceImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appliances",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      alert("System saved successfully!");
      // Optionally reset the form here
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error: ${error.response?.data?.message || "Failed to save System"}`
      );
    }
  };

  // Common input styles
  const inputStyle =
    "p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const sectionTitleStyle = "text-lg font-semibold text-gray-800 mb-2";
  const sectionDescriptionStyle = "text-sm text-gray-500 mb-4";
  const sectionWrapperStyle =
    "bg-white p-6 rounded-lg shadow-sm border border-gray-200";

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
            Add Home System
          </h1>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative cursor-pointer">
              <CiBellOn className="h-6 w-6 md:h-7 md:w-7 text-gray-500 hover:text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
            </div>
            <ProfileDropdown
              currentProfile={{
                profilePicture: "https://placehold.co/40x40",
                username: "Admin",
              }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
          {/* System Detail Section */}
          <div className={sectionWrapperStyle}>
            <h2 className={sectionTitleStyle}>System Detail</h2>
            <p className={sectionDescriptionStyle}>
              Add your System's relevant detail
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="applianceName" className={labelStyle}>
                    System Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="applianceName"
                    name="applianceName"
                    value={formData.applianceName}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="modelNumber" className={labelStyle}>
                    Model Number
                  </label>
                  <input
                    type="text"
                    id="modelNumber"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="brand" className={labelStyle}>
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="applianceType" className={labelStyle}>
                    System Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="applianceType"
                    name="applianceType"
                    value={formData.applianceType}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="refrigerator">Refrigerator</option>
                    <option value="washing-machine">Washing Machine</option>
                    <option value="oven">Oven</option>
                    <option value="dishwasher">Dishwasher</option>
                    <option value="ac">Air Conditioner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="serialNumber" className={labelStyle}>
                    Serial Number
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="maintenanceStatus" className={labelStyle}>
                    Maintenance Status
                  </label>
                  <select
                    id="maintenanceStatus"
                    name="maintenanceStatus"
                    value={formData.maintenanceStatus}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select Status</option>
                    <option value="Good">Good</option>
                    <option value="Urgent Repair">Urgent Repair</option>
                    <option value="Upcoming Maintenance">
                      Upcoming Maintenance
                    </option>
                  </select>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="md:col-span-1 flex justify-center items-center">
                <label
                  htmlFor="applianceImage"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  {formData.applianceImage ? (
                    <img
                      src={URL.createObjectURL(formData.applianceImage)}
                      alt="Appliance Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaCloudUploadAlt className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        Upload or drag and image here
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="applianceImage"
                    name="applianceImage"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Purchased from Section */}
          <div className={sectionWrapperStyle}>
            <h2 className={sectionTitleStyle}>Purchased from</h2>
            <p className={sectionDescriptionStyle}>
              Add your System relevant detail
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="purchaseCompanyName" className={labelStyle}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="purchaseCompanyName"
                  name="purchaseCompanyName"
                  value={formData.purchaseCompanyName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="purchaseContactName" className={labelStyle}>
                  Contact Name
                </label>
                <input
                  type="text"
                  id="purchaseContactName"
                  name="purchaseContactName"
                  value={formData.purchaseContactName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="purchasePhoneNo" className={labelStyle}>
                  Phone No
                </label>
                <input
                  type="tel"
                  id="purchasePhoneNo"
                  name="purchasePhoneNo"
                  value={formData.purchasePhoneNo}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="purchaseEmail" className={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="purchaseEmail"
                  name="purchaseEmail"
                  value={formData.purchaseEmail}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className="relative">
                <label htmlFor="warrantyExpire" className={labelStyle}>
                  Warranty Express
                </label>
                <input
                  type="date"
                  id="warrantyExpire"
                  name="warrantyExpire"
                  value={formData.warrantyExpire}
                  onChange={handleChange}
                  className={`${inputStyle} pr-10`}
                />
                <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <label htmlFor="purchaseDate" className={labelStyle}>
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className={`${inputStyle} pr-10`}
                />
                <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
              <div className="lg:col-span-3">
                {" "}
                {/* Full width for website */}
                <label htmlFor="purchaseCompanyWebsite" className={labelStyle}>
                  Company Website
                </label>
                <input
                  type="url"
                  id="purchaseCompanyWebsite"
                  name="purchaseCompanyWebsite"
                  value={formData.purchaseCompanyWebsite}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Installed by Section */}
          <div className={sectionWrapperStyle}>
            <h2 className={sectionTitleStyle}>Installed by</h2>
            <p className={sectionDescriptionStyle}>
              Add your System's relevant detail
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="installCompanyName" className={labelStyle}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="installCompanyName"
                  name="installCompanyName"
                  value={formData.installCompanyName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="installContactName" className={labelStyle}>
                  Contact Name
                </label>
                <input
                  type="text"
                  id="installContactName"
                  name="installContactName"
                  value={formData.installContactName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="installPhoneNo" className={labelStyle}>
                  Phone No
                </label>
                <input
                  type="tel"
                  id="installPhoneNo"
                  name="installPhoneNo"
                  value={formData.installPhoneNo}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="installContractor" className={labelStyle}>
                  Select Contractor
                </label>
                <select
                  id="installContractor"
                  name="installContractor"
                  value={formData.installContractor}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Select</option>
                  <option value="contractor1">Contractor 1</option>
                  <option value="contractor2">Contractor 2</option>
                </select>
              </div>
              <div>
                <label htmlFor="installEmail" className={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="installEmail"
                  name="installEmail"
                  value={formData.installEmail}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className="relative">
                <label htmlFor="installationDate" className={labelStyle}>
                  Installation Date
                </label>
                <input
                  type="date"
                  id="installationDate"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                  className={`${inputStyle} pr-10`}
                />
                <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <label htmlFor="lastServiced" className={labelStyle}>
                  Last Serviced
                </label>
                <input
                  type="date"
                  id="lastServiced"
                  name="lastServiced"
                  value={formData.lastServiced}
                  onChange={handleChange}
                  className={`${inputStyle} pr-10`}
                />
                <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
              <div className="lg:col-span-3">
                {" "}
                {/* Full width for website */}
                <label htmlFor="installCompanyWebsite" className={labelStyle}>
                  Company Website
                </label>
                <input
                  type="url"
                  id="installCompanyWebsite"
                  name="installCompanyWebsite"
                  value={formData.installCompanyWebsite}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Purchased by Section */}
          <div className={sectionWrapperStyle}>
            <h2 className={sectionTitleStyle}>Purchased by</h2>
            <p className={sectionDescriptionStyle}>
              Add your System's relevant detail
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="purchasedByCompanyName" className={labelStyle}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="purchasedByCompanyName"
                  name="purchasedByCompanyName"
                  value={formData.purchasedByCompanyName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="purchasedByContactName" className={labelStyle}>
                  Contact Name
                </label>
                <input
                  type="text"
                  id="purchasedByContactName"
                  name="purchasedByContactName"
                  value={formData.purchasedByContactName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className="relative">
                <label htmlFor="purchasedByPurchaseDate" className={labelStyle}>
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchasedByPurchaseDate"
                  name="purchasedByPurchaseDate"
                  value={formData.purchasedByPurchaseDate}
                  onChange={handleChange}
                  className={`${inputStyle} pr-10`}
                />
                <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              </div>
              <div>
                <label
                  htmlFor="purchasedByCompanyWebsite"
                  className={labelStyle}
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="purchasedByCompanyWebsite"
                  name="purchasedByCompanyWebsite"
                  value={formData.purchasedByCompanyWebsite}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="purchasedByPhoneNo" className={labelStyle}>
                  Phone No
                </label>
                <input
                  type="tel"
                  id="purchasedByPhoneNo"
                  name="purchasedByPhoneNo"
                  value={formData.purchasedByPhoneNo}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className={sectionWrapperStyle}>
            <h2 className={sectionTitleStyle}>Additional Notes</h2>
            <p className={sectionDescriptionStyle}>
              Add more detail about System
            </p>
            <div>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="4"
                className={`${inputStyle} resize-y`}
                placeholder="Type here"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link href="/Dashboard/homeSystemManagement">
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Page;
