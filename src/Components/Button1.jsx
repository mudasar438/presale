import { Box, Button } from "@mui/material";
export const Button1 = (props) => {
  return (
    // <Box
    //   {...props}
    //   sx={{
    //     background: "linear-gradient(45deg, red 0%, #B345B9 57%,  blue 100%) 1",
    //     p: "3px",
    //     width: "100%",
    //   }}
    // >
    <Button
      {...props}
      sx={{
        border: "3px solid",

        borderImage:
          "linear-gradient(90deg, red 0%, #B345B9 57%,  blue 100%) 1",
        color: "#fff",
        background: "#181818",
        fontSize: { xs: "0.8rem", md: "1.3rem" },
        fontWeight: "600",
        textAlign: "center",
        width: "100%",
        px: 3,
        py: 1,
      }}
    >
      {" "}
      {props.children}{" "}
    </Button>
    // </Box>
  );
};
