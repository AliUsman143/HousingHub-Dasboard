"use client";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="mb-6">Your payment was not completed.</p>
        <Link href="/Firstuser/PackagesPagemain" className="btn btn-primary">
          <button
            type="submit"
            className="px-3 py-2 text-md bg-orange-500 text-white rounded"
          >
            Back to Packages
          </button>
        </Link>
      </div>
    </div>
  );
}
