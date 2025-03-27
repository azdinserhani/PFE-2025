import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
const CoursesTable = () => {
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
          <div className=" flex items-center">
            {params.row.status === "Active" ? (
              <span className="px-2 py-1 text-white bg-green-500 rounded-full text-sm mt-[10px] w-[25%] text-center">
                Active
              </span>
            ) : (
              <span className="px-2 py-1 text-white bg-gray-300 rounded-full text-sm mt-[10px] w-[25%] text-center">
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
          <div className=" ">
            <Link to={"/course/" + params.row.id}>
              <button className="px-2 py-1 text-white bg-blue-400 rounded-full text-sm mt-[10px] w-[25%] text-center cursor-pointer mr-5">
                Edit
              </button>
            </Link>
            
              <button className="px-2 py-1 text-white bg-red-400 rounded-full text-sm mt-[10px] w-[25%] text-center cursor-pointer">
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
      title: "React Bascdsics",
      price: "$50",
      status: "Active",
    },
    {
      id: "7",
      title: "Advanced JavaSccsdcsdript",
      price: "$70",
      status: "Inactive",
    },
    {
      id: "8",
      title: "UI/UX Dessdcdscign",
      price: "$60",
      status: "Active",
    },
    {
      id: "9",
      title: "dcsadcsadPython for Data Science",
      price: "$80",
      status: "Active",
    },
    {
      id: "10",
      title: "Learning",
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
