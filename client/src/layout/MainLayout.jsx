
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FooterPage from '@/components/FooterPage';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="
          flex-1 mt-10
          bg-gradient-to-b
            from-[#F1F0E8]
            via-[#96B6C5]
            to-[#b9f5f2]
          dark:bg-gradient-to-b
            dark:from-[#213448]
            dark:via-[#3D6970]
            dark:to-[#020817]
        "
      >
        <Outlet />
      </div>
      <FooterPage />
    </div>
  );
};

export default MainLayout;