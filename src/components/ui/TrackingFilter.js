/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Slide,
  Tab,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridCloseIcon } from "@material-ui/data-grid";
import { AddOutlined, InfoOutlined } from "@material-ui/icons";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTrackingFilter } from "../../store/slices/trackingFilterSlice";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
const filterTypes = [
  { label: "Js Filter", link: "js" },
  { label: "Custom Value Filter", link: "manuel" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
  { field: "name", headerName: "Filter Name", minWidth: 100, flex: 0.1 },
  { field: "description", headerName: "Description", minWidth: 100, flex: 0.2 },
  {
    field: "perEasyPrivacy",
    headerName: "% EP",
    minWidth: 100,
    flex: 0.1,
  },
  {
    field: "fpEasyPrivacy",
    headerName: "FP EP",
    minWidth: 100,
    flex: 0.1,
  },
  {
    field: "fnEasyPrivacy",
    headerName: "FN EP",
    minWidth: 100,
    flex: 0.1,
  },
  {
    field: "perDuckDuckGo",
    headerName: "% DDG",
    minWidth: 100,
    flex: 0.1,
  },
  {
    field: "fpDuckDuckGo",
    headerName: "FP DDG",
    minWidth: 100,
    flex: 0.1,
  },
  {
    field: "fnDuckDuckGo",
    headerName: "FN DDG",
    minWidth: 100,
    flex: 0.1,
  },
];

export default function TrackingFilter() {
  const [value, setValue] = useState("js");
  const [open, setOpen] = useState(false);
  const [jsInfoOpen, setJsInfoOpen] = useState(false);
  const [manualInfoOpen, setManualInfoOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const trackingFilter = useSelector(selectTrackingFilter);

  const generateJsInfoDialog = () => (
    <BootstrapDialog
      onClose={() => setJsInfoOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={jsInfoOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title">
        Js Filter Info
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography>
          In the "Js Filter" panel you are able to write custom js code wich
          gets executed when building the graph and marks all nodes are marked
          as true as a tringangle. It is also possible to see your labeling
          results in the node table or the statistics cards. Please make sure
          that you write a function label which takes a node as input and
          returns either true or false.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setJsInfoOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
  const generateManualInfoDialog = () => (
    <BootstrapDialog
      onClose={() => setManualInfoOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={manualInfoOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title">
        Manual Filter Info
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography>
          In the "Manual Filter" panel you are able to adjust certain values to
          determine wether a node is considered a tracking node. This filter
          will apply in the graph generation and can be looked at in the graph.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setManualInfoOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
  const generateJsFilterDialog = () => (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <GridCloseIcon />
          </IconButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              Generate Filter
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
              save
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      <div class={{ width: "100%", height: "100%" }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Paper>
              <List>
                <Box p={2}>
                  <ListSubheader>
                    <Typography>
                      <b>Generate Custom Js Filter</b>
                    </Typography>
                  </ListSubheader>
                </Box>
                <Divider variant="inset" />
                <br />
                <Box p={2}>
                  <ListItem>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row nowrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle2">Name:</Typography>
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </ListItem>
                  <ListItem>
                    <Typography variant="subtitle2">Description:</Typography>
                  </ListItem>
                  <Divider variant="inset" />
                  <br />
                  <TextField
                    id="outlined-multiline-static"
                    style={{ width: "100%" }}
                    variant="outlined"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                  />
                  <ListItem>
                    <Typography variant="subtitle2">Code:</Typography>
                  </ListItem>
                  <Divider variant="inset" />
                  <br />
                  <TextField
                    id="outlined-multiline-static"
                    style={{ width: "100%" }}
                    variant="outlined"
                    multiline
                    rows={8}
                    defaultValue="function(d){}"
                  />
                </Box>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );

  return (
    <>
      <Grid item xs={12}>
        <div
          style={{
            width: "100%",
          }}
        >
          <Paper elevation={3}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        Tracking Filter
                      </Typography>
                    </Toolbar>
                    <Toolbar>
                      <TabList onChange={(e, n) => setValue(n)}>
                        {filterTypes.map((link) => (
                          <Tab label={link.label} value={link.link} />
                        ))}
                      </TabList>
                    </Toolbar>
                  </AppBar>
                </Box>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <TabPanel value={filterTypes[0].link}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row nowrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        style={{ flex: 1 }}
                      >
                        Develop your custom js filter.
                      </Typography>
                      <div>
                        <IconButton onClick={() => setJsInfoOpen(true)}>
                          <InfoOutlined />
                        </IconButton>
                        <IconButton onClick={() => setOpen(true)}>
                          <AddOutlined />
                        </IconButton>
                      </div>
                    </div>
                    <Divider variant="inset" />
                    <br />
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={[]}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={filterTypes[1].link}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row nowrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        style={{ flex: 1 }}
                      >
                        Develop your custom value filter.
                      </Typography>
                      <div>
                        <IconButton onClick={() => setManualInfoOpen(true)}>
                          <InfoOutlined />
                        </IconButton>
                        <IconButton onClick={() => setManualInfoOpen(true)}>
                          <AddOutlined />
                        </IconButton>
                      </div>
                    </div>
                    <Divider variant="inset" />
                    <br />
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={[]}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                      />
                    </div>
                  </TabPanel>
                </div>
              </TabContext>
            </Box>
          </Paper>
        </div>
      </Grid>
      {generateJsInfoDialog()}
      {generateManualInfoDialog()}
      {generateJsFilterDialog()}
    </>
  );
}
