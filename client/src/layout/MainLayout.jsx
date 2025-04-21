import Navbar from '@/components/Navbar';// ✅ This is the actual footer component
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterPage from '@/components/FooterPage';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-10">
        <Outlet />
      </div>
      <FooterPage /> {/* ✅ Place the actual Footer here */}
    </div>
  );
};

export default MainLayout;
