// Navbar.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiBellOn } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/signup");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          HouseHub
        </Link>
        <div>
          {mounted && user ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-4 self-end sm:self-auto">
                  <div className="relative cursor-pointer">
                    <CiBellOn className="h-5 w-5 sm:h-6 sm:w-6 text-gray-50 hover:text-gray-100" />
                    <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full" />
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000${user.profileImage}`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-gray-300" />
                    )}
                    <span>Welcome, {user.username}</span>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                    <Link
                     href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Update Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin/addpackage"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : mounted && !user ? (
            <div className="space-x-4">
              <Link href="/signup" className="hover:text-gray-300">
                Login
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;