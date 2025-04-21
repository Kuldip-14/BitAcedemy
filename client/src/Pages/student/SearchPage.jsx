import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import Filter from "./Filter"; // Import updated Filter component

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
    <div className="max-w-7xl mx-auto p-4 md:p-7">
      <header className="my-6">
        <h1 className="font-bold text-xl">
          Results for “{urlQuery || "all courses"}”
        </h1>
        {urlQuery && (
          <p>
            Showing results for{" "}
            <span className="text-blue-800 font-semibold italic">
              {urlQuery}
            </span>
          </p>
        )}
      </header>

      <div className="flex flex-col md:flex-row gap-10">
        <Filter
          selectedCategory={selectedCategory}
          sortByPrice={sortByPrice}
          onFilterChange={updateFilters}
          showCategoryFilter={!urlQuery} // 👈 Hide category filter if user is searching
        />

        <div className="flex-1">
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

// ---- Helpers ----
const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-32 p-6">
    <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
    <h2 className="font-bold text-2xl mb-2">No Courses Found</h2>
    <p className="text-lg mb-4">
      Sorry, we couldn’t find any courses matching your filters.
    </p>
    <Link to="/" className="italic">
      <Button variant="link">Browse All Courses</Button>
    </Link>
  </div>
);

const CourseSkeleton = () => (
  <div className="flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
    <div className="h-32 w-full md:w-64">
      <Skeleton className="h-full w-full object-cover" />
    </div>

    <div className="flex-1 px-4 flex flex-col gap-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-20 mt-2" />
    </div>

    <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
      <Skeleton className="h-6 w-12" />
    </div>
  </div>
);
