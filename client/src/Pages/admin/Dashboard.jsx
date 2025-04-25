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

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const purchasedCourse = Array.isArray(data) ? data : data?.purchasedCourse ?? [];

  const years = useMemo(() => {
    return Array.from(new Set(
      purchasedCourse.map(course => new Date(course.createdAt).getFullYear())
    ));
  }, [purchasedCourse]);

  const filteredData = useMemo(() => {
    return purchasedCourse.filter(course =>
      new Date(course.createdAt).getFullYear() === selectedYear
    );
  }, [purchasedCourse, selectedYear]);

  const courseDataByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      sales: 0,
      revenue: 0
    }));

    filteredData.forEach(course => {
      const date = new Date(course.createdAt);
      const monthIndex = date.getMonth();
      const amount = course.amount ?? course.courseId.coursePrice;

      months[monthIndex].sales += 1;
      months[monthIndex].revenue += amount;
    });

    return months;
  }, [filteredData]);

  const totalSales = filteredData.length;
  const totalRevenue = filteredData.reduce(
    (sum, course) => sum + (course.amount ?? course.courseId.coursePrice), 0
  );

  const totalPublishedCourses = useMemo(() => {
    return creatorData?.courses?.filter(course => course.isPublished)?.length || 0;
  }, [creatorData]);

  if (isLoading) return <h1>Loading…</h1>;
  if (isError) return <h1 className="text-red-500">Failed to load purchases</h1>;

  return (
    <div className="grid gap-6">
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {years.sort((a, b) => b - a).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader><CardTitle>Total Sales</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader><CardTitle>Total Published Courses</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalPublishedCourses}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Monthly Sales & Revenue ({selectedYear})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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
