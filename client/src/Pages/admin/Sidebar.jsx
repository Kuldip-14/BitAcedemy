import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden lg:flex w-[250px] sm:w-[300px] flex-col space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 bg-[#f0f0f0] dark:bg-gray-900">
        <div className="mt-20 space-y-4">
          <Link to="dashboard" className="flex items-center gap-2 hover:text-blue-600">
            <ChartNoAxesColumn size={22} />
            <h1 className="text-base font-medium">Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2 hover:text-blue-600">
            <SquareLibrary size={22} />
            <h1 className="text-base font-medium">Courses</h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 md:p-12 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
