import { Backdrop, Box } from "@mui/material";
import React from "react";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[200],
        }}
        size={80}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#D09B03",
          animationDuration: "550ms",
          position: "absolute",

          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const Loading = ({ isLoading }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {/* <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets8.lottiefiles.com/packages/lf20_poqmycwy.json"
          style={{ width: "250px" }}
        /> */}
        <FacebookCircularProgress />
      </Backdrop>
    </div>
  );
};

export default Loading;
