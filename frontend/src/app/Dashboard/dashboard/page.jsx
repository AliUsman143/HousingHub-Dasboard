// DashboardPage.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import Link from "next/link";
import StGamerPropertyCard from "../../components/StGamerPropertyCard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [properties, setProperties] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    // ❌ setLatestProperty state کی ضرورت نہیں ہے
    // const [latestProperty, setLatestProperty] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen]);

    useEffect(() => {
        const checkUserProperties = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://localhost:5000/api/properties', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.length === 0) {
                    router.push('/Firstuser/addproperty');
                    return;
                }

                setProperties(response.data);
                // ❌ یہ لائن ہٹا دیں
                // setLatestProperty(response.data[0]); 
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError(error.response?.data?.message || 'Failed to fetch properties');
            } finally {
                setLoading(false);
            }
        };

        checkUserProperties();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex min-h-screen bg-white">
            <div ref={sidebarRef}>
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
            </div>

            <main
                className={`flex-1 px-4 sm:px-6 py-6 transition-all duration-300 ${
                    isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
                }`}
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden mr-4 p-2 rounded-md bg-[#002f86] text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Welcome
                        </h1>
                        <Link href="/Firstuser/addproperty">
                            <button className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                                Add Property
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">All Your Properties</h2> {/* Title update */}
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ✅ properties array ko map karke har property ko show karen */}
                            {properties.map((property) => (
                                <StGamerPropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-100 text-center py-8 rounded-lg text-gray-500">
                            No properties found. <Link href="/Firstuser/addproperty" className="text-blue-500 hover:underline">Add your first property</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}