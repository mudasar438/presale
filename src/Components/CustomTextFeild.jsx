import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CustomTextFeild = styled(TextField)({
  width: "100%",
  fontFamily: "Roboto",
  fontWeight: "500",
  borderRadius: "5px",
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInputLabel": {
    root: {
      color: "#ff0000", // Change this to your desired label color
    },
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "&input": {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#fff",
    },
  },
  "& input": {
    color: "white",
    fontSize: { xs: "12px", md: "14px" },
  },
  background: "#000",
});
