import React, { useEffect, useState } from "react";
import Header from "../components/Coursespage/Header";
import CourseCard from "../components/LandingPage/CourseCard";
import SideBar from "../components/Coursespage/SideBar";
import { useTheme } from "../context/ThemeContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getAllCourses } from "../redux/ApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router";

const CoursesPage = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    search: searchParams.get("search") || "",
    level: "",
    maxPrice: "",
    sort: ""
  });

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const result = await getAllCourses({
        page: currentPage,
        ...filters
      });
      setCourses(result.courses);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, filters]);

  // Update filters when URL search params change
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery !== filters.search) {
      setFilters(prev => ({ ...prev, search: searchQuery || "" }));
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="" style={ { backgroundColor: theme.background } }>
      <Header />
      <div className="container mx-auto">
        <div className="flex gap-4 p-4">
          <div className="flex-2/3">
            { isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <CircularProgress style={ { color: theme.primary } } />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-7">
                { courses.map((course) => (
                  <CourseCard key={ course.id } item={ course } />
                )) }
              </div>
            ) }
          </div>
          <div className="flex-1/3">
            <SideBar onFilterChange={ handleFilterChange } isLoading={ isLoading } />
          </div>
        </div>
        { !isLoading && (
          <div className="flex w-full justify-center my-10">
            <Stack spacing={ 2 }>
              <Pagination
                count={ totalPages }
                page={ currentPage }
                sx={ {
                  "& .MuiPaginationItem-root": {
                    color: theme.primary,
                  },
                } }
                onChange={ handlePageChange }
              />
            </Stack>
          </div>
        ) }
      </div>
    </div>
  );
};

export default CoursesPage;
