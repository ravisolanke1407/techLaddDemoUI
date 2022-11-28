import { Box, Typography } from "@mui/material";
import React from "react";

export const Header = () => {
  return (
    <Box
      style={{
        backgroundImage: "url(./header-bg.jpg)",
        backgroundSize: "cover",
        height: 125,
        width: "100%",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        // paddingLeft: 8,
        // paddingRight: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
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
