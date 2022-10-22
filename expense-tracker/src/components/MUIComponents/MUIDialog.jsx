import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions/actions";
import { useForm } from "react-hook-form";

const MUIDialog = (props) => {
  const { dialogState, dialogTitle, dialogContent } = props;

  const [{ dialog, refs }, dispatch] = useDataFromStore();

  const handleRejectAction = () => {
    handleClose();
  };

  const handleConfirmAction = () => {
    switch (dialog.src) {
      case "single_expense":
        console.log(refs);
        break;

      case "bulk_expenses":
        break;

      default:
        break;
    }
    // handleClose();
  };

  const handleClose = () => {
    dispatch({
      type: actions.CLOSE_DIALOG,
      dialog: {
        trigger: false,
        src: "",
      },
    });
  };

  return (
    <div>
      <Dialog
        open={dialogState}
        onClose={handleClose}
        fullWidth
        fullScreen={dialog.src === "bulk_expenses"}
        scroll="paper"
      >
        <DialogTitle id="dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent id="dialog-content">{dialogContent}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleRejectAction} size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAction}
            autoFocus
            size="small"
            style={{
              display: ["single_expense", "bulk_expenses"].includes(dialog.src)
                ? "none"
                : "block",
            }}
          >
            {dialogTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MUIDialog;
