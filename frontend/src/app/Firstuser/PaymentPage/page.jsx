"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const packageData = searchParams.get('packageDetails');
    if (packageData) {
      try {
        const parsedPackage = JSON.parse(packageData);
        setPackageDetails(parsedPackage);
        processPayment(parsedPackage);
      } catch (err) {
        setError('Invalid package data');
        setLoading(false);
      }
    } else {
      setError('No package selected');
      setLoading(false);
    }
  }, [searchParams]);

const processPayment = async (pkg) => {
  try {
    console.log('Processing payment for package:', pkg); // Debug log
    
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: pkg.stripePriceId,
        packageDetails: JSON.stringify(pkg)
      }),
    });

    const data = await response.json();
    console.log('API response:', data); // Debug log

    if (!response.ok) {
      throw new Error(data.error || 'Payment failed');
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No redirect URL received');
    }
  } catch (err) {
    console.error('Full payment error:', err);
    setError(err.message);
    setLoading(false);
  }
};
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link 
            href="/Firstuser/PackagesPagemain" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" />
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment</h2>
        {packageDetails && (
          <div className="mb-6 text-left">
            <h3 className="text-lg font-semibold mb-2">Package Details:</h3>
            <p className="text-gray-700"><span className="font-medium">Name:</span> {packageDetails.name}</p>
            <p className="text-gray-700"><span className="font-medium">Price:</span> ${packageDetails.price}</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Redirecting to secure payment...</p>
        </div>
      </div>
    </div>
  );
}