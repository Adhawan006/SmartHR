import { Paper, Typography, Box } from "@mui/material";

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

const COLORS = ["#4caf50", "#ff9800", "#f44336"];

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function AnalyticsChart({ attendance = [], leaves = [] }) {

    // Monthly attendance (Present count)
    const attendanceMap = {};

    attendance.forEach((record) => {
        if (record.status !== "Present") return;

        const date = new Date(record.date);

        if (isNaN(date)) return;

        const month = MONTHS[date.getMonth()];

        attendanceMap[month] = (attendanceMap[month] || 0) + 1;
    });

    const attendanceData = MONTHS.map((month) => ({
        month,
        attendance: attendanceMap[month] || 0,
    }));

    // Leave Status Overview
    const approved = leaves.filter(
        (l) => l.status === "Approved"
    ).length;

    const pending = leaves.filter(
        (l) => l.status === "Pending"
    ).length;

    const rejected = leaves.filter(
        (l) => l.status === "Rejected"
    ).length;

    const leaveData = [
        {
            name: "Approved",
            value: approved,
        },
        {
            name: "Pending",
            value: pending,
        },
        {
            name: "Rejected",
            value: rejected,
        },
    ];

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                width: "100%",
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={3}>
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
                <Box
                    sx={{
                        height: 320,
                    }}
                >
                    <Typography mb={2} fontWeight="bold">
                        Monthly Attendance
                    </Typography>

                    <ResponsiveContainer width="100%" height="100%">
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

                <Box
                    sx={{
                        height: 320,
                    }}
                >
                    <Typography mb={2} fontWeight="bold">
                        Leave Overview
                    </Typography>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={leaveData}
                                dataKey="value"
                                outerRadius={90}
                                label
                            >
                                {leaveData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
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