"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBoxOpen, FaUsers, FaBars } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#002f86] text-white"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="househub-sidebar"
        className={`fixed top-0 left-0 z-40 h-full bg-[#002f86] text-white shadow-lg transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
          lg:translate-x-0 lg:relative lg:w-56 flex flex-col h-full overflow-y-auto`}
        aria-label="Sidebar"
      >
        {/* Logo */}
        <div className="flex flex-col items-center justify-center px-4 pt-4">
          <img 
            src="/admin/home.png" 
            alt="HouseHub365" 
            className="h-20 md:h-28 mb-2" 
          />
        </div>

        {/* Menu */}
        <div className="px-4 flex flex-col flex-1">
          <ul className="space-y-2 text-sm font-medium">
            {/* Packages */}
            <li>
              <Link
                href="/admin/package"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/admin/package"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#f57c00]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <FaBoxOpen className="w-5 h-5 mr-3" />
                <span className="text-sm md:text-base">Packages</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/admin/users"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <FaUsers className="w-5 h-5 mr-3" />
                <span className="text-sm md:text-base">Users</span>
              </Link>
            </li>

            {/* Divider */}
            <li>
              <hr className="border-t border-white/30 my-4" />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;