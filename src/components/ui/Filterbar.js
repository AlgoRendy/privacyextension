import LinearScaleIcon from "@material-ui/icons/LinearScale";
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Collapse,
} from "@material-ui/core";
import { linkColor, methods } from "../../util/constants";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { filterActions, selectFilter } from "../../store/slices/filterSlice";

export default function Filterbar() {

  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [openMethode, setOpenM] = useState(false);

  const handleClick = () => {
      setOpen(!open);
  }

  const handleClick2 = () => {
    setOpenM(!openMethode)
  }
    
  return (
    <div>
    <ListItem button onClick={handleClick}>
        <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="Resource Type"></ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
    {Object.keys(linkColor).map((x, i) => (
        <ListItem dense key={i}>
          <ListItemIcon>
            <Checkbox edge="start" checked={filter.type[x]} onChange={() => dispatch(filterActions["type_"+x]())} />
          </ListItemIcon>
          <ListItemText primary={x} />
          <ListItemSecondaryAction>
            <LinearScaleIcon style={{ color: linkColor[x] }} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </Collapse>
    <ListItem button onClick={handleClick2}>
        <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="Method"></ListItemText>
          {openMethode ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openMethode} timeout="auto" unmountOnExit>
    {methods.map((x, i) => (
        <ListItem dense key={i}>
          <ListItemIcon>
            <Checkbox edge="start" checked={filter.method[x]} onChange={() => dispatch(filterActions["method_"+x]())} />
          </ListItemIcon>
          <ListItemText primary={x} />
        </ListItem>
      ))}
    </Collapse>
      
    </div>
  );
}
