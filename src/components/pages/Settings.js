import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSettings,
  settingActions,
} from "../../store/slices/settingsSlice";

export default function Settings() {
  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Box p="4" mt="4">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="8">
            <Paper>
              <List
                sx={{ width: "100%", bgcolor: "background.paper" }}
                component="div"
                subheader={
                  <ListSubheader component="div">
                    <b>Settings</b>
                  </ListSubheader>
                }
              >
                <Divider variant="inset" />
                <br />
                <ListSubheader component="div">
                  <b>Node Settings</b>
                </ListSubheader>
                <Divider variant="inset" />
                <br />
                <ListItem divider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Tracking Truth</Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        value={settings.trackingTruth}
                        label="Tracking Truth"
                        onChange={(event) =>
                          dispatch(
                            settingActions.tracking_truth(event.target.value)
                          )
                        }
                      >
                        {settings.trackingTruthOption.map((i) => (
                          <MenuItem value={i}>{i}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Tracking Node Color</Typography>
                    </Grid>
                    <Grid item>
                      <input
                        type="color"
                        value={settings.nodeColors.tracking}
                        onInput={(event) =>
                          dispatch(
                            settingActions.node_color_tracking(
                              event.target.value
                            )
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>None Tracking Node Color</Typography>
                    </Grid>
                    <Grid item>
                      <input
                        type="color"
                        value={settings.nodeColors.ntracking}
                        onInput={(event) => {
                          dispatch(
                            settingActions.node_color_ntracking(
                              event.target.value
                            )
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                <br />
                <ListSubheader component="div">
                  <b>Link Settings</b>
                </ListSubheader>
                <Divider variant="inset" />
                <br />
                {Object.keys(settings.linkColors).map((key) => (
                  <ListItem divider>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography>{key}</Typography>
                      </Grid>
                      <Grid item>
                        <input
                          type="color"
                          value={settings.linkColors[key]}
                          onInput={(event) => {
                            dispatch(
                              settingActions["type_" + key](event.target.value)
                            );
                          }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
