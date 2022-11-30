import { Box } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    background:
      "linear-gradient(266.33deg, rgb(213, 3, 125) 3.04%, rgb(118, 3, 113) 16.97%, rgb(25, 5, 83) 45.49%)",
    height: 35,
    width: "100%",
  },
}));
export const Footer = () => {
  const classes = useStyles();
  return <Box className={classes.root}></Box>;
};
