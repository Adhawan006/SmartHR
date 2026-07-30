import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// import StatsCard from "../components/StatsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentActivities from "../components/RecentActivities";
import QuickActions from "../components/QuickActions";

function Dashboard() {
  const cards = [
    {
      title: "Total Employees",
      value: "150",
      icon: <GroupsIcon />,
      color: "#1976d2",
      growth: "+12",
      subtitle: "This Month",
    },
    {
      title: "Attendance",
      value: "92%",
      icon: <AccessTimeIcon />,
      color: "#2e7d32",
      growth: "+3%",
      subtitle: "vs Last Month",
    },
    {
      title: "Leave Requests",
      value: "12",
      icon: <EventNoteIcon />,
      color: "#ed6c02",
      growth: "-2",
      subtitle: "Pending",
    },
    {
      title: "Departments",
      value: "6",
      icon: <BusinessIcon />,
      color: "#7b1fa2",
      growth: "+1",
      subtitle: "New Department",
    },
  ];

  const handleDownloadReport = () => {
    const report = [
      ["Employee ID", "Employee Name", "Department", "Attendance", "Leave Status"],
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
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <Box
        sx={{
          width: 250,
          bgcolor: "#0f172a",
          color: "white",
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={5}>
          SmartHR Lite
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <GroupsIcon />
          <Typography>Employees</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <AccessTimeIcon />
          <Typography>Attendance</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <EventNoteIcon />
          <Typography>Leave</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <SettingsIcon />
          <Typography>Settings</Typography>
        </Box>
      </Box>

      <Box flex={1}>
        <Paper
          elevation={1}
          sx={{
            px: 4,
            py: 2,
            borderRadius: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search employees, departments..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" alignItems="center" gap={2}>
            <NotificationsIcon />

            <Avatar sx={{ bgcolor: "#1976d2" }}>A</Avatar>
          </Box>
        </Paper>

        <Box p={4}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadReport}
          >
            Download Report
          </Button>

          <Box mt={4}>
            <AnalyticsChart />
          </Box>

          <Box mt={4}>
            <QuickActions />
          </Box>

          <Box mt={4}>
            <RecentActivities />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;