"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaRegClock } from "react-icons/fa";

const PackagesPagemain = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // ✅ Next.js router

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();

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
            propertiesIncluded,
            originalData: pkg,
          };
        });

        setPackages(transformedPackages);
      } catch (err) {
        setError(err.message);
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
  };

  const handleContinueToPayment = () => {
    // ✅ Navigate to payment page
    router.push("/Firstuser/PaymentPage");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-800 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          <p>Error loading packages: {error}</p>
          <p className="text-gray-600 mt-2">Showing default packages instead</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-7 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Packages</h1>
        <p className="text-gray-600 text-lg">
          Pick the right plan for your home management needs
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center mb-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border-2 border-blue-800">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-blue-800 mt-2 font-medium">Packages</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Payment</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2 sm:mx-4"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-sm text-gray-500 mt-2">Add property</span>
        </div>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white p-6 rounded-xl text-center shadow-lg transition-all duration-300 ${
              selectedPackage === pkg.id
                ? "border-2 border-blue-600 shadow-xl"
                : "border border-gray-200 hover:shadow-md"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
            <p className="text-4xl font-extrabold text-orange-500 mb-6">
              {pkg.price}
            </p>
            <div className="space-y-3 mb-8 text-gray-700">
              <div className="flex justify-center items-center">
                <FaHome className="mr-2 text-gray-600" />
                <span>{pkg.propertiesIncluded}</span>
              </div>
              <div className="flex justify-center items-center">
                <FaRegClock className="mr-2 text-gray-600" />
                <span>One time payment</span>
              </div>
            </div>
            <button
              onClick={() => handleSelectPackage(pkg.id)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Continue to Payment */}
      {selectedPackage && (
        <div className="mt-6 text-center text-gray-700 text-lg">
          You’ve selected the{" "}
          <span className="font-semibold text-blue-700">
            {packages.find((p) => p.id === selectedPackage)?.name}
          </span>{" "}
          plan.{" "}
          <button
            onClick={handleContinueToPayment}
            className="text-blue-600 font-semibold underline hover:text-blue-800"
          >
            Continue to payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PackagesPagemain;
