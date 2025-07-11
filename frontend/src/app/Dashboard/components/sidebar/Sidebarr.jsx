"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaBars } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { MdManageHistory } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";

const Sidebar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
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
                href="/Dashboard/dashboard"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/dashboard"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#f57c00]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <MdDashboardCustomize className="w-5 h-5 mr-3" />
                <span className="text-sm ">Dashboard</span>
              </Link>
            </li>

            {/* Users */}
            <li>
              <Link
                href="/Dashboard/multiproperty"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/multiproperty"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <FaUsers className="w-5 h-5 mr-3" />

                <span className="text-sm  ">Multi-Property Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard/applianceManagement"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/applianceManagement"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <MdOutlineManageAccounts className="w-5 h-5 mr-3" />
                <span className="text-sm ">Appliance Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard/homeSystemManagement"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/homeSystemManagement"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <SiManageiq className="w-5 h-5 mr-3" />
                <span className="text-sm ">Home System Management</span>
              </Link>
            </li>

            <li>
              <Link
                href="/Dashboard/maintenanceScheduling"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/maintenanceScheduling"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <MdManageHistory className="w-5 h-5 mr-3" />
                <span className="text-sm ">Maintenance Scheduling</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard/contractorManagement"
                className={`flex items-center p-2 rounded-md transition
                  ${
                    pathname === "/Dashboard/contractorManagement"
                      ? "bg-[#ff9800] text-white"
                      : "hover:bg-[#003c99]"
                  }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <IoIosContacts className="w-5 h-5 mr-3" />
                <span className="text-sm ">Contractor Management </span>
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
