/* eslint-disable no-undef */
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";

export default function ListeningToUpdatesSwitch({ isDebug = false }) {
    const [value, setValue] = useState(false);

    if (!isDebug) {
        chrome.store.onChanged.addListener(function (changes) {
            if ("logging" in changes) {
                if (value !== changes.logging) {
                    setValue(changes.logging);
                }
            }
        });
    }

    const handleChange = () => {
        if (!isDebug) {
            chrome.store.sync.set({ "logging": !value });
        } else {
            setValue(!value)
        }
    };


    return <FormControlLabel control={
        <Switch checked={value} label="Toogle Logging" onChange={handleChange}></Switch>} label="Toogle Logging">
    </FormControlLabel>
}
