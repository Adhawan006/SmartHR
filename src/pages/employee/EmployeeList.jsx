// src/pages/employees/EmployeeList.jsx

import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  // Dummy Data
  const rows = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Rahul Sharma",
      department: "IT",
      designation: "Frontend Developer",
      status: "Active",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Priya Singh",
      department: "HR",
      designation: "HR Executive",
      status: "Active",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Aman Gupta",
      department: "Finance",
      designation: "Accountant",
      status: "Inactive",
    },
  ];

  const filteredRows = rows.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = department
      ? employee.department === department
      : true;

    const matchesStatus = status
      ? employee.status === status
      : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              navigate(`/employees/${params.row.employeeId}`)
            }
          >
            View
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() =>
              navigate(`/employees/edit/${params.row.employeeId}`)
            }
          >
            Edit
          </Button>

          <Button size="small" color="error" variant="outlined">
            Deactivate
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Employee Management
      </Typography>

      {/* Search and Filters */}

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        mb={3}
      >
        <TextField
          label="Search Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <Box flexGrow={1} />

        <Button
          variant="contained"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </Button>
      </Box>

      {/* Table */}

      <Paper elevation={3}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default EmployeeList;