"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiBellOn } from "react-icons/ci";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsDropdownOpen(false); // Close dropdown on logout
    router.push("/signup"); // Redirect to signup page after logout
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
                    className="text-white focus:outline-none"
                  >
                    Welcome, {user.username}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
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
          ) : // Render nothing or a loading state on the server/initial client render
          null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
