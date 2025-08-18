"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../components/sidebar/Sidebarr";

export default function EditUserPage() {
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // Sidebar close on outside click
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

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/usersign/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();

        setProfile(data.profile || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setRole(data.role || "");
      } catch (err) {
        console.error("Fetch User Error:", err.message);
        alert("Failed to load user");
        router.push("/admin/users");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, router]);

  // Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch(
        `http://localhost:5000/api/auth/usersign/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profile,
            username,
            email,
            phone,
            role,
          }),
        }
      );

      if (response.ok) {
        router.push("/admin/users");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">✏️ Edit User</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile */}
            <div>
              <label
                htmlFor="profile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Image URL
              </label>
              <input
                type="text"
                id="profile"
                value={user.profile}
                onChange={(e) => setUser({ ...user, profile: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="organization">Organization</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push("/admin/users")}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-white rounded-lg ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
