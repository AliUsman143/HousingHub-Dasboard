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
        const res = await fetch(`http://localhost:5000/api/users/${id}`);
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
            <div>
              <h2 className="text-sm text-gray-500">Name</h2>
              <p className="text-lg text-gray-900">{user.name}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Property Address</h2>
              <p className="text-lg text-gray-900">{user.propertyAddress}</p>
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
