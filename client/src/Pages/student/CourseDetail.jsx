import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailsWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-white text-center text-xl">Loading...</h1>;
  if (isError) return <h1 className="text-red-500 text-center text-xl">Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#0f172a] min-h-screen py-6 px-4 md:px-8">
      {/* Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl p-6 md:p-10 shadow-lg mb-10">
        <div className="max-w-5xl mx-auto space-y-2">
          <h1 className="font-extrabold text-2xl md:text-4xl">{course?.courseTitle}</h1>
          <p className="text-md md:text-lg">{course.subTitle}</p>
          <p className="text-sm">
            Created By <span className="italic underline text-yellow-300">{course?.creator.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm mt-1">
            <BadgeInfo size={16} />
            <p>Last updated {course.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-sm">Students enrolled: {course?.enrolledStudents?.length ?? 0}</p>
        </div>
      </section>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Details */}
        <div className="col-span-2 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">Description</h2>
            <p
              className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>

          <Card className="dark:bg-[#1e293b] bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Course Content</CardTitle>
              <CardDescription className="text-sm">Total Lectures: {course.lectures.length}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-100">
                  {purchased ? <PlayCircle size={18} className="text-green-500" /> : <Lock size={18} className="text-red-400" />}
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right - Video and Pricing */}
        <div>
          <Card className="dark:bg-[#1e293b] bg-white shadow-lg">
            <CardContent className="p-4 space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <ReactPlayer
                  url={course.lectures[0]?.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {course.lectures[0]?.lectureTitle}
              </h3>
              <Separator />
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">₹{course.coursePrice}</p>
              </div>
            </CardContent>
            <CardFooter>
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white shadow-md transition"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
