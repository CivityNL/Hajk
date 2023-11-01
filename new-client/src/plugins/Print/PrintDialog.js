import React from "react";
import { createPortal } from "react-dom";
import { withSnackbar } from "notistack";

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
        <DialogTitle>Uw {`${saveAsType}`} wordt gegenereerd</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dit kan enige tijd duren, vooral als u een groot formaat (A2-A3) of
            een hoge resolutie (>72 dpi) heeft gekozen. Zodra het
            {`${saveAsType}`}-bestand beschikbaar is, wordt het naar uw computer
            gedownload.
            <br />
            <br />
            Als u niet langer wilt wachten kunt u het afdrukken annuleren door
            op onderstaande knop te drukken.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={cancelPrint}>
            Annuleren
          </Button>
        </DialogActions>
      </Dialog>,
      document.getElementById("root")
    );
  }
}

export default withSnackbar(PrintDialog);
