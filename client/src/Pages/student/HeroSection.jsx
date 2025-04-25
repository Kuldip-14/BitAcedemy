import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery('');
  };

  return (
    <div className="relative bg-transparent py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-slate-700 dark:text-[#9acbd0] text-4xl font-bold mb-4 ">
          Find the Best Course for You
        </h1>
        <p className="text-slate-800 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-grow border-none focus-visible:ring-0 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <Button
            type="submit"
            className="bg-[#328e6e] dark:bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-[#205781] hover:dark:bg-[#328e6e]"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-100"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
