"use client";
import React from "react";

const StGamerPropertyCard = ({ property }) => {
  if (!property) return null;

  // Format the purchase date
  const formattedDate = property.purchaseDate
    ? new Date(property.purchaseDate).toLocaleDateString()
    : "N/A";

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
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
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{property.propertyName || "St Gamer Property"}</h2>
      </div>

      {/* Property Details */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <h3 className="text-gray-500 text-sm">Address:</h3>
            <p className="font-medium">{property.address || "111 W Main St Gamer, NC 27529"}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Purchase Date:</h3>
            <p className="font-medium">{formattedDate || "2/22/2022"}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Square Foot:</h3>
            <p className="font-medium">{property.sizeSqft || "1857"} sq ft</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Year Built:</h3>
            <p className="font-medium">{property.yearBuilt || "2001"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StGamerPropertyCard;