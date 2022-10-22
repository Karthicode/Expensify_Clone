import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TableChartIcon from "@mui/icons-material/TableChart";
import { CreateExpenseForm } from "../Forms/CreateExpenseForm";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { loadCSV } from "../../apicalls/expense-apicalls";
import { loadDataFromCSV } from "../../utilities/UploadImage";
import CSVReader from "./CSVReader";
import Papa from "papaparse";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CustomizedMenus = () => {
  const [dialog, setDialog] = React.useState({
    title: "",
    content: "",
    trigger: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleImportCSV = () => {
    setDialog({
      trigger: true,
      title: "Import CSV",
      content: <CSVReader />,
    });
  };

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      trigger: false,
    });
  };

  const closeDialogAfterFormSubmit = () => {
    setDialog({
      ...dialog,
      trigger: false,
    });
  };

  const handleAction = () => {
    setAnchorEl(null);
    setDialog({
      title: "Create Expense",
      content: (
        <CreateExpenseForm
          setDialog={() => closeDialogAfterFormSubmit()}
          editAction={false}
          editData={{}}
        />
      ),
      trigger: true,
    });
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Add Expense
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleAction} disableRipple>
          <ReceiptIcon />
          Create One
        </MenuItem>
        <label className="image_icon" htmlFor="icon-button-file">
          <input
            style={{ display: "none" }}
            accept=".csv"
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              const data = loadDataFromCSV(e.target.files[0]);
              console.log(data);
            }}
          />
          <MenuItem /* onClick={handleImportCSV} */ disableRipple>
            <TableChartIcon />
            Import CSV
          </MenuItem>
        </label>
      </StyledMenu>
      <Dialog
        open={dialog.trigger}
        onClose={handleCloseDialog}
        fullWidth={dialog.title !== "Import CSV"}
        maxWidth={200}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {dialog.title}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{dialog.content}</DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomizedMenus;
