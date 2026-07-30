import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const attendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 94 },
  { month: "May", attendance: 91 },
  { month: "Jun", attendance: 96 },
];

const leaveData = [
  { name: "Approved", value: 18 },
  { name: "Pending", value: 7 },
  { name: "Rejected", value: 4 },
];

const COLORS = [
  "#4caf50",
  "#ff9800",
  "#f44336",
];

function AnalyticsChart() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        📊 Analytics Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr",
          },
          gap: 3,
        }}
      >
        {/* Attendance Chart */}

        <Box sx={{ height: 320 }}>
          <Typography
            mb={2}
            fontWeight="bold"
          >
            Monthly Attendance
          </Typography>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={attendanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="attendance"
                fill="#1976d2"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Leave Chart */}

        <Box sx={{ height: 320 }}>
          <Typography
            mb={2}
            fontWeight="bold"
          >
            Leave Overview
          </Typography>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={leaveData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {leaveData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
}

export default AnalyticsChart;