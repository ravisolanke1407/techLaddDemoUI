import {
  Box,
  Container,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "./FormsComponent/Button";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import { createFormAPI } from "../api/createForm";
import Loader from "./loader";
import Toast from "./toast";
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
  paperPD: {
    padding: "48px 32px",
  },
  boxBG: {
    backgroundColor: "rgb(245, 248, 250)",
  },
}));
/**INITIAL STATE */
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
/**Phone Regex */

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

/**FORM VALIDATION */
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
  fullName: Yup.string().required("Fullname is required"),
  designation: Yup.string().required("Position is required"),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required"),
  repeatEmail: Yup.string()
    .email("Enter a valid email")
    .required("Email is required")
    .oneOf([Yup.ref("email"), null], "Email does not match"),
  phone: Yup.string()
    .required("Mobile number is required")
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

/**COMPONENT */
export const Body = () => {
  const classes = useStyles();
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);

  /**FUNCTION TO CHECK ACTIVE STEP */
  const activeStepCondition = (errors, values) => {
    const {
      companyName = "",
      companyUEN = "",
      fullName = "",
      email = "",
      designation = "",
      repeatEmail = "",
      phone = "",
      c1,
      c2,
      c3,
      termsOfService,
    } = values;
    const activeStage =
      c1 &&
      c2 &&
      c3 &&
      termsOfService &&
      selectedPDF &&
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
        ? 4
        : selectedPDF &&
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
        ? 3
        : !(
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
        : 0;

    return activeStage;
  };
  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdfDoc", selectedPDF);
    formData.append("values", JSON.stringify(values));
    try {
      await createFormAPI(formData);

      setSelectedPDF(null);
      setIsLoading(false);
      resetForm({ values: INITIAL_FORM_STATE });
      setOpenToast(true);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleSelectedPDF = useCallback((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedPDF(file);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  }, []);

  return (
    <Box className={classes.boxBG}>
      <Container>
        <Loader isLoading={isLoading} />
        <Toast
          handleClose={handleClose}
          open={openToast}
          message="Form has submitted successfully!"
        />
        <Paper elevation={3} className={classes.paperPD}>
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
                const { errors, values } = formik;

                return (
                  <Form>
                    <Stepper
                      className={classes.root}
                      activeStep={activeStepCondition(errors, values)}
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
                              <Step1 />
                            ) : step.level === 1 ? (
                              <Step2 errors={errors} values={values} />
                            ) : step.level === 2 ? (
                              <Step3
                                isEnable={
                                  activeStepCondition(errors, values) === 2
                                }
                                onChangePDF={handleSelectedPDF}
                                selectedPDF={selectedPDF}
                              />
                            ) : (
                              <Step4 isEnable={selectedPDF ? true : false} />
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
