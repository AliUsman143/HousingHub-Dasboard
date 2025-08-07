"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md"; // For the calendar icon

const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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
    taskName: "",
    maintenanceDate: "",
    maintenanceType: "Single Time", // Default to 'Single Time'
    homeSystem: "",
    recurringType: "Monthly", // Default to 'Monthly'
    reminder: "20 Days", // Default to '20 Days'
    taskDescription: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value : value, // For radio buttons, just set the value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Detail Submitted:", formData);
    // Here you would typically send formData to an API
    alert("Task submitted! Check console for data.");
  };

  // Common input styles
  const inputStyle =
    "p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const sectionTitleStyle = "text-lg font-semibold text-gray-800 mb-2";
  const sectionWrapperStyle =
    "bg-[#f8f8f8] p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"; // Added padding for smaller screens

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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quos
        debitis numquam asperiores corporis officia magnam aliquam molestiae sed
        facilis maxime odit tenetur, itaque dolorem quae laudantium iure cumque!
        At?
        <div className="  flex justify-center items-center">
          <div className="w-full max-w-3xl ">
            {" "}
            {/* Max width for the form container */}
            <form  onSubmit={handleSubmit} className={sectionWrapperStyle}>
              <h2 className={sectionTitleStyle}>Task Detail</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {/* Task Name */}
                <div className="md:col-span-2">
                  <label htmlFor="taskName" className={labelStyle}>
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                {/* Maintenance Date */}
                <div className="relative">
                  <label htmlFor="maintenanceDate" className={labelStyle}>
                    Maintenance Date
                  </label>
                  <input
                    type="date"
                    id="maintenanceDate"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleChange}
                    className={`${inputStyle} pr-10`} // Add padding for icon
                  />
                  <MdOutlineDateRange className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
                </div>

                {/* Maintenance Type */}
                <div>
                  <label className={labelStyle}>Maintenance Type:</label>
                  <div className="flex items-center space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Single Time"
                        checked={formData.maintenanceType === "Single Time"}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        Single Time
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="Recurring"
                        checked={formData.maintenanceType === "Recurring"}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        Recurring
                      </span>
                    </label>
                  </div>
                </div>

                {/* Home System */}
                <div>
                  <label htmlFor="homeSystem" className={labelStyle}>
                    Home System
                  </label>
                  <select
                    id="homeSystem"
                    name="homeSystem"
                    value={formData.homeSystem}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select System</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Appliance">Appliance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Recurring type (conditionally rendered) */}
                {formData.maintenanceType === "Recurring" && (
                  <div>
                    <label htmlFor="recurringType" className={labelStyle}>
                      Recurring type
                    </label>
                    <select
                      id="recurringType"
                      name="recurringType"
                      value={formData.recurringType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                )}

                {/* Set Reminder */}
                <div className="md:col-span-2">
                  <label className={labelStyle}>Set Reminder:</label>
                  <div className="flex flex-wrap items-center space-x-4 mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="reminder"
                        value="10 Days"
                        checked={formData.reminder === "10 Days"}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        10 Days
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="reminder"
                        value="20 Days"
                        checked={formData.reminder === "20 Days"}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        20 Days
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="reminder"
                        value="30 Days" // Assuming the third option is 30 Days based on common patterns
                        checked={formData.reminder === "30 Days"}
                        onChange={handleChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        30 Days
                      </span>
                    </label>
                  </div>
                </div>

                {/* Task Description */}
                <div className="md:col-span-2">
                  <label htmlFor="taskDescription" className={labelStyle}>
                    Task Description
                  </label>
                  <textarea
                    id="taskDescription"
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleChange}
                    rows="3"
                    className={`${inputStyle} resize-y`}
                    placeholder="Type here"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Link href="/Dashboard/maintenanceScheduling">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
