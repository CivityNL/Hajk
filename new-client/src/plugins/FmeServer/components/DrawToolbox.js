import React from "react";
import { Grid, Paper } from "@mui/material";
import { Tooltip } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import EditIcon from "@mui/icons-material/Edit";
import Crop54Icon from "@mui/icons-material/Crop54";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const DrawToolbox = (props) => {
  const drawButtons = [
    {
      type: "Polygon", // Open-layers does not like all caps!
      tooltip:
        "Teken een gebied op de kaart door één keer per knooppunt te klikken, " +
        "eindig met een dubbelklik.",
      icon: <EditIcon />,
    },
    {
      type: "Rectangle",
      tooltip: "Teken een rechthoek op de kaart.",
      icon: <Crop54Icon />,
    },
    {
      type: "Circle",
      tooltip: "Rita en cirkel i kartan.",
      icon: <RadioButtonUncheckedIcon />,
    },
    {
      type: "Select",
      tooltip: "Kies uit bestaande objecten op de kaart.",
      icon: <TouchAppIcon />,
    },
    {
      type: "Reset",
      tooltip: "Was u niet tevreden? Verwijder alle objecten van de kaart.",
      icon: <RotateLeftIcon />,
    },
  ];

  function renderToggleButton(button, index) {
    const { activeDrawButton, handleDrawButtonClick } = props;
    return (
      <Tooltip key={index} title={button.tooltip}>
        <ToggleButton
          selected={button.type === activeDrawButton}
          onChange={() => handleDrawButtonClick(button.type)}
          value={button.type}
          sx={{ margin: 1 }}
          aria-label={button.tooltip}
        >
          {button.icon}
        </ToggleButton>
      </Tooltip>
    );
  }

  return (
    <Paper sx={{ marginTop: 1 }}>
      <Grid container>
        <Grid container item xs={12} justifyContent="space-between">
          {drawButtons.map((button, index) => {
            return renderToggleButton(button, index);
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DrawToolbox;
