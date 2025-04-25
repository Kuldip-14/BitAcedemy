import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCourseQuery();

  if (isLoading) return <h1>Loading…</h1>;
  if (isError)   return <h1 className="text-red-500">Failed to load purchases</h1>;

  // assume `data` is PurchaseCourse[]
  const purchasedCourse = Array.isArray(data) ? data : data?.purchasedCourse ?? [];

  console.log("Loaded purchases:", purchasedCourse);

  const courseData = purchasedCourse.map(course => ({
    name: `${course.courseId.courseTitle} — ${course.userId?.name ?? "User"}`,
    price: course.amount ?? course.courseId.coursePrice
  }));

  const totalSales = purchasedCourse.length;
  const totalRevenue = purchasedCourse.reduce(
    (sum, course) => sum + (course.amount ?? course.courseId.coursePrice), 0
  );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader><CardTitle>Total Sales</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold text-blue-600">{totalSales}</p></CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p></CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                interval={0}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(val) => [`₹${val}`]} />
              <Line 
                type="monotone" 
                dataKey="price"
                stroke="#4a90e2" 
                strokeWidth={3} 
                dot={{ strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
