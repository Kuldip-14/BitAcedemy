import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];
const Filter = ({
  selectedCategory,
  sortByPrice,
  onFilterChange,
  showCategoryFilter,
}) => {
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg md:text-xl">Filter Options</h2>

        <Select
          value={sortByPrice}
          onValueChange={(value) => onFilterChange(selectedCategory, value)}
        >
          <SelectTrigger
            className=" border-black dark:border-gray-600
          rounded-md text-black data-[placeholder]:text-black
          focus:border-primary dark:focus:border-primary-dark
          transition-colors"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent className=" border-gray-300 dark:border-gray-600">
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {showCategoryFilter && (
        <>
          <Separator className="my-4" />
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) => {
                const cat = value === "all" ? "" : value;
                onFilterChange(cat, sortByPrice);
              }}
            >
              <SelectTrigger
                className="
                 border-gray-800 dark:border-gray-600 
                 rounded-md 
                 focus:border-primary dark:focus:border-primary-dark 
                 transition-colors
                 text-black
               "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent className="border-2 border-gray-300 dark:border-gray-600">
                <SelectGroup>
                  <SelectLabel>Select Category</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
