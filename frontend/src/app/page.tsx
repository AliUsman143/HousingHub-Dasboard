'use client';

 import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/signup');
  }, [router]);

  return null; // Or a loading spinner, etc.
};

export default HomePage;
