import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Avatar,
  Link,
} from "@mui/material";
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
import DoneIcon from "@mui/icons-material/Done";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Checkbox from "./FormsComponent/Checkbox";
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
  c1: false,
  c2: false,
  c3: false,
  termsOfService: false,
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FORM_VALIDATION = Yup.object().shape({
  companyUEN: Yup.string()
    .required("Company UEN is required")
    .min(8, "Invalid Company UEN")
    .matches(
      /(?<!x)(?<!\border\s*number\W*)(?=(?:[._ –-]*\d){7})(?!7|66\D*6|00\D*0|(?:\d\D*){3}0\D*0|(?:\d\D*){5}0(?:\D*0){6})\d(?:[._ –-]*\d){6}/gi,
      "Invalid Company UEN WWW"
    )
    .matches(/[A-Z]$/, "Invalid Company UEN"),
  companyName: Yup.string()
    .required("Company Name is required")
    .min(2, "Minimum 2 characters required"),
  fullName: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  repeatEmail: Yup.string().email("Invalid email.").required("Required"),
  phone: Yup.string()
    .required("Enter a 8-digit Mobile Number")
    .matches(phoneRegExp, "Mobile number is not valid")
    .min(8, "Enter a 8-digit Mobile Number")
    .max(8, "Enter a 8-digit Mobile Number"),
  c1: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
  c2: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
  c3: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
  termsOfService: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
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
                  values: {
                    companyName = "",
                    companyUEN = "",
                    fullName = "",
                    email = "",
                    designation = "",
                    repeatEmail = "",
                    phone = "",
                  },
                } = formik;

                return (
                  <Form>
                    <Stepper
                      className={classes.root}
                      activeStep={
                        !(
                          errors?.fullName ||
                          errors?.email ||
                          errors?.designation ||
                          errors?.repeatEmail ||
                          errors?.phone ||
                          !fullName ||
                          !designation ||
                          !repeatEmail ||
                          !phone ||
                          !email
                        )
                          ? 2
                          : !(
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
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            +65
                                          </InputAdornment>
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
                            ) : step.level === 2 ? (
                              <Box sx={{ mb: 3, mt: 3 }}>
                                <Stack
                                  direction={{ xs: "column", md: "row" }}
                                  spacing={{ xs: 2, sm: 2, md: 4 }}
                                  sx={{ width: "100%" }}
                                >
                                  <Stack
                                    direction={"column"}
                                    spacing={1}
                                    justifyContent="flex-start"
                                    alignItems={"center"}
                                    sx={{
                                      padding: " 40px 24px",
                                      borderRadius: "4px",
                                      border: "1px dashed rgba(0, 0, 0, 0.118)",
                                      backgroundColor: "rgb(250, 250, 250)",
                                      color: "rgb(189, 189, 189)",
                                      pointerEvents: "none",
                                      width: "50%",
                                      height: "fit-content",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        backgroundColor: "rgba(0, 0, 84, 0.12)",
                                        p: "3px",
                                      }}
                                    >
                                      <PictureAsPdfIcon
                                        size="small"
                                        sx={{
                                          color: "rgb(189, 189, 189)",
                                        }}
                                      />
                                    </Avatar>
                                    <Typography
                                      component={"p"}
                                      variant="subtitle1"
                                      align="start"
                                      gutterBottom
                                    >
                                      <span
                                        style={{
                                          borderBottom:
                                            "1px solid rgb(189, 189, 189)",
                                        }}
                                      >
                                        Click to upload
                                      </span>
                                      &nbsp; or drag and drop Bank Statements
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction={"column"}
                                    spacing={2}
                                    justifyContent="flex-start"
                                    alignItems={"flex-start"}
                                    sx={{
                                      color: "rgba(0, 0, 0, 0.6)",
                                      width: "50%",
                                    }}
                                  >
                                    <Stack direction={"row"} spacing={2}>
                                      <DoneIcon size="large" />
                                      <Typography
                                        component={"p"}
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        PDFs (not scanned copies) of company's
                                        operating bank current account(s)
                                        statements for the past 6 months.
                                        Example: If today is 29 Nov 22, then
                                        please upload bank statements from May
                                        22 to Oct 22 (both months inclusive)
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                      <DoneIcon size="large" />
                                      <Typography
                                        component={"p"}
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        If your company is multi-banked, then
                                        please upload 6 months bank statements
                                        for each bank account
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                      <DoneIcon size="large" />
                                      <Typography
                                        component={"p"}
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        If your file is password protected, we
                                        request you to remove the password and
                                        upload the file to avoid submission
                                        failure
                                      </Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                      <DoneIcon size="large" />
                                      <Typography
                                        component={"p"}
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        In case if you are facing any issue
                                        while uploading bank statements, Please
                                        contact us on&nbsp;
                                        <Link
                                          href="mailto:support@credilinq.ai "
                                          underline="none"
                                          target="_blank"
                                          sx={{ color: "rgb(96, 26, 121)" }}
                                        >
                                          support@credilinq.ai
                                        </Link>
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </Box>
                            ) : (
                              <Box sx={{ mb: 3, mt: 3 }}>
                                <Stack
                                  direction={"column"}
                                  spacing={1}
                                  justifyContent="flex-start"
                                  alignItems={"flex-start"}
                                  sx={{
                                    color: "rgba(0, 0, 0, 0.38)",
                                  }}
                                >
                                  <Checkbox
                                    name="c1"
                                    label={
                                      <Typography
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        I confirm that I am the authorized
                                        person to upload bank statements on
                                        behalf of my company
                                      </Typography>
                                    }
                                  />
                                  <Checkbox
                                    name="c2"
                                    label={
                                      <Typography
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        I assure that uploaded bank statements
                                        and provided company information matches
                                        and are of same company, if there is a
                                        mismatch then my report will not be
                                        generated
                                      </Typography>
                                    }
                                  />
                                  <Checkbox
                                    name="c3"
                                    label={
                                      <Typography
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        I understand that this is a general
                                        report based on the bank statement and
                                        Credilinq is not providing a solution or
                                        guiding me for my business growth
                                      </Typography>
                                    }
                                  />
                                  <Checkbox
                                    name="termsOfService"
                                    label={
                                      <Typography
                                        variant="subtitle1"
                                        align="start"
                                      >
                                        I duly accept the&nbsp;
                                        <Link
                                          href="https://stage-smehealth.credilinq.ai/terms-and-conditions"
                                          underline="none"
                                          sx={{ color: "rgb(96, 26, 121)" }}
                                        >
                                          Terms & Conditions
                                        </Link>
                                      </Typography>
                                    }
                                  />
                                </Stack>
                              </Box>
                            )}
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    <Stack
                      direction={"row"}
                      container
                      spacing={2}
                      justifyContent="right"
                    >
                      <Button
                        disabled={!formik.isValid}
                        sx={{ maxWidth: "100px" }}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
