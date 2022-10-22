import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { CreateExpenseForm } from "../Forms/CreateExpenseForm";
import MUIDialog from "./MUIDialog";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions/actions";
import { BulkCreateExpensesForm } from "../Forms/BulkCreateExpensesForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";

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
  const [state, dispatch] = useDataFromStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      trigger: false,
    });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
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
        Add Report
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setDialog({
              title: "Create Report",
              content: "Option to generate a report",
              trigger: true,
            });
            setAnchorEl(null);
          }}
          disableRipple
        >
          <ReceiptIcon />
          Create Report
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomizedMenus;
