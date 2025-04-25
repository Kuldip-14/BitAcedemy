import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import Filter from "./Filter";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("query") || "";
  const selectedCategory = searchParams.get("category") || "";
  const sortByPrice = searchParams.get("sort") || "";

  const updateFilters = (category, sort) => {
    const params = {};
    if (urlQuery) params.query = urlQuery;
    if (category) params.category = category;
    if (sort) params.sort = sort;
    setSearchParams(params);
  };

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: urlQuery,
    categories: selectedCategory ? [selectedCategory] : [],
    sortByPrice,
  });

  const courses = data?.courses || [];
  const isEmpty = !isLoading && courses.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white">
          Results for “{urlQuery || "all courses"}”
        </h1>
        {urlQuery && (
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mt-1">
            Showing results for{" "}
            <span className="text-blue-800 dark:text-blue-400 font-semibold italic">
              {urlQuery}
            </span>
          </p>
        )}
      </header>

      {/* Filter + Results */}
      <div className="flex flex-col md:flex-row gap-8">
        <Filter
          selectedCategory={selectedCategory}
          sortByPrice={sortByPrice}
          onFilterChange={updateFilters}
          showCategoryFilter={!urlQuery}
        />

        <div className="flex-1 space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            courses.map(course => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// ------------------------------
// 🔸 Helper Components
// ------------------------------

const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-32 p-6 text-center">
    <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
    <h2 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">
      No Courses Found
    </h2>
    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
      Sorry, we couldn’t find any courses matching your filters.
    </p>
    <Link to="/" className="italic">
      <Button variant="link" className="text-blue-800 dark:text-blue-400">
        Browse All Courses
      </Button>
    </Link>
  </div>
);

const CourseSkeleton = () => (
  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-300 py-4 dark:border-gray-700 gap-4">
    <div className="h-40 w-full sm:w-56 rounded-xl overflow-hidden">
      <Skeleton className="h-full w-full object-cover" />
    </div>

    <div className="flex-1 flex flex-col gap-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-20 mt-2" />
    </div>

    <div className="sm:flex sm:items-end sm:justify-end hidden">
      <Skeleton className="h-6 w-12" />
    </div>
  </div>
);
