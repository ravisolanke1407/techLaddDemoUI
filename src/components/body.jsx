import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./FormsComponent/TextField";
import Button from "./FormsComponent/Button";

const steps = [
  {
    label: "Company Information",
    level: 0,
  },
  {
    label: "Applicant Information",
    level: 1,
  },
  {
    label: "Upload Documents",
    level: 2,
  },
  {
    label: "Last Documents",
    level: 3,
  },
];

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-active": {
      color: "rgb(236, 0, 85) !important",
    },
    "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed": {
      color: "green !important",
    },
  },
}));

const INITIAL_FORM_STATE = {
  companyUEN: "",
  companyName: "",
  fullName: "",
  designation: "",
  email: "",
  repeatEmail: "",
  phone: "",
  //   termsOfService: false,
};

const FORM_VALIDATION = Yup.object().shape({
  companyUEN: Yup.string().required("Company UEN is required"),
  companyName: Yup.string()
    .required("Company Name is required")
    .min(2, "Minimum 2 characters required"),
  fullName: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  repeatEmail: Yup.string().email("Invalid email.").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  //   termsOfService: Yup.boolean()
  //     .oneOf([true], "The terms and conditions must be accepted.")
  //     .required("The terms and conditions must be accepted."),
});
export const Body = () => {
  const classes = useStyles();

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(245, 248, 250)",
        // height: "calc(100vh - 142px)",
      }}
    >
      <Container>
        <Paper
          elevation={3}
          sx={{
            pt: 6,
            pb: 6,
            pl: 4,
            pr: 4,
            // height: "calc(70vh)",
          }}
        >
          <Box
            sx={{
              "& .MuiTextField-root": { color: "#000" },
            }}
          >
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const {
                  errors,
                  values: { companyName = "", companyUEN = "" },
                } = formik;

                return (
                  <Form>
                    <Stepper
                      className={classes.root}
                      activeStep={
                        !(
                          errors?.companyUEN ||
                          errors?.companyName ||
                          !companyName ||
                          !companyUEN
                        )
                          ? 1
                          : 0
                      }
                      orientation="vertical"
                    >
                      {steps.map((step) => (
                        <Step key={step.label}>
                          <StepLabel>
                            <Box
                              sx={{
                                boxShadow: "none",
                                background: "rgb(96, 26, 121)",
                                borderRadius: "5px",
                                padding: "6px 16px",
                                color: "rgb(255, 255, 255)",
                                marginLeft: 1,
                              }}
                            >
                              <Typography variant="h6" component="div">
                                {step.label}
                              </Typography>
                            </Box>
                          </StepLabel>
                          <StepContent TransitionProps={{ in: true }}>
                            {step.level === 0 ? (
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
                            ) : step.level === 1 ? (
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
                            ) : step.level === 2 ? (
                              <Box sx={{ mb: 3, mt: 3 }}>
                                <Grid container spacing={2} sx={{ pl: 1 }}>
                                  <Grid item xs={12} md={6}>
                                    upload docs
                                  </Grid>
                                </Grid>
                              </Box>
                            ) : (
                              <Box sx={{ mb: 3, mt: 3 }}>
                                <Grid container spacing={2} sx={{ pl: 1 }}>
                                  <Grid item xs={12} md={6}>
                                    Last Element
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    <Grid container spacing={2} justifyContent="right">
                      {/* <Grid item xs={12}>
                        <Checkbox
                          name="termsOfService"
                          legend="Terms Of Service"
                          label="I confirm that I am the authorized person to upload bank statements on behalf of my company"
                        />
                      </Grid> */}

                      <Grid item xs={1}>
                        <Button disabled={!formik.isValid} variant="contained">
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>

            {/* {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )} */}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
