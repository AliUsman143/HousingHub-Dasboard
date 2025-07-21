"use client";
import React, { useState, useEffect } from "react";
import { FaHome, FaRegClock } from "react-icons/fa";

const PackagesPagemain = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch packages from backend API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();

        // Transform backend data to match frontend structure
        const transformedPackages = data.data.map((pkg) => {
          let propertiesIncluded = "";
          if (pkg.propertyCount === "unlimited") {
            propertiesIncluded = "Unlimited properties included";
          } else {
            propertiesIncluded = `${pkg.propertyCount} ${
              pkg.propertyCount === "1" ? "property" : "properties"
            } included`;
          }

          return {
            id: pkg.packageType.toLowerCase(),
            name: pkg.packageType,
            description: pkg.tagline,
            price: `$${pkg.price}`,
            propertiesIncluded: propertiesIncluded,
            originalData: pkg, // Keep original data for reference
          };
        });

        setPackages(transformedPackages);
      } catch (err) {
        setError(err.message);
        // Fallback to default packages if API fails
        setPackages([
          {
            id: "basic",
            name: "Basic",
            description: "Manage 1 property with essential tracking",
            price: "$5",
            propertiesIncluded: "1 property included",
          },
          {
            id: "standard",
            name: "Standard",
            description: "Manage up to 3 properties with smart alerts",
            price: "$15",
            propertiesIncluded: "3 properties included",
          },
          {
            id: "premium",
            name: "Premium",
            description: "Manage up to 6 properties with advanced automation",
            price: "$40",
            propertiesIncluded: "6 properties included",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    console.log("Selected package:", packageId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading packages: {error}</p>
          <p className="text-gray-600 mt-2">Showing default packages instead</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-7 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-2 font-inter">
          Packages
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Pick the right plan for your home management needs
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border-2 border-blue-800">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-blue-800 mt-2 font-medium">
            Packages
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Payment</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Add property</span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center transition-all duration-300 ease-in-out
              ${
                selectedPackage === pkg.id
                  ? "border-2 border-blue-600 shadow-xl"
                  : "border border-gray-200 hover:shadow-lg"
              }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {pkg.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4 px-4">{pkg.description}</p>
            <p className="text-4xl font-extrabold text-orange-500 mb-6">
              {pkg.price}
            </p>

            <div className="space-y-3 text-gray-700 mb-8 w-full">
              <div className="flex items-center justify-center text-base">
                <FaHome className="mr-2 text-gray-600" />
                <span>{pkg.propertiesIncluded}</span>
              </div>
              <div className="flex items-center justify-center text-base">
                <FaRegClock className="mr-2 text-gray-600" />
                <span>One time payment</span>
              </div>
            </div>

            <button
              onClick={() => handleSelectPackage(pkg.id)}
              className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-colors duration-200"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Call to Action */}
      {selectedPackage && (
        <div className="mt-6 text-center text-gray-700 text-lg">
          You've selected the{" "}
          {packages.find((p) => p.id === selectedPackage)?.name} plan.{" "}
          <button
            onClick={() => alert("Continue to payment!")}
            className="text-blue-600 font-semibold hover:underline focus:outline-none"
          >
            Continue to payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PackagesPagemain;
