import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function StatsCard({
  title,
  value,
  icon,
  color,
  growth = "+5%",
  subtitle = "This Month",
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        borderLeft: `6px solid ${color}`,
        transition: "0.35s",
        cursor: "pointer",
        boxShadow: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              color="text.secondary"
              fontSize={14}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={1}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: color,
              width: 58,
              height: 58,
              borderRadius: "50%",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            icon={<TrendingUpIcon />}
            label={growth}
            color="success"
            size="small"
          />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;