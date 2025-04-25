import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery, useDeleteCourseMutation } from "@/features/api/courseApi";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();

  const handleDelete = async (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId).unwrap();
        alert("Course deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete course.");
      }
    }
  };

  console.log(data);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="space-y-4">
      <Button onClick={() => navigate(`create`)}>Create a new course</Button>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent Courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${course._id}`)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(course._id)}
                    >
                      <Trash2 className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
