"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebarr";
import Link from "next/link";
import ProfileDropdown from "../../components/ProfileDropdown";
import { CiBellOn } from "react-icons/ci";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Form states
  const [name, setName] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [servicetype, setServicetype] = useState("Plumbing");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companywebsite, setCompanywebsite] = useState("");
  const [additionalnote, setAdditionalnote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractorData = {
      name,
      companyname,
      servicetype,
      phone,
      email,
      companywebsite,
      additionalnote,
    };

    try {
      const response = await fetch("http://localhost:5000/api/contractors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contractorData),
      });

      if (!response.ok) throw new Error("Failed to add contractor");

      alert("Contractor added successfully!");

      // Reset form
      setName("");
      setCompanyname("");
      setServicetype("Plumbing");
      setPhone("");
      setEmail("");
      setCompanywebsite("");
      setAdditionalnote("");
    } catch (error) {
      console.error("Error adding contractor:", error);
      alert("Error adding contractor. See console for details.");
    }
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
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <main
        className={`flex-1 px-4 py-6 md:py-8 ${
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
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add Contractor</h1>
          <div className="flex items-center space-x-4">
            <CiBellOn className="h-6 w-6 text-gray-500" />
            <ProfileDropdown
              currentProfile={{
                profilePicture: "https://placehold.co/40x40",
                username: "Admin",
              }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex justify-center">
          <div className="bg-[#f8f8f8] rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contractor Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <input
                    type="text"
                    value={companywebsite}
                    onChange={(e) => setCompanywebsite(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    value={servicetype}
                    onChange={(e) => setServicetype(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Landscaping">Landscaping</option>
                  </select>
                </div>
              </div>

              {/* Additional Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Note
                </label>
                <textarea
                  value={additionalnote}
                  onChange={(e) => setAdditionalnote(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Link href="/Dashboard/contractorManagement">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-sm rounded-md"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
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

export default Page;
