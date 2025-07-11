import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/app/context/ProfileContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedProfile, setSelectedProfile } = useProfile();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/addprofileusers");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProfiles(data.profiles || []);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setIsOpen(false);
  };

  const getFullImageUrl = (path) => {
    if (!path) return "https://placehold.co/40x40/cccccc/ffffff?text=U";
    return path.startsWith("http") ? path : `http://localhost:5000${path}`;
  };

  return (
    <div className="relative">
      {/* Top Selected Profile */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center space-x-2"
      >
        <img
          src={getFullImageUrl(selectedProfile?.profilePicture)}
          className="w-8 h-8 rounded-full object-cover"
          alt="Selected Profile"
          onError={(e) => {
            e.target.src = "https://placehold.co/40x40/cccccc/ffffff?text=U";
          }}
        />
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
            Select Profile
          </div>

          {loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          ) : profiles.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No profiles found
            </div>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProfileSelect(profile)}
              >
                <img
                  src={getFullImageUrl(profile.profilePicture)}
                  className="w-6 h-6 rounded-full object-cover"
                  alt={profile.username}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/40x40/cccccc/ffffff?text=U";
                  }}
                />
                <span className="truncate">{profile.username}</span>
              </div>
            ))
          )}

          <Link
            href="/admin/profilepage"
            className="block text-sm text-blue-600 px-4 py-2 border-t hover:bg-gray-100"
          >
            + Add New Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
