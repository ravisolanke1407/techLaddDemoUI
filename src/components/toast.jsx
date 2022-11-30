import { Alert, Snackbar } from "@mui/material";
import React, { memo } from "react";

function Toast({ open, handleClose, message }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default memo(Toast);
