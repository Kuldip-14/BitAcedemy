// src/Pages/admin/Dashboard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCourseQuery();
  const [isDark, setIsDark] = useState(false);

  // detect dark mode from html root
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-red-600 dark:text-red-400 text-center mt-10">
        Failed to get purchased courses
      </h1>
    );

  const purchasedCourse = data?.purchasedCourse ?? [];
  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));
  const totalRevenue = purchasedCourse.reduce(
    (acc, course) => acc + (course.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  // chart colors based on theme
  const gridStroke = isDark ? "#4b5563" : "#e5e7eb";
  const axisStroke = isDark ? "#9ca3af" : "#6b7280";
  const lineStroke = "#3b82f6";
  const tooltipBg = isDark ? "#374151" : "#ffffff";
  const tooltipColor = isDark ? "#f3f4f6" : "#1f2937";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 p-6">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Sales */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-200">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totalSales}
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-200">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₹{totalRevenue}
            </p>
          </CardContent>
        </Card>

        {/* Chart (spanning full width on lg) */}
        <Card className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-200">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="name"
                  stroke={axisStroke}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: axisStroke }}
                />
                <YAxis stroke={axisStroke} tick={{ fill: axisStroke }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: axisStroke,
                    color: tooltipColor,
                  }}
                  labelStyle={{ color: tooltipColor }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={lineStroke}
                  strokeWidth={3}
                  dot={{ stroke: lineStroke, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
