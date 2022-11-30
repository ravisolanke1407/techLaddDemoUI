import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: "url(./header-bg.jpg)",
    backgroundSize: "cover",
    height: 125,
    width: "100%",
    display: "grid",
    placeItems: "center",
    color: "#fff",
  },
  innerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    width: "80%",
  },
}));
export const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.innerBox}>
        <img
          src="https://stage-smehealth.credilinq.ai/static/images/logo.svg"
          alt="logo"
        />
        <Typography component="div" variant="h5">
          SME Healthcheck - Application Form
        </Typography>
      </Box>
    </Box>
  );
};
