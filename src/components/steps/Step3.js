import {
  Alert,
  Avatar,
  Box,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import DoneIcon from "@mui/icons-material/Done";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
function Step3({ isEnable, onChangePDF, selectedPDF }) {
  return (
    <>
      <Box sx={{ mb: 3, mt: 3 }}>
        <Grid container spacing={{ xs: 4, sm: 2, md: 4 }}>
          {/* Child 1 */}
          <Grid item xs={12} md={6}>
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
                // pointerEvents: "none",
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
                  sx={
                    isEnable
                      ? {
                          color: "rgb(0, 0, 84)",
                        }
                      : {
                          color: "rgb(189, 189, 189)",
                        }
                  }
                />
              </Avatar>
              <input
                accept="application/pdf"
                type="file"
                hidden
                id="pdf"
                onChange={onChangePDF}
              />
              <Typography
                component={"p"}
                variant="subtitle1"
                align="start"
                gutterBottom
                sx={
                  isEnable
                    ? {
                        color: "rgb(0, 0, 84)",
                      }
                    : {
                        color: "rgb(189, 189, 189)",
                        pointerEvents: "none",
                      }
                }
              >
                <label
                  style={
                    isEnable
                      ? {
                          borderBottom: "1px solid rgb(189, 189, 189)",
                          cursor: "pointer",
                        }
                      : {
                          borderBottom: "1px solid rgb(189, 189, 189)",
                          pointerEvents: "none",
                        }
                  }
                  for={"pdf"}
                >
                  Click to upload
                </label>
                &nbsp; or drag and drop Bank Statements
              </Typography>
            </Stack>
            {selectedPDF && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {selectedPDF.name}
              </Alert>
            )}
          </Grid>
          {/* Child 2 */}
          <Grid item xs={12} md={6}>
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent="flex-start"
              alignItems={"flex-start"}
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                // width: "50%",
              }}
            >
              <Stack direction={"row"} spacing={2}>
                <DoneIcon size="large" />
                <Typography component={"p"} variant="subtitle1" align="start">
                  PDFs (not scanned copies) of company's operating bank current
                  account(s) statements for the past 6 months. Example: If today
                  is 29 Nov 22, then please upload bank statements from May 22
                  to Oct 22 (both months inclusive)
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <DoneIcon size="large" />
                <Typography component={"p"} variant="subtitle1" align="start">
                  If your company is multi-banked, then please upload 6 months
                  bank statements for each bank account
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <DoneIcon size="large" />
                <Typography component={"p"} variant="subtitle1" align="start">
                  If your file is password protected, we request you to remove
                  the password and upload the file to avoid submission failure
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <DoneIcon size="large" />
                <Typography component={"p"} variant="subtitle1" align="start">
                  In case if you are facing any issue while uploading bank
                  statements, Please contact us on&nbsp;
                  <Link
                    href="mailto:support@credilinq.ai"
                    underline="none"
                    sx={{ color: "rgb(96, 26, 121)" }}
                  >
                    support@credilinq.ai
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default memo(Step3);
