import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MUIDialog from "./MUIDialog";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions";
import { Expenses } from "../Expenses/Expenses";
import { Reports } from "../Reports/Reports";
import { Settings } from "../Settings/Settings";
import { Dashboard } from "../Dashboard/Dashboard";
import GoogleLoginBtn from "./GoogleButton";

const drawerWidth = 240;
const styles = {
  classes: {
    appbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const renderIcons = (text, index) => {
  switch (text) {
    case "Dashboard":
      return <DashboardIcon />;
    case "Expenses":
      return <AttachMoneyIcon />;
    case "Reports":
      return <ReceiptIcon />;
    case "Settings":
      return <SettingsIcon />;

    default:
      return <></>;
  }
};

const MiniDrawer = () => {
  const [state, dispatch] = useDataFromStore();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [dialog, setDialog] = React.useState({
    title: "",
    content: "",
    trigger: false,
  });

  const [navTitle, setNavTitle] = React.useState("Expensify");
  const [contentBody, setContentBody] = React.useState(<Expenses />);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listButtonAction = (e, text) => {
    setNavTitle(text);

    switch (text) {
      case "Dashboard":
        setContentBody(<Dashboard />);
        break;
      case "Expenses":
        setContentBody(<Expenses />);
        break;
      case "Reports":
        setContentBody(<Reports />);
        break;
      case "Settings":
        setContentBody(<Settings />);
        break;

      default:
        break;
    }
  };

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      trigger: false,
    });
  };
  const navigate = useNavigate();
  const handleConfirmAction = () => {
    dispatch({
      type: actions.LOGOUT,
    });
    navigate("/login", { replace: true });

    handleCloseDialog();
  };

  const handleRejectAction = () => {
    handleCloseDialog();
  };

  // const triggerDialog = (e, title, content) => {
  //   dispatch({
  //     type: actions.OPEN_DIALOG,
  //     dialog: {
  //       trigger: true,
  //       src: "signout",
  //     },
  //   });
  //   setDialog({
  //     title: title,
  //     content: content,
  //   });
  // };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar style={styles.classes.appbar}>
            <>
              <Tooltip title="Show Menu" placement="right">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" noWrap component="div">
                {navTitle}
              </Typography>
            </>
            <IconButton sx={{ px: 2.5, marginLeft: 120 }}></IconButton>
            <Tooltip title="Sign Out" placement="bottom">
              <IconButton
                onClick={(e) => {
                  setDialog({
                    trigger: true,
                    title: "Sign Out",
                    content: "Are you sure?",
                  });
                }}
              >
                <AccountCircleIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <img
              src="https://www.deltavcapital.com/wp-content/uploads/2018/05/expensify-logo-2.png"
              height={40}
              width={170}
            />
            <Tooltip title="Hide Menu" placement="left">
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Tooltip>
          </DrawerHeader>
          <Divider />
          <List>
            {["Dashboard", "Expenses", "Reports", "Settings"].map(
              (text, index) => (
                <Tooltip title={!open ? text : ""} placement="right">
                  <ListItemButton
                    key={text}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={(e) => listButtonAction(e, text)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {renderIcons(text, index)}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              )
            )}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <>{contentBody}</>
        </Box>
      </Box>
      <Dialog open={dialog.trigger} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>{dialog.content}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConfirmAction}
          >
            Confirm
          </Button>
          <Button
            onClick={handleRejectAction}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MiniDrawer;
