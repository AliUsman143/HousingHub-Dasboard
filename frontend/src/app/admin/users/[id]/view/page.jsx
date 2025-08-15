"use client";
import React, { useEffect, useRef,useState } from "react";
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
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          throw new Error(data.error || "User not found");
        }
      } catch (err) {
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
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">User Details</h1>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="mb-4 text-center">
              {user.profileImage ? (
                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-gray-300">
                  <span className="text-4xl text-gray-500">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Username</h2>
              <p className="text-lg text-gray-900">{user.username}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Email</h2>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Phone</h2>
              <p className="text-lg text-gray-900">{user.phone}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Role</h2>
              <p className="text-lg text-gray-900">{user.role}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/admin/users")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Users
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
