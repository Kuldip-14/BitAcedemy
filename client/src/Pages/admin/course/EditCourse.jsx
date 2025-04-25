import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';
import CourseTab from './CourseTab';

const EditCourse = () => {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h1 className="font-bold text-base text-gray-800 dark:text-gray-100">
          Add detailed information about your course
        </h1>
        <Link to="lecture">
          <Button variant="link" className="text-blue-600 hover:underline p-0">
            Go to lecture page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
