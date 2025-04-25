// EnhancedCourse.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block h-full">
      <Card className="flex flex-col h-full justify-between rounded-2xl overflow-hidden bg-slate-300 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg transition duration-300 hover:shadow-2xl transform hover:scale-[1.02]">
        
        {/* Image thumbnail */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
            {course.courseLevel}
          </Badge>
        </div>

        {/* Card content */}
        <CardContent className="flex flex-col justify-between flex-grow px-4 py-5 sm:px-5 sm:py-6 space-y-4">
          
          {/* Course Title */}
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-primary transition-colors duration-200">
            {course.courseTitle}
          </h2>

          {/* Instructor Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                alt={course.creator?.name || "Instructor"}
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {course.creator?.name}
            </span>
          </div>

          {/* Price and Enroll Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
              ₹{course.coursePrice}
            </span>
            <button className="bg-[#328e6e] dark:bg-blue-700 hover:dark:bg-[#328e6e] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#205781] transition-colors duration-200">
              Enroll Now
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
