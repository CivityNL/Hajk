import React from "react";
import { createPortal } from "react-dom";
import withSnackbar from "components/WithSnackbar";

import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

class PrintDialog extends React.PureComponent {
  render() {
    const { cancelPrint, open, saveAsType } = this.props;
    return createPortal(
      <Dialog disableEscapeKeyDown={true} open={open}>
        <LinearProgress />
        <DialogTitle>Your {`${saveAsType}`} is created</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This may take a while, especially if you have chosen a large format
            (A2-A3) and high resolution (>72 dpi). But when everything is done, the{" "}
            {`${saveAsType}`}-file will be downloaded to your computer.
            <br />
            <br />
            If you don't want to wait any longer, you can cancel the print by
            pressing the button below.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={cancelPrint}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>,
      document.getElementById("root")
    );
  }
}

export default withSnackbar(PrintDialog);
