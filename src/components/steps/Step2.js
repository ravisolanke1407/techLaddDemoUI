import React from "react";
import Textfield from "../FormsComponent/TextField";
import { Box, Grid, InputAdornment } from "@mui/material";

function Step2(props) {
  const { errors, values } = props;
  const { companyName, companyUEN } = values;
  return (
    <>
      <Box sx={{ mb: 3, mt: 3 }}>
        <Grid container spacing={3} sx={{ pl: 1 }}>
          <Grid item xs={12} md={6}>
            <Textfield
              name="fullName"
              label="Full Name"
              disabled={
                errors?.companyUEN ||
                errors?.companyName ||
                !companyName ||
                !companyUEN
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Textfield
              name="designation"
              label="Position within company"
              disabled={
                errors?.companyUEN ||
                errors?.companyName ||
                !companyName ||
                !companyUEN
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Textfield
              name="email"
              label="Email Address"
              disabled={
                errors?.companyUEN ||
                errors?.companyName ||
                !companyName ||
                !companyUEN
              }
              helperText="The report will be delivered on this email address"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Textfield
              name="repeatEmail"
              label="Re-enter Email Address"
              disabled={
                errors?.companyUEN ||
                errors?.companyName ||
                !companyName ||
                !companyUEN
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Textfield
              name="phone"
              label="Mobile Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+65</InputAdornment>
                ),
              }}
              disabled={
                errors?.companyUEN ||
                errors?.companyName ||
                !companyName ||
                !companyUEN
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Step2;
