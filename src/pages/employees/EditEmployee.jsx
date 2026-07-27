// src/pages/employees/EditEmployee.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm";

const EditEmployee = () => {
  const { employeeId } = useParams();

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Edit Employee
      </Typography>

      <EmployeeForm employeeId={employeeId} />
    </Box>
  );
};

export default EditEmployee;