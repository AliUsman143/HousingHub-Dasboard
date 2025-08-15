'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('userInfo');
    
    if (token && userInfo) {
      try {
        const user = JSON.parse(userInfo);
        
        // Redirect based on user role
        if (user.role === 'admin') {
          router.push('/admin/addpackage');
        } else {
          // For regular users, you might want to check if they have properties
          // and redirect accordingly (as you do in your signin page)
          router.push('/Dashboard/dashboard'); // or '/Firstuser/PackagesPagemain'
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
        router.push('/signup');
      }
    } else {
      // No user logged in, go to signup
      router.push('/signup');
    }
  }, [router]);

  return null; // Or a loading spinner
};

export default HomePage;