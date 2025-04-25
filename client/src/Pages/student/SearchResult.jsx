import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 dark:border-gray-700 py-5 gap-6">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col sm:flex-row gap-4 w-full group"
      >
        {/* --- Image Thumbnail with effects --- */}
        <div className="relative w-full sm:w-56 aspect-[16/9] overflow-hidden rounded-xl shadow-md group">
          <img
            src={course.courseThumbnail}
            alt="Course Thumbnail"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Course Level Badge */}
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {course.courseLevel}
          </Badge>
        </div>

        {/* --- Course Info --- */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h1 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white truncate">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {course.subTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Instructor: <span className="font-bold">{course.creator?.name}</span>
          </p>
        </div>
      </Link>

      {/* --- Price --- */}
      <div className="mt-2 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white">
          ₹{course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
