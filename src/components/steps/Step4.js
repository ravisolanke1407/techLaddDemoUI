import { Box, Link, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import Checkbox from "../FormsComponent/Checkbox";

function Step4({ isEnable }) {
  return (
    <>
      <Box
        sx={
          isEnable
            ? {
                mb: 3,
                mt: 3,
              }
            : {
                mb: 3,
                mt: 3,
                pointerEvents: "none",
              }
        }
      >
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
              <Typography variant="subtitle1" align="start">
                I confirm that I am the authorized person to upload bank
                statements on behalf of my company
              </Typography>
            }
          />
          <Checkbox
            name="c2"
            label={
              <Typography variant="subtitle1" align="start">
                I assure that uploaded bank statements and provided company
                information matches and are of same company, if there is a
                mismatch then my report will not be generated
              </Typography>
            }
          />
          <Checkbox
            name="c3"
            label={
              <Typography variant="subtitle1" align="start">
                I understand that this is a general report based on the bank
                statement and Credilinq is not providing a solution or guiding
                me for my business growth
              </Typography>
            }
          />
          <Checkbox
            name="termsOfService"
            label={
              <Typography variant="subtitle1" align="start">
                I duly accept the&nbsp;
                <Link
                  href="https://stage-smehealth.credilinq.ai/terms-and-conditions"
                  underline="none"
                  sx={{ color: "rgb(96, 26, 121)" }}
                  target="_blank"
                >
                  Terms & Conditions
                </Link>
              </Typography>
            }
          />
        </Stack>
      </Box>
    </>
  );
}

export default memo(Step4);
