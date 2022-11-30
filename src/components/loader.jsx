import { Backdrop, CircularProgress } from "@mui/material";
import React, { memo } from "react";

function Loader({ isLoading }) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default memo(Loader);
