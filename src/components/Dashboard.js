/* eslint-disable no-undef */
import React, { useEffect } from "react";
import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Graph from "./pages/Graph";
import { Route } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Analitics from "./pages/Analitics";
import Sidebar from "./ui/Sidebar";
import Settings from "./pages/Settings";
import Filterbar from "./ui/Filterbar";
import InputBase from "@material-ui/core/InputBase";
import { ListSubheader, Switch } from "@material-ui/core";
import { filterActions, selectFilter } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { GraphModel } from "../model/graphModel";
import { update_graph } from "../store/slices/graphSlice";
import {
  AddPhotoAlternate,
  ArrowDownward,
  ArrowUpward,
  DeleteForever
} from "@material-ui/icons";
import { saveSvgAsPng } from "save-svg-as-png";
import { toggle_labels } from "../store/slices/filterSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    height: "100vh",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Start listening for updates from background script
  useEffect(() => {
    var port = chrome.runtime.connect();
    port.onMessage.addListener((msg) => {
      GraphModel.addChunkToExistingGraph(msg.requests);
      dispatch(update_graph());
    });
  }, [dispatch]);

  const exportToJsonFile = () => {
    let dataUri =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(GraphModel.exportGraph());

    let exportFileDefaultName = "graph.json";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importJsonToGraph = () => {
    let uploadElement = document.createElement("input");
    uploadElement.type = "file";
    uploadElement.click();
    uploadElement.onchange = () => {
      var files = uploadElement.files;
      console.log(files);
      if (files.length <= 0) {
        return false;
      }
      var file = uploadElement.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          GraphModel.importGraph(JSON.parse(evt.target.result));
        };
        reader.onerror = function (evt) {
          alert("Error uploading File.");
        };
      }
    };
  };
  const deleteGraph = () => {
    GraphModel.resetGraph()
    dispatch(update_graph())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Privacy Graph
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) =>
                dispatch(filterActions.search_update(e.target.value))
              }
            />
          </div>
          <IconButton
            color="inherit"
            aria-label="export viewport as png"
            onClick={() => {
              saveSvgAsPng(document.getElementById("graph"), "graph.png", {
                backgroundColor: "#ffffff",
              });
            }}
          >
            <AddPhotoAlternate />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="export graph as json"
            onClick={exportToJsonFile}
          >
            <ArrowDownward />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="export graph as json"
            onClick={importJsonToGraph}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="delete current graph"
            onClick={deleteGraph}
          >
            <DeleteForever />
          </IconButton>
          <Switch checked={filter.labels} onChange={()=> dispatch(toggle_labels())}></Switch>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Sidebar />
        </List>
        <Divider />
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Options
            </ListSubheader>
          }
        >
          <Filterbar />
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.content}>
          <Route exact path="/">
            <Graph isDebug={true} />
          </Route>
          <Route path="/analitics">
            <Analitics />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Container>
      </main>
    </div>
  );
}
