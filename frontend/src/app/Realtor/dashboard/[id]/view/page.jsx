"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../components/sidebar/Sidebarr";

export default function ViewHomeownerPage() {
  const [homeowner, setHomeowner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchHomeowner = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/homeowners/${id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch homeowner: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data.homeowner) {
          throw new Error("Homeowner data not found in response");
        }
        
        setHomeowner(data.homeowner);
      } catch (error) {
        console.error("Error fetching homeowner:", error);
        setError(error.message);
        router.push("/Realtor/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHomeowner();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Loading homeowner details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Error: {error}
      </div>
    );
  }

  if (!homeowner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Homeowner not found
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
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Homeowner Details
          </h1>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-sm text-gray-500">Name:</h2>
              <p className="text-lg text-gray-900">{homeowner.name}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Property Address:  </h2>
              <p className="text-lg text-gray-900">{homeowner.address}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Status:    </h2>
              <p className="text-lg text-gray-900">{homeowner.status}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500">Date Added:</h2>
              <p className="text-lg text-gray-900">{homeowner.dateAdded}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/Realtor/dashboard")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}