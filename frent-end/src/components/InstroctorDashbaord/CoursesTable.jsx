import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";

const CoursesTable = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleDelete = (id) => {
    console.log(`Delete course with ID: ${id}`);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 400,
    },
    {
      field: "price",
      headerName: "Price",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            {params.row.status === "Active" ? (
              <span 
                className="px-2 py-1 rounded-full text-sm mt-[10px] w-[25%] text-center"
                style={{ 
                  backgroundColor: `${theme.primary}`,
                  color: theme.cardBg
                }}
              >
                Active
              </span>
            ) : (
              <span 
                className="px-2 py-1 rounded-full text-sm mt-[10px] w-[25%] text-center"
                style={{ 
                  backgroundColor: theme.border,
                  color: theme.text
                }}
              >
                Inactive
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <Link to={"/course/" + params.row.id}>
              <button 
                className="px-4 py-1 rounded-full text-sm mt-[10px] text-center cursor-pointer transition-colors duration-300"
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.cardBg
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.primary}80`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                }}
              >
                Edit
              </button>
            </Link>
            <button 
              className="px-4 py-1 rounded-full text-sm mt-[10px] text-center cursor-pointer transition-colors duration-300"
              style={{ 
                backgroundColor: '#ef4444',
                color: theme.cardBg
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ef444480';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
              }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: "1",
      title: "React Basics",
      price: "$50",
      status: "Active",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      price: "$70",
      status: "Inactive",
    },
    {
      id: "3",
      title: "UI/UX Design",
      price: "$60",
      status: "Active",
    },
    {
      id: "4",
      title: "Python for Data Science",
      price: "$80",
      status: "Active",
    },
    {
      id: "5",
      title: "Machine Learning",
      price: "$100",
      status: "Inactive",
    },
    {
      id: "6",
      title: "React Basics",
      price: "$50",
      status: "Active",
    },
    {
      id: "7",
      title: "Advanced JavaScript",
      price: "$70",
      status: "Inactive",
    },
    {
      id: "8",
      title: "UI/UX Design",
      price: "$60",
      status: "Active",
    },
    {
      id: "9",
      title: "Python for Data Science",
      price: "$80",
      status: "Active",
    },
    {
      id: "10",
      title: "Machine Learning",
      price: "$110",
      status: "Inactive",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <DataGrid
        sx={{
          flex: 1,
          height: "650px",
          width: "100%",
          border: "none",
          color: theme.text,
          backgroundColor: theme.cardBg,
          '& .MuiDataGrid-cell': {
            borderColor: `${theme.border}40`,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: `${theme.primary}10`,
            color: theme.text,
            borderColor: theme.border,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: `${theme.primary}10`,
            color: theme.text,
            borderColor: theme.border,
          },
          '& .MuiCheckbox-root': {
            color: theme.secondary,
          },
          '& .MuiCheckbox-root.Mui-checked': {
            color: theme.primary,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: `${theme.primary}10`,
          },
          '& .MuiDataGrid-columnSeparator': {
            color: `${theme.border}40`,
          },
        }}
        className="border-none"
        rows={rows}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        checkboxSelection
      />
    </div>
  );
};

export default CoursesTable;
