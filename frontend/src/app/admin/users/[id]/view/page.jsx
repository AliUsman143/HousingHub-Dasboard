"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../components/sidebar/Sidebarr";

export default function ViewUserPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found, redirecting to login.");
          router.push("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/usersign/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("API Error:", data);
          throw new Error(data.message || "Failed to load user");
        }

        // adjust if your API sends { user: {...} }
        setUser(data.user || data);
      } catch (err) {
        console.error("Fetch user error:", err.message);
        alert("Failed to load user");
        router.push("/admin/users");
      }
    };

    if (id) fetchUser();
  }, [id, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Loading user...
      </div>
    );
  }

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
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl w-2xl justify-center mx-auto mt-7 shadow-xl overflow-hidden p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {user.profileImage ? (
              <img
                src={`http://localhost:5000${user.profileImage}`}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user.username}
            </h2>
            <p className="text-gray-500">{user.role}</p>
          </div>

          {/* Info Section */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-sm font-medium">
                📧 Email
              </span>
              <span className="text-gray-900 font-semibold">{user.email}</span>
            </div>
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-sm font-medium">
                📱 Phone
              </span>
              <span className="text-gray-900 font-semibold">
                {user.phone || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-lg p-3 shadow-sm">
              <span className="text-gray-600 text-sm font-medium">🛡️ Role</span>
              <span className="text-gray-900 font-semibold capitalize">
                {user.role}
              </span>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push("/admin/users")}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:scale-105 transition transform"
            >
              ⬅ Back to Users
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
