import React from "react";
import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";

type NotificationProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  handleClose: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};
