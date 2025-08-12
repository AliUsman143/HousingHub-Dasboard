"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "../context/UserContext";
// Import React Icons
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaSave,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner, // For loading spinner
} from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [loading, setLoading] = useState(true); // Manages initial loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Manages form submission loading state
  const [error, setError] = useState(null); // Stores error messages
  const [success, setSuccess] = useState(null); // Stores success messages

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "", // Using 'phone' as per your original ProfilePage structure
    password: "", // Added password field for consistency with second snippet
  });

  // Profile picture states
  const [profileImageFile, setProfileImageFile] = useState(null); // Stores the actual image file to be uploaded
  const [previewImageUrl, setPreviewImageUrl] = useState(""); // Stores URL for image preview

  const fileInputRef = useRef(null); // Ref for the hidden file input
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  // Initialize form data from user context
  useEffect(() => {
    if (!user) {
      router.push("/signup"); // Redirect if user not logged in
      return;
    }

    setFormData({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "", // Password is not stored for security
    });
    
    if (user.profileImage) {
        setPreviewImageUrl(`http://localhost:5000${user.profileImage}`);
      }
    
    setLoading(false);
  }, [user, router]);

  // Handle changes for text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic file type and size validation
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        setProfileImageFile(null);
        setPreviewImageUrl(user?.profileImage || "");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // Max 5MB
        setError("Image size should be less than 5MB.");
        setProfileImageFile(null);
        setPreviewImageUrl(user?.profileImage || "");
        return;
      }

      setProfileImageFile(file);
      setPreviewImageUrl(URL.createObjectURL(file)); // Create a URL for preview
      setError(null); // Clear any previous errors
    } else {
      setProfileImageFile(null);
      setPreviewImageUrl(user?.profileImage || ""); // Revert to original image if no new file selected
    }
  };

  // Trigger click on the hidden file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      if (formData.password) { // Only append password if it's not empty
        formDataToSend.append("password", formData.password);
      }
      if (profileImageFile) { // Only append new file if selected
        formDataToSend.append("profileImage", profileImageFile);
      }

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile", // Assuming this is your update endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        updateUser(response.data); // Update user context
        setSuccess("Profile updated successfully!");
        setProfileImageFile(null); // Clear file input after successful upload
        // Do not clear password field to allow further changes or re-entry if needed
      }
    } catch (err) {
      console.error("Profile update error:", err);
      // More robust error message extraction
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <FaSpinner className="animate-spin text-blue-600 text-5xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f3f3]">
      {/* <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
      <div className="flex flex-1">
        {/* <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        /> */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          } p-1 lg:p-2`}
        >
          {/* Page Header */}
          <div className="bg-white p-2 flex justify-between items-center border-b border-gray-200 rounded-lg shadow-sm mb-2">
            <h1 className="text-xl font-bold text-gray-800">Profile Settings</h1>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 max-w-4xl mx-auto">
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Profile Picture Upload Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {previewImageUrl ? (
                      <img
                        src={previewImageUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-200 shadow-md hover:bg-gray-100"
                    aria-label="Change profile picture"
                  >
                    <FaCamera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200"
                >
                  {previewImageUrl ? "Change picture" : "Add picture"}
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative"> {/* Added relative wrapper for icon */}
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone" // Changed to 'phone' from 'phoneNo'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Leave blank to keep current"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-4 w-4 text-gray-500" />
                        ) : (
                          <FaEye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">Leave blank to keep your current password.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}