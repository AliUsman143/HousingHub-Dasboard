'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
      if (parsedUser.role !== 'admin') {
        router.push('/'); // Redirect non-admin users
      }
    } else {
      router.push('/login'); // Redirect if not logged in
    }
  }, [router]);

  if (!user || user.role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Access Denied</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Admin Dashboard, {user.username}!</h1>
    </div>
  );
};

export default AdminDashboard;