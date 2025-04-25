import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="flex flex-col space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 bg-transparent dark:bg-transparent w-[80px] sm:w-[250px] md:w-[300px]">
        <Link to="dashboard" className="flex items-center gap-2 hover:text-blue-600">
          <ChartNoAxesColumn size={30} />
          <span className="hidden sm:inline text-base font-medium">Dashboard</span>
        </Link>
        <Link to="course" className="flex items-center gap-2 hover:text-blue-600">
          <SquareLibrary size={30} />
          <span className="hidden sm:inline text-base font-medium">Courses</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 dark:bg-transparent">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
