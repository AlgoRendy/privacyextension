import { Grid, Box, AppBar, Paper, Typography } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGraph } from "../../store/slices/graphSlice";
import { DataGrid } from "@material-ui/data-grid";
import { GraphModel } from "../../util/graphModel";
import { linkColor } from "../../util/constants";

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
  const graph = useSelector(selectGraph);
  const [value, setValue] = useState("stylesheet");
  const [rerender, setRerender] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setRerender(!rerender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h4">Node specific view</Typography>
            <br />
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={GraphModel.getGraph().nodes}
                columns={nodeColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h4">Connection specific view</Typography>
            <br />
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <AppBar position="static">
                    <TabList
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {Object.keys(linkColor).map((link) => (
                        <Tab label={link} value={link} />
                      ))}
                    </TabList>
                  </AppBar>
                </Box>
                {Object.keys(linkColor).map((link) => (
                  <TabPanel value={link}>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={GraphModel.getGraph().links[link]}
                        columns={linkColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
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
