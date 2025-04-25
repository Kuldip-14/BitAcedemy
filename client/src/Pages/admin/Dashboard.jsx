import React, { useState, useMemo } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCourseQuery();
  const { data: creatorData } = useGetCreatorCourseQuery();

  const today = new Date();
  const currentYear = today.getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const purchasedCourse = Array.isArray(data) ? data : data?.purchasedCourse ?? [];

  // Generate list: current year + previous 5 years
  const years = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => currentYear - i);
  }, [currentYear]);

  // Filter purchases for the selected year
  const filteredData = useMemo(
    () => purchasedCourse.filter(c => new Date(c.createdAt).getFullYear() === selectedYear),
    [purchasedCourse, selectedYear]
  );

  // Prepare monthly data
  const courseDataByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      sales: 0,
      revenue: 0
    }));
    filteredData.forEach(c => {
      const d = new Date(c.createdAt);
      const amount = c.amount ?? c.courseId.coursePrice;
      months[d.getMonth()].sales += 1;
      months[d.getMonth()].revenue += amount;
    });
    return months;
  }, [filteredData]);

  // Yearly totals
  const totalSales = filteredData.length;
  const totalRevenue = filteredData.reduce(
    (sum, c) => sum + (c.amount ?? c.courseId.coursePrice),
    0
  );

  // Total published courses
  const totalPublishedCourses = useMemo(
    () => creatorData?.courses?.filter(c => c.isPublished)?.length || 0,
    [creatorData]
  );

  if (isLoading) return <h1>Loading…</h1>;
  if (isError) return <h1 className="text-red-500">Failed to load purchases</h1>;

  return (
    <div className="grid gap-6 ">
      {/* Stat Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
        <Card className="shadow-lg hover:shadow-xl transition-shadow dark:bg-slate-900">
          <CardHeader><CardTitle>Total Sales (Year)</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow dark:bg-slate-900">
          <CardHeader><CardTitle>Total Revenue (Year)</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow dark:bg-slate-900">
          <CardHeader><CardTitle>Total Published Courses</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalPublishedCourses}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Sales & Revenue Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow mt-4 dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between w-full ">
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-white">
              Monthly Sales & Revenue
            </CardTitle>
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-slate-900 text-black dark:text-white"
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

          </div>
          <p className="text-sm text-gray-500 mt-1">
            {selectedYear}
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} >
            <BarChart data={courseDataByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(val, name) => [
                  name === "revenue" ? `₹${val}` : val,
                  name === "revenue" ? "Revenue" : "Sales"
                ]}
              />
              <Bar dataKey="sales" fill="#34d399" name="Sales" />
              <Bar dataKey="revenue" fill="#4a90e2" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
