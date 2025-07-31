"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaRegClock, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

const PackagesPagemain = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages`;
        console.log("Fetching packages from:", apiUrl);
        
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API response:", data);

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid packages data format");
        }

        // Map Stripe price IDs based on package type
        const transformedPackages = data.data.map((pkg) => {
          let stripePriceId = '';
          
          // Assign the correct Stripe price ID based on package type
          switch(pkg.packageType?.toLowerCase()) {
            case 'basic':
              stripePriceId = process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID;
              break;
            case 'standard':
              stripePriceId = process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID;
              break;
            case 'premium':
              stripePriceId = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;
              break;
            default:
              stripePriceId = '';
          }

          return {
            _id: pkg._id,
            id: pkg.packageType?.toLowerCase() || `package_${pkg._id}`,
            name: pkg.packageType || "Unknown Package",
            description: pkg.tagline || "Property management package",
            price: typeof pkg.price === 'number' ? pkg.price : 0,
            stripePriceId: stripePriceId,
            propertiesIncluded: pkg.propertyCount === "unlimited" 
              ? "Unlimited properties" 
              : `${pkg.propertyCount || 0} ${pkg.propertyCount === "1" ? "property" : "properties"}`,
            features: Array.isArray(pkg.features) ? pkg.features : [],
            originalData: pkg,
          };
        });

        setPackages(transformedPackages);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message);
        
        // Fallback packages with Stripe price IDs
        const fallbackPackages = [
          {
            _id: "basic_fallback",
            id: "basic",
            name: "Basic",
            description: "Manage 1 property with essential tracking",
            price: 9,
            stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
            propertiesIncluded: "5 properties",
            features: [
              "5 property management",
              "Basic tracking",
              "Email support"
            ]
          },
          {
            _id: "standard_fallback",
            id: "standard",
            name: "Standard",
            description: "Manage 10 property with essential tracking",
            price: 29,
            stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID,
            propertiesIncluded: "20 properties",
            features: [
              "Up to 20 properties",
              "Smart alerts",
              "Priority email support",
              "Basic analytics"
            ]
          },
          {
            _id: "premium_fallback",
            id: "premium",
            name: "Premium",
            description: "Manage many property with essential tracking",
            price: 99,
            stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
            propertiesIncluded: "Unlimited properties",
            features: [
              "Unlimited properties",
              "Advanced automation",
              "24/7 support",
              "Full analytics dashboard"
            ]
          }
        ];
        
        setPackages(fallbackPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <FaExclamationTriangle className="text-3xl mr-2" />
            <h2 className="text-xl font-bold">Error Loading Packages</h2>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-600 mb-4">
            We're showing default packages instead. You can still proceed, but some features might be limited.
          </p>
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              Developer Note: Check your backend API at {process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading packages...</p>
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
          Choose the perfect plan for your property management needs
        </p>
      </div>

      {/* Progress Indicator */}
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

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ${
              selectedPackage === pkg.id
                ? "border-2 border-blue-600 transform scale-[1.02]"
                : "border border-gray-200 hover:shadow-md"
            }`}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
              <p className="text-4xl font-extrabold text-orange-500 mb-6">
                ${pkg.price}
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <FaHome className="mr-2 text-gray-600" />
                <span>{pkg.propertiesIncluded} included</span>
              </div>
              
              <div className="flex items-center">
                <FaRegClock className="mr-2 text-gray-600" />
                <span>One-time payment</span>
              </div>
              
              {/* Features list */}
              <div className="mt-4 space-y-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheck className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={{
                pathname: "/Firstuser/PaymentPage",
                query: { 
                  packageDetails: JSON.stringify({
                    ...pkg,
                    // Include only necessary data for payment
                    name: pkg.name,
                    price: pkg.price,
                    stripePriceId: pkg.stripePriceId,
                    propertiesIncluded: pkg.propertiesIncluded
                  }),
                  selectedPackage: pkg.id
                },
              }}
              className="block w-full"
            >
              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedPackage === pkg.id
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                disabled={!pkg.stripePriceId}
              >
                {pkg.stripePriceId ? "Select Plan" : "Coming Soon"}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Selected Package Indicator */}
      {selectedPackage && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-gray-700">
            Selected:{" "}
            <span className="font-semibold text-blue-700">
              {packages.find((p) => p.id === selectedPackage)?.name} Plan
            </span>{" "}
            (${packages.find((p) => p.id === selectedPackage)?.price})
          </p>
        </div>
      )}
    </div>
  );
};

export default PackagesPagemain;