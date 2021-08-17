import { useLocation, Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import SettingsIcon from '@material-ui/icons/Settings';

const routes = [
  {
    path: "/",
    sidebarName: "Graph",
    navbarName: "Graph",
    icon: DeviceHubIcon,
  },
  {
    path: "/analitics",
    sidebarName: "Analitics",
    navbarName: "Analitics",
    icon: BarChartIcon,
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: SettingsIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const activeRoute = (routeName) =>
    location.pathname === routeName ? true : false;

  return (
    <div>
      {routes.map((prop, key) => {
        return (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={prop.path}
            key={key}
          >
            <ListItem
              selected={activeRoute(prop.path)}
              color={activeRoute(prop.path) ? "primary" : "inherit"}
            >
              <ListItemIcon>
                <prop.icon
                  color={activeRoute(prop.path) ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary={prop.sidebarName} />
            </ListItem>
          </Link>
        );
      })}
    </div>
  );
}
