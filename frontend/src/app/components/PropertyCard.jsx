"use client";
import React from "react";
import Link from "next/link";

const PropertyCard = ({ property }) => {
  if (!property) return null;

  // Format the purchase date
  const formattedDate = property.purchaseDate
    ? new Date(property.purchaseDate).toLocaleDateString()
    : "N/A";

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
      {/* Property Image */}
      <div className="relative h-48 w-full">
        <img
          src={
            property.propertyImage
              ? `http://localhost:5000/uploads/${property.propertyImage}`
              : "https://placehold.co/400x200/cccccc/ffffff?text=Property"
          }
          alt={property.propertyName || "Property"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x200/cccccc/ffffff?text=Property";
          }}
        />
      </div>

      {/* Property Name */}
      <div className="p-4 bg-gray-700 text-white text-center">
        <h2 className="text-xl font-bold">{property.propertyName}</h2>
      </div>

      {/* Property Details */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-500 text-sm">Address:</h3>
            <p className="font-medium">{property.address}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Purchase Date:</h3>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-500 text-sm">Square Foot:</h3>
            <p className="font-medium">{property.sizeSqft} sq ft</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Year Built:</h3>
            <p className="font-medium">{property.yearBuilt}</p>
          </div>
        </div>

        {/* View Button */}
        <div className="mt-4">
          <Link href={`/Dashboard/multiproperty/${property._id}/view`} passHref>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;