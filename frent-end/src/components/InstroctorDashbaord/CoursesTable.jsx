import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import { MdDelete, MdAdd, MdFilterList, MdSearch } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import { deleteCourse, getCourseByInstructor } from "../../redux/ApiCalls";

// Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, courseTitle, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */ }
      <div
        className="absolute inset-0 bg-black opacity-50 transition-opacity"
        onClick={ onClose }
      />

      {/* Dialog */ }
      <div
        className="relative rounded-lg p-6 max-w-md w-full mx-4 transform transition-all"
        style={ {
          backgroundColor: theme.cardBg,
          boxShadow: `0 4px 20px ${theme.primary}20`,
          border: `1px solid ${theme.border}`
        } }
      >
        <div className="flex flex-col gap-4">
          <h3
            className="text-xl font-semibold"
            style={ { color: theme.text } }
          >
            Delete Course
          </h3>

          <p
            className="text-base"
            style={ { color: theme.secondary } }
          >
            Are you sure you want to delete "{ courseTitle }"? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={ onClose }
              className="px-4 py-2 rounded-md font-medium transition-all duration-300"
              style={ {
                backgroundColor: `${theme.primary}20`,
                color: theme.primary,
              } }
              onMouseOver={ (e) => {
                e.currentTarget.style.backgroundColor = `${theme.primary}30`;
              } }
              onMouseOut={ (e) => {
                e.currentTarget.style.backgroundColor = `${theme.primary}20`;
              } }
            >
              Cancel
            </button>

            <button
              onClick={ onConfirm }
              className="px-4 py-2 rounded-md font-medium transition-all duration-300"
              style={ {
                backgroundColor: "#ef4444",
                color: "white",
              } }
              onMouseOver={ (e) => {
                e.currentTarget.style.backgroundColor = "#f87171";
              } }
              onMouseOut={ (e) => {
                e.currentTarget.style.backgroundColor = "#ef4444";
              } }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesTable = () => {
  const [rows, setCourseRows] = useState([]);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, courseId: null, courseTitle: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchCourses = await getCourseByInstructor(user.id);

        setCourseRows(fetchCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
    try {
    } catch (error) { }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourseRows(rows.filter((row) => row.id !== id));
      setDeleteConfirmation({ open: false, courseId: null, courseTitle: "" });
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getFilteredRows = () => {
    if (!searchTerm) return rows;
    return rows.filter(
      (row) =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const columns = [
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
      minWidth: 250,
      headerAlign: "left",
      renderHeader: (params) => (
        <div
          className="flex items-center font-semibold"
          style={ { color: theme.text } }
        >
          { params.colDef.headerName }
          <FaSort className="ml-2 text-xs opacity-70" />
        </div>
      ),
      renderCell: (params) => (
        <div className="font-medium" style={ { color: theme.text } }>
          { params.row.title }
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      minWidth: 120,
      headerAlign: "left",
      renderHeader: (params) => (
        <div
          className="flex items-center font-semibold"
          style={ { color: theme.text } }
        >
          { params.colDef.headerName }
          <FaSort className="ml-2 text-xs opacity-70" />
        </div>
      ),
      renderCell: (params) => (
        <div
          className="font-bold "
          style={ { color: theme.primary } }
        >
          { params.row.price } $
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      minWidth: 150,
      headerAlign: "left",
      renderHeader: (params) => (
        <div
          className="flex items-center font-semibold"
          style={ { color: theme.text } }
        >
          { params.colDef.headerName }
          <FaSort className="ml-2 text-xs opacity-70" />
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            { params.row.status === "Active" ? (
              <span
                className="px-3 py-1.5 rounded-full text-sm font-medium w-24 text-center transition-all duration-300"
                style={ {
                  backgroundColor: `${theme.primary}`,
                  color: theme.cardBg,
                  boxShadow: `0 2px 8px ${theme.primary}40`,
                } }
              >
                Active
              </span>
            ) : (
              <span
                className="px-3 py-1.5 rounded-full text-sm font-medium w-24 text-center transition-all duration-300"
                style={ {
                  backgroundColor: theme.border,
                  color: theme.text,
                  opacity: 0.8,
                } }
              >
                Inactive
              </span>
            ) }
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 200,
      headerAlign: "center",
      renderHeader: (params) => (
        <div
          className="flex items-center font-semibold justify-center"
          style={ { color: theme.text } }
        >
          { params.colDef.headerName }
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="flex gap-3 mx-auto">
            <Link to={ "/instructor/edit-course/" + params.row.id }>
              <button
                className="px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center"
                style={ {
                  backgroundColor: theme.primary,
                  color: theme.cardBg,
                  boxShadow: `0 2px 6px ${theme.primary}30`,
                } }
                onMouseOver={ (e) => {
                  e.currentTarget.style.backgroundColor = `${theme.primary}e0`;
                  e.currentTarget.style.boxShadow = `0 4px 10px ${theme.primary}50`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                } }
                onMouseOut={ (e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.boxShadow = `0 2px 6px ${theme.primary}30`;
                  e.currentTarget.style.transform = "translateY(0)";
                } }
              >
                Edit
              </button>
            </Link>
            <button
              className="px-4 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center"
              style={ {
                backgroundColor: "#ef4444",
                color: "white",
                boxShadow: "0 2px 6px rgba(239, 68, 68, 0.3)",
              } }
              onMouseOver={ (e) => {
                e.currentTarget.style.backgroundColor = "#f87171";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(239, 68, 68, 0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              } }
              onMouseOut={ (e) => {
                e.currentTarget.style.backgroundColor = "#ef4444";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(239, 68, 68, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              } }
              onClick={ () => setDeleteConfirmation({
                open: true,
                courseId: params.row.id,
                courseTitle: params.row.title
              }) }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // const rows = [
  //   {
  //     id: "1",
  //     title: "React Basics",
  //     price: "$50",
  //     status: "Active",
  //   },
  //   {
  //     id: "2",
  //     title: "Advanced JavaScript",
  //     price: "$70",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "3",
  //     title: "UI/UX Design",
  //     price: "$60",
  //     status: "Active",
  //   },
  //   {
  //     id: "4",
  //     title: "Python for Data Science",
  //     price: "$80",
  //     status: "Active",
  //   },
  //   {
  //     id: "5",
  //     title: "Machine Learning",
  //     price: "$100",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "6",
  //     title: "React Basics",
  //     price: "$50",
  //     status: "Active",
  //   },
  //   {
  //     id: "7",
  //     title: "Advanced JavaScript",
  //     price: "$70",
  //     status: "Inactive",
  //   },
  //   {
  //     id: "8",
  //     title: "UI/UX Design",
  //     price: "$60",
  //     status: "Active",
  //   },
  //   {
  //     id: "9",
  //     title: "Python for Data Science",
  //     price: "$80",
  //     status: "Active",
  //   },
  //   {
  //     id: "10",
  //     title: "Machine Learning",
  //     price: "$110",
  //     status: "Inactive",
  //   },
  // ];

  return (
    <div
      className="flex flex-col w-full rounded-lg overflow-hidden shadow-lg transition-all duration-300"
      style={ { backgroundColor: theme.cardBg } }
    >
      {/* Header with search and filters */ }
      <div
        className="flex flex-col sm:flex-row items-center justify-between p-4 border-b"
        style={ { borderColor: `${theme.border}40` } }
      >
        <h2
          className="text-xl font-bold mb-3 sm:mb-0"
          style={ { color: theme.text } }
        >
          Your Courses
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div
            className="relative rounded-md flex-1 sm:flex-none"
            style={ {
              backgroundColor: `${theme.border}30`,
              minWidth: 220,
            } }
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch size={ 18 } style={ { color: theme.text } } />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={ searchTerm }
              onChange={ handleSearch }
              className="block w-full py-2 pl-10 pr-3 rounded-md focus:outline-none transition-all duration-300"
              style={ {
                backgroundColor: "transparent",
                color: theme.text,
                caretColor: theme.primary,
              } }
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-md transition-all duration-300"
              style={ {
                backgroundColor: showFilters
                  ? `${theme.primary}20`
                  : "transparent",
                color: theme.text,
              } }
              onClick={ () => setShowFilters(!showFilters) }
            >
              <MdFilterList size={ 20 } style={ { color: theme.primary } } />
            </button>

            <Link to="/instructor/create-course">
              <button
                className="px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-1 cursor-pointer"
                style={ {
                  backgroundColor: theme.primary,
                  color: theme.cardBg,
                  boxShadow: `0 2px 6px ${theme.primary}40`,
                } }
                onMouseOver={ (e) => {
                  e.currentTarget.style.backgroundColor = `${theme.primary}e0`;
                  e.currentTarget.style.boxShadow = `0 4px 10px ${theme.primary}60`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                } }
                onMouseOut={ (e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.boxShadow = `0 2px 6px ${theme.primary}40`;
                  e.currentTarget.style.transform = "translateY(0)";
                } }
              >
                <MdAdd size={ 18 } />
                New Course
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter panel (collapsible) */ }
      { showFilters && (
        <div
          className="p-4 border-b transition-all duration-300"
          style={ {
            backgroundColor: `${theme.primary}10`,
            borderColor: `${theme.border}40`,
          } }
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <label style={ { color: theme.text, fontSize: "0.875rem" } }>
                Status
              </label>
              <select
                className="py-2 px-3 rounded-md border focus:outline-none"
                style={ {
                  borderColor: `${theme.border}80`,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                } }
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label style={ { color: theme.text, fontSize: "0.875rem" } }>
                Price Range
              </label>
              <select
                className="py-2 px-3 rounded-md border focus:outline-none"
                style={ {
                  borderColor: `${theme.border}80`,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                } }
              >
                <option value="">All</option>
                <option value="0-50">$0 - $50</option>
                <option value="51-100">$51 - $100</option>
                <option value="101+">$101+</option>
              </select>
            </div>
          </div>
        </div>
      ) }

      {/* DataGrid */ }
      <div className="flex flex-col items-center w-full">
        <DataGrid
          sx={ {
            flex: 1,
            height: "auto",
            minHeight: "800px",
            maxHeight: "calc(100vh - 280px)",
            width: "100%",
            border: "none",
            color: theme.text,
            backgroundColor: theme.cardBg,
            "& .MuiDataGrid-cell": {
              borderColor: `${theme.border}20`,
              padding: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${theme.primary}08`,
              color: `${theme.text} !important`,
              borderColor: `${theme.border}40`,
              minHeight: "60px !important",
              maxHeight: "60px !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: `${theme.text} !important`,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeader": {
              color: `${theme.text} !important`,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: `${theme.primary}08`,
              color: theme.text,
              borderColor: `${theme.border}40`,
              minHeight: "56px",
            },
            "& .MuiCheckbox-root": {
              color: `${theme.secondary}90`,
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: theme.primary,
            },
            "& .MuiDataGrid-row": {
              minHeight: "70px !important",
              maxHeight: "70px !important",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: `${theme.primary}10`,
            },
            "& .MuiDataGrid-columnSeparator": {
              color: `${theme.border}20`,
            },
            "& .MuiTablePagination-root": {
              color: theme.text,
            },
            "& .MuiButtonBase-root": {
              color: theme.text,
            },
            "& .MuiDataGrid-selectedRowCount": {
              color: theme.text,
            },
            "& .MuiSvgIcon-root": {
              color: theme.text,
            },
            "& .MuiIconButton-root.Mui-disabled .MuiSvgIcon-root": {
              color: `${theme.text}40`,
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "transparent !important",
            },
          } }
          className="border-none"
          rows={ getFilteredRows() }
          getRowId={ (row) => row.id }
          columns={ columns }
          initialState={ {
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          } }
          pageSizeOptions={ [8, 16, 24] }
          disableRowSelectionOnClick
          checkboxSelection
          loading={ false }
          components={ {
            NoRowsOverlay: () => (
              <div
                className="flex flex-col items-center justify-center h-full p-10"
                style={ { color: `${theme.text}80` } }
              >
                <p className="text-lg font-medium mb-2">No courses found</p>
                <p className="text-sm">
                  Try changing your search criteria or add a new course
                </p>
              </div>
            ),
          } }
        />
      </div>

      {/* Confirmation Dialog */ }
      <ConfirmationDialog
        isOpen={ deleteConfirmation.open }
        onClose={ () => setDeleteConfirmation({ open: false, courseId: null, courseTitle: "" }) }
        onConfirm={ () => handleDelete(deleteConfirmation.courseId) }
        courseTitle={ deleteConfirmation.courseTitle }
        theme={ theme }
      />
    </div>
  );
};

export default CoursesTable;
