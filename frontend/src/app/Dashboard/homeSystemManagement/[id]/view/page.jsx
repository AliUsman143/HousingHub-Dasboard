"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebarr"; // Assuming this path is correct
import { useParams } from "next/navigation";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaSave, FaCloudUploadAlt } from "react-icons/fa"; // Added FaCloudUploadAlt for image upload
import { MdOutlineDateRange } from "react-icons/md"; // Added for date pickers in edit mode
import { FaRegClock } from "react-icons/fa6"; // For the clock icon next to upcoming maintenance date

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { id } = useParams();
  const [appliance, setAppliance] = useState(null);
  const [editedAppliance, setEditedAppliance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States for individual section editing
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditingPurchase, setIsEditingPurchase] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // State for image preview during edit
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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

  useEffect(() => {
    const fetchAppliance = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appliances/${id}`);
        const fetchedAppliance = res.data;

        // Initialize state, ensure date fields are formatted for input type="date"
        const formattedAppliance = {
          ...fetchedAppliance,
          installedBy: {
            ...fetchedAppliance.installedBy,
            lastServiced: fetchedAppliance.installedBy?.lastServiced ? fetchedAppliance.installedBy.lastServiced.split('T')[0] : '',
          },
          purchasedFrom: {
            ...fetchedAppliance.purchasedFrom,
            purchaseDate: fetchedAppliance.purchasedFrom?.purchaseDate ? fetchedAppliance.purchasedFrom.purchaseDate.split('T')[0] : '',
            warrantyExpire: fetchedAppliance.purchasedFrom?.warrantyExpire ? fetchedAppliance.purchasedFrom.warrantyExpire.split('T')[0] : '',
          },
          // Assuming 'upcomingMaintenance' is a direct field on appliance or part of installedBy
          upcomingMaintenance: fetchedAppliance.upcomingMaintenance ? fetchedAppliance.upcomingMaintenance.split('T')[0] : '',
          // Assuming `image` from API is just the filename, construct full URL for display
          // and set initial preview if image exists
          applianceImageFile: null // This will hold the File object if a new one is selected
        };

        setAppliance(formattedAppliance);
        setEditedAppliance(formattedAppliance);
        // Set initial image preview if an image exists
        if (fetchedAppliance.image) {
          setImagePreviewUrl(`http://localhost:5000/uploads/${fetchedAppliance.image}`);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch appliance data.");
        setLoading(false);
      }
    };
    fetchAppliance();
  }, [id]);

  // Function to handle changes in any nested input
  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    setEditedAppliance(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  // Handle image file selection
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedAppliance(prev => ({
        ...prev,
        applianceImageFile: file, // Store the File object
      }));
      setImagePreviewUrl(URL.createObjectURL(file)); // Create URL for instant preview
    } else {
      setEditedAppliance(prev => ({
        ...prev,
        applianceImageFile: null,
      }));
      setImagePreviewUrl(appliance.image ? `http://localhost:5000/uploads/${appliance.image}` : null); // Revert to original or no image
    }
  };

  const handleSave = async (sectionToSave) => {
  setLoading(true);
  const formData = new FormData();

  // Append all fields including nested objects as JSON strings
  formData.append('applianceName', editedAppliance.applianceName || '');
  formData.append('modelNumber', editedAppliance.modelNumber || '');
  formData.append('brand', editedAppliance.brand || '');
  formData.append('applianceType', editedAppliance.applianceType || '');
  formData.append('serialNumber', editedAppliance.serialNumber || '');
  formData.append('maintenanceStatus', editedAppliance.maintenanceStatus || '');
  formData.append('additionalNotes', editedAppliance.additionalNotes || '');
  
  // Stringify nested objects
  formData.append('purchasedFrom', JSON.stringify(editedAppliance.purchasedFrom || {}));
  formData.append('installedBy', JSON.stringify(editedAppliance.installedBy || {}));
  formData.append('purchasedBy', JSON.stringify(editedAppliance.purchasedBy || {}));

  // Append image file if it exists
  if (editedAppliance.applianceImageFile) {
    formData.append('image', editedAppliance.applianceImageFile);
  }

  try {
    const res = await axios.put(
      `http://localhost:5000/api/appliances/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    setAppliance(res.data);
    if (res.data.image) {
      setImagePreviewUrl(`http://localhost:5000/uploads/${res.data.image}`);
    }

    if (sectionToSave === 'header') setIsEditingHeader(false);
    if (sectionToSave === 'purchase') setIsEditingPurchase(false);
    if (sectionToSave === 'notes') setIsEditingNotes(false);
    
    alert("✅ Appliance updated successfully");
  } catch (error) {
    console.error("❌ Error updating appliance:", error.response?.data || error.message);
    alert(`Failed to update appliance: ${error.response?.data?.message || error.message}`);
  } finally {
    setLoading(false);
  }
};

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A"; // Handle invalid date strings
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };


  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <div ref={sidebarRef}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div
          className={`flex-1 flex items-center justify-center transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-white">
        <div ref={sidebarRef}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-bold">Error loading property</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Changed bg-white to bg-gray-100 for overall background */}
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
        <div className="w-full max-w-4xl mx-auto space-y-6"> {/* Added mx-auto for centering */}

          {/* Top Appliance Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center relative">
            {/* Edit/Save Button for Header */}
            <button
              onClick={() => isEditingHeader ? handleSave('header') : setIsEditingHeader(true)}
              className="absolute top-4 right-4 flex items-center px-4 py-2 rounded-md transition-colors text-sm"
              style={{ backgroundColor: isEditingHeader ? '#FF8A8A' : '#FEE2E2', color: isEditingHeader ? 'white' : '#DC2626' }}
            >
              {isEditingHeader ? (
                <>
                  <FaSave className="mr-2" /> Save
                </>
              ) : (
                <>
                  <CiEdit className="mr-2" /> Edit
                </>
              )}
            </button>

            {/* Appliance Image */}
            <div className="relative w-44 h-44 md:w-64 md:h-56 flex-shrink-0 mb-4 md:mb-0 mr-0 md:mr-6">
              {isEditingHeader && (
                <label
                  htmlFor="applianceImageUpload"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white rounded-lg cursor-pointer hover:bg-opacity-70 transition-opacity"
                >
                  <FaCloudUploadAlt className="w-10 h-10 mb-2" />
                  <span className="text-sm">Change Image</span>
                  <input
                    id="applianceImageUpload"
                    type="file"
                    className="hidden"
                    onChange={handleImageFileChange}
                    accept="image/*"
                  />
                </label>
              )}
              <img
                src={imagePreviewUrl || "https://placehold.co/192x192/cccccc/ffffff?text=No+Image"}
                alt="Appliance"
                className="rounded-lg object-cover w-full h-full shadow-sm"
                onError={(e) => {
                  e.target.src = "https://placehold.co/192x192/cccccc/ffffff?text=No+Image";
                }}
              />
            </div>

            {/* Appliance Info */}
            <div className="flex-grow text-center md:text-left">
              {isEditingHeader ? (
                <input
                  type="text"
                  name="applianceName"
                  value={editedAppliance.applianceName || ""}
                  onChange={(e) => handleInputChange(e, null, 'applianceName')}
                  className="text-xl sm:text-3xl font-bold border p-1 rounded w-full mb-2"
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {appliance.applianceName || "N/A"}
                </h2>
              )}

              {/* Last Serviced Date */}
              <p className="text-gray-600 text-sm mb-2">
                last serviced :{" "}
                {isEditingHeader ? (
                  <input
                    type="date"
                    name="lastServiced"
                    value={editedAppliance.installedBy?.lastServiced || ""}
                    onChange={(e) => handleInputChange(e, 'installedBy', 'lastServiced')}
                    className="border p-1 rounded text-sm inline-block"
                  />
                ) : (
                  formatDateForDisplay(appliance.installedBy?.lastServiced)
                )}
              </p>

              {/* Upcoming Maintenance Status */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                <span className="bg-yellow-300 text-yellow-800 font-semibold px-4 py-2 rounded-full text-sm inline-flex items-center">
                  Upcoming Maintenance
                </span>
                {isEditingHeader ? (
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      name="upcomingMaintenance"
                      value={editedAppliance.upcomingMaintenance || ""}
                      onChange={(e) => handleInputChange(e, null, 'upcomingMaintenance')}
                      className="border p-1 rounded text-sm pr-8"
                    />
                    <MdOutlineDateRange className="absolute right-2 text-gray-400 pointer-events-none" />
                  </div>
                ) : (
                  <div className="flex items-center text-gray-700 text-sm">
                    {formatDateForDisplay(appliance.upcomingMaintenance)}{" "}
                    <FaRegClock className="ml-1 text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase & Warranty Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Purchase & Warranty
              </h3>
              {/* Edit/Save Button for Purchase & Warranty */}
              <button
                onClick={() => isEditingPurchase ? handleSave('purchase') : setIsEditingPurchase(true)}
                className="flex items-center px-4 py-2 rounded-md transition-colors text-sm"
                style={{ backgroundColor: isEditingPurchase ? '#FF8A8A' : '#FEE2E2', color: isEditingPurchase ? 'white' : '#DC2626' }}
              >
                {isEditingPurchase ? (
                  <>
                    <FaSave className="mr-2" /> Save
                  </>
                ) : (
                  <>
                    <CiEdit className="mr-2" /> Edit
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                { label: "Serial No.", keyPath: "serialNumber", type: "text" },
                { label: "Brand", keyPath: "brand", type: "text" },
                { label: "Model", keyPath: "modelNumber", type: "text" },
                { label: "Purchase Date", keyPath: "purchasedFrom.purchaseDate", type: "date" },
                { label: "Warranty Expiry", keyPath: "purchasedFrom.warrantyExpire", type: "date" },
              ].map((field) => {
                const keys = field.keyPath.split(".");
                const value = keys.reduce((acc, key) => acc?.[key], editedAppliance);
                const displayValue = field.type === "date" ? formatDateForDisplay(value) : value || "N/A";

                return (
                  <div key={field.keyPath}>
                    <strong className="block text-gray-600 text-sm mb-1">{field.label}</strong>
                    {isEditingPurchase ? (
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.keyPath.split('.').pop()} // Get the actual field name
                          value={value || ""}
                          onChange={(e) => handleInputChange(e, keys.length > 1 ? keys[0] : null, field.keyPath.split('.').pop())}
                          className="w-full border p-2 rounded-md text-gray-800 text-sm"
                        />
                        {field.type === 'date' && <MdOutlineDateRange className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
                      </div>
                    ) : (
                      <p className="text-gray-900 text-base font-medium">{displayValue}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Additional Notes:
              </h3>
              {/* Edit/Save Button for Additional Notes */}
              <button
                onClick={() => isEditingNotes ? handleSave('notes') : setIsEditingNotes(true)}
                className="flex items-center px-4 py-2 rounded-md transition-colors text-sm"
                style={{ backgroundColor: isEditingNotes ? '#FF8A8A' : '#FEE2E2', color: isEditingNotes ? 'white' : '#DC2626' }}
              >
                {isEditingNotes ? (
                  <>
                    <FaSave className="mr-2" /> Save
                  </>
                ) : (
                  <>
                    <CiEdit className="mr-2" /> Edit
                  </>
                )}
              </button>
            </div>
            {isEditingNotes ? (
              <textarea
                name="additionalNotes" // Assuming this is a direct field on the appliance object
                value={editedAppliance.additionalNotes || ""}
                onChange={(e) => handleInputChange(e, null, 'additionalNotes')}
                rows="6"
                className="w-full border p-2 rounded-md text-gray-800 text-sm resize-y"
              ></textarea>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {appliance.additionalNotes || "No additional notes."}
              </p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Page;