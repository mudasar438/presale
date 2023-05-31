import { Button } from "@mui/material";

export const Button2 = (props) => {
  return (
    <>
      <Button
        {...props}
        sx={{
          color: "#fff",

          background:
            "linear-gradient(90deg, red 0%, #B345B9 57%,  blue 100%) ",

          fontSize: { xs: "0.8rem", md: "1.3rem" },
          fontWeight: "600",
          textAlign: "center",
          width: "100%",
          px: 3,
          py: 1.5,
        }}
      >
        {" "}
        {props.children}{" "}
      </Button>
    </>
  );
};
