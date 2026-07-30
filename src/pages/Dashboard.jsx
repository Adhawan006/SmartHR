import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentActivities from "../components/RecentActivities";
import QuickActions from "../components/AdminQuickActions";

function Dashboard() {
  const handleDownloadReport = () => {
    const report = [
      [
        "Employee ID",
        "Employee Name",
        "Department",
        "Attendance",
        "Leave Status",
      ],
      ["EMP001", "Rahul Sharma", "IT", "Present", "None"],
      ["EMP002", "Priya Verma", "HR", "Present", "Approved"],
      ["EMP003", "Aman Singh", "Finance", "Absent", "Pending"],
      ["EMP004", "Neha Gupta", "Marketing", "Present", "None"],
    ];

    const csvContent = report.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Employee_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7fb",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          width: "100%",
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <Box
          sx={{
            p: 4,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadReport}
          >
            Download Report
          </Button>

          <Box sx={{ mt: 4, width: "100%" }}>
            <AnalyticsChart />
          </Box>

          <Box sx={{ mt: 4, width: "100%" }}>
            <QuickActions />
          </Box>

          <Box sx={{ mt: 4, width: "100%" }}>
            <RecentActivities />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;