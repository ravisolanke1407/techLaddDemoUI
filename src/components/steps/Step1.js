import { Box, Grid } from "@mui/material";
import React from "react";
import Textfield from "../FormsComponent/TextField";

function Step1() {
  return (
    <>
      <Box sx={{ mb: 3, mt: 3 }}>
        <Grid container spacing={3} sx={{ pl: 1 }}>
          <Grid item xs={12} md={6}>
            <Textfield
              name="companyUEN"
              label="Company UEN"
              placeholder="Enter your company UEN"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Textfield
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Step1;
