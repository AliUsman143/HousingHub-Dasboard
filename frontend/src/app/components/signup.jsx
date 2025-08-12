// SignUpPage.jsx
"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpPage = () => {
  const router = useRouter();

  // Signup states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Login states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // UI state
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Loading and Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (isExistingUser) {
      // Handle Login
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          username: loginUsername,
          password: loginPassword,
        });

        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setSuccess("Login successful! Redirecting...");
          const userRole = response.data.role;
          if (userRole === 'admin') {
            router.push("/admin/addpackage");
          } else {
            router.push("/Firstuser/PackagesPagemain");
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // Handle Sign Up
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        if (profileImage) {
          formData.append("profileImage", profileImage);
        }

        const response = await axios.post("http://localhost:5000/api/auth/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setSuccess("Registration successful! Redirecting...");
          const userRole = response.data.role;
          if (userRole === 'admin') {
            router.push("/admin/addpackage");
          } else {
            router.push("/Firstuser/PackagesPagemain");
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
        console.error("Signup error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-3">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            {isExistingUser ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-gray-600">
            {isExistingUser
              ? "Welcome back to your account"
              : "to get started"}
          </p>
        </div>

        {/* Success and Error Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <div className="flex justify-center mb-5">
          <button
            onClick={() => {
              setIsExistingUser(!isExistingUser);
              setError(null);
              setSuccess(null);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isExistingUser
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
        

          {isExistingUser ? (
            <>
              {/* Login Form */}
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot Password?
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Signup Form */}
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaPhone />
                    </span>
                    <input
                      type="tel"
                      placeholder="Phone No"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold text-lg shadow-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            disabled={loading}
          >
            {loading ? (isExistingUser ? "Signing In..." : "Registering...") : (isExistingUser ? "Sign In" : "Register Now")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;