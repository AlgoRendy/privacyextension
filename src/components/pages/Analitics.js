import {
  Grid,
  Box,
  AppBar,
  Paper,
  Typography,
  Toolbar,
} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { GraphModel } from "../../model/graphModel";
import { linkColor } from "../../util/constants";
import StatCard from "../ui/StatCard";
import TrackingFilter from "../ui/TrackingFilter";

const nodeColumns = [
  { field: "name", headerName: "Domain", minWidth: 200, flex: 1 },
  { field: "in", headerName: "In-Degree", minWidth: 200, flex: 0.4 },
  { field: "out", headerName: "Out-Degree", minWidth: 200, flex: 0.4 },
  {
    field: "isEasyPrivacyTracker",
    headerName: "EasyPrivacy",
    minWidth: 150,
    flex: 0.4,
  },
  {
    field: "isDuckDuckGoTracker",
    headerName: "DuckDuckGo",
    minWidth: 150,
    flex: 0.4,
  },
];
const linkColumns = [
  { field: "name", headerName: "From - To", minWidth: 300, flex: 1 },
  { field: "type", headerName: "Type", minWidth: 200, flex: 0.4 },
  { field: "method", headerName: "Method", minWidth: 200, flex: 0.4 },
  { field: "amt", headerName: "Amount of Requests", minWidth: 100, flex: 0.4 },
];

export default function Analitics() {
  const [value, setValue] = useState("stylesheet");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <StatCard
            style={{ marginTop: 20 }}
            name="Nodes"
            value={GraphModel.getTotalNodes()}
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard
            style={{ marginTop: 20 }}
            name="Connections"
            value={GraphModel.getTotalLinks()}
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard
            style={{ marginTop: 20 }}
            name="EasyPrivacy Tracker"
            value={GraphModel.getEasyPrivcay()}
          />
        </Grid>
        <Grid item xs={3}>
          <StatCard
            style={{ marginTop: 20 }}
            name="DuckDuckGo Tracker"
            value={GraphModel.getDuckDuckGo()}
          />
        </Grid>
        <TrackingFilter />
        <Grid item xs={12}>
          <Paper elevation={3}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Node View
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={GraphModel.getGraph().nodes}
                columns={nodeColumns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
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
                        Connection View
                      </Typography>
                    </Toolbar>
                    <Toolbar>
                      <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        {Object.keys(linkColor).map((link) => (
                          <Tab label={link} value={link} />
                        ))}
                      </TabList>
                    </Toolbar>
                  </AppBar>
                </Box>
                {Object.keys(linkColor).map((link) => (
                  <TabPanel value={link}>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={GraphModel.getGraph().links[link]}
                        columns={linkColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
