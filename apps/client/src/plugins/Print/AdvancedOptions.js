import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import withSnackbar from "components/WithSnackbar";
import {
  Badge,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Popover,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { TwitterPicker as ColorPicker } from "react-color";
import HajkToolTip from "components/HajkToolTip";

const Root = styled(Grid)(() => ({
  display: "flex",
  flexWrap: "wrap",
}));

const FormControlContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "100%",
  display: "flex",
}));

class AdvancedOptions extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  // Default colors for color picker used to set text color (used in map title, scale, etc)
  mapTextAvailableColors = [
    "#FFFFFF",
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
  ];

  placementOverlaps = {
    northArrow: false,
    scaleBar: false,
    logoType: false,
    qrCode: false,
  };

  toggleColorPicker = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  hideColorPicker = (e) => {
    this.setState({ anchorEl: null });
  };

  handleMapTextColorChangeComplete = (color) => {
    this.hideColorPicker();
    this.props.setMapTextColor(color);
  };

  allowBottomRightPlacement = () => {
    if (
      (this.props.options.copyright ?? "").length > 0 ||
      (this.props.options.disclaimer ?? "").length > 0
    ) {
      // no! This placement is now reserved for copyright and/or disclaimer.
      return false;
    }
    return true;
  };

  // Method for checking if any placement values are overlapping
  hasPlacementOverlap() {
    // We want to check if the selections are set to "Enabled", otherwise they are set to
    // "disabled" and cannot overlap.
    const northArrow = this.props.includeNorthArrow
      ? this.props.northArrowPlacement
      : "northDisabled";
    const scaleBar = this.props.includeScaleBar
      ? this.props.scaleBarPlacement
      : "scaleDisabled";
    const logo = this.props.includeLogo
      ? this.props.logoPlacement
      : "logoDisabled";
    const qrCode = this.props.includeQrCode
      ? this.props.qrCodePlacement
      : "qrCodeDisabled";

    // We check if any given value is the same as the other two placement values.
    // If so, they are stored as booleans in "placementOverlaps"
    this.placementOverlaps.northArrow =
      northArrow === scaleBar || northArrow === logo || northArrow === qrCode;
    this.placementOverlaps.scaleBar =
      scaleBar === northArrow || scaleBar === logo || scaleBar === qrCode;
    this.placementOverlaps.logoType =
      logo === northArrow || logo === scaleBar || logo === qrCode;
    this.placementOverlaps.qrCode =
      qrCode === northArrow || qrCode === scaleBar || qrCode === logo;

    // If any placement values are the same we return true and use it to display
    // error-message in render()
    return (
      this.placementOverlaps.northArrow ||
      this.placementOverlaps.scaleBar ||
      this.placementOverlaps.logoType ||
      this.placementOverlaps.qrCode
    );
  }

  renderPlacementSelect = (value, name, changeHandler, disabled) => {
    return (
      <Select
        variant="standard"
        value={value}
        onChange={changeHandler}
        disabled={disabled}
        inputProps={{
          name: name,
          id: name,
        }}
      >
        <MenuItem value={"topLeft"}>Top left</MenuItem>
        <MenuItem value={"topRight"}>Top right</MenuItem>
        {this.allowBottomRightPlacement() && (
          <MenuItem value={"bottomRight"}>Bottom right</MenuItem>
        )}
        <MenuItem value={"bottomLeft"}>Bottom left</MenuItem>
      </Select>
    );
  };

  renderIncludeSelect = (value, name, changeHandler) => {
    return (
      <Select
        variant="standard"
        value={value}
        onChange={changeHandler}
        inputProps={{
          name: name,
          id: name,
        }}
      >
        <MenuItem value={true}>Yes</MenuItem>
        <MenuItem value={false}>No</MenuItem>
      </Select>
    );
  };

  render() {
    const showOverlapWarning = this.hasPlacementOverlap();

    const {
      resolution,
      handleChange,
      mapTextColor,
      mapTitle,
      printComment,
      includeNorthArrow,
      northArrowPlacement,
      includeScaleBar,
      scaleBarPlacement,
      includeLogo,
      logoPlacement,
      includeQrCode,
      qrCodePlacement,
      printOptionsOk,
    } = this.props;
    return (
      <>
        <Root>
          <FormControlContainer item xs={12}>
            <FormControl fullWidth={true}>
              <TextField
                value={mapTitle}
                fullWidth={true}
                onChange={handleChange}
                label="Optional title"
                placeholder="Can be left blank"
                variant="standard"
                InputProps={{
                  id: "mapTitle",
                  name: "mapTitle",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Badge
                        sx={{
                          "& .MuiBadge-dot": {
                            backgroundColor: this.props.mapTextColor,
                          },
                        }}
                        badgeContent=" "
                        variant="dot"
                      >
                        <HajkToolTip title="Title color does not affect the map labels but only controls the color of surrounding text, such as title, copyright text, etc.">
                          <IconButton
                            id="mapTextColor"
                            onClick={this.toggleColorPicker}
                            sx={{ marginRight: 0.5 }}
                            edge="start"
                            size="small"
                          >
                            <PaletteIcon />
                          </IconButton>
                        </HajkToolTip>
                      </Badge>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </FormControlContainer>
          <FormControlContainer item xs={12}>
            <FormControl fullWidth={true}>
              <TextField
                value={printComment}
                fullWidth={true}
                onChange={handleChange}
                label="Optional comment"
                placeholder="Can be left blank"
                variant="standard"
                InputProps={{
                  id: "printComment",
                  name: "printComment",
                }}
              />
            </FormControl>
          </FormControlContainer>
          <FormControlContainer item xs={12}>
            <FormControl fullWidth={true} error={!printOptionsOk}>
              <InputLabel variant="standard" htmlFor="resolution">
                Resolution (DPI)
              </InputLabel>
              <Select
                variant="standard"
                value={resolution}
                onChange={handleChange}
                inputProps={{
                  name: "resolution",
                  id: "resolution",
                }}
              >
                {this.props.options.dpis.map((value, index) => {
                  return (
                    <MenuItem key={"dpis_" + index} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
              {!printOptionsOk && (
                <FormHelperText>
                  The image will not print correctly. 
                  Try using a lower resolution or smaller scale.
                </FormHelperText>
              )}
            </FormControl>
          </FormControlContainer>
          <FormControlContainer container item>
            <Grid item xs={6} sx={{ paddingRight: "10px" }}>
              <FormControl fullWidth={true}>
                <InputLabel variant="standard" htmlFor="includeNorthArrow">
                  Include north arrow
                </InputLabel>
                {this.renderIncludeSelect(
                  includeNorthArrow,
                  "includeNorthArrow",
                  handleChange
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth={true}
                error={this.placementOverlaps.northArrow}
              >
                <InputLabel variant="standard" htmlFor="northArrowPlacement">
                  North arrow placement
                </InputLabel>
                {this.renderPlacementSelect(
                  northArrowPlacement,
                  "northArrowPlacement",
                  handleChange,
                  !includeNorthArrow
                )}
              </FormControl>
            </Grid>
          </FormControlContainer>
          <FormControlContainer container item>
            <Grid item xs={6} sx={{ paddingRight: "10px" }}>
              <FormControl fullWidth={true}>
                <InputLabel variant="standard" htmlFor="includeScaleBar">
                  Include scale bar
                </InputLabel>
                {this.renderIncludeSelect(
                  includeScaleBar,
                  "includeScaleBar",
                  handleChange
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth={true}
                error={this.placementOverlaps.scaleBar}
              >
                <InputLabel variant="standard" htmlFor="scaleBarPlacement">
                  Scale bar placement
                </InputLabel>
                {this.renderPlacementSelect(
                  scaleBarPlacement,
                  "scaleBarPlacement",
                  handleChange,
                  !includeScaleBar
                )}
              </FormControl>
            </Grid>
          </FormControlContainer>
          <FormControlContainer container item>
            <Grid item xs={6} sx={{ paddingRight: "10px" }}>
              <FormControl fullWidth={true}>
                <InputLabel variant="standard" htmlFor="includeLogo">
                  Include logo
                </InputLabel>
                {this.renderIncludeSelect(
                  includeLogo,
                  "includeLogo",
                  handleChange
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth={true}
                error={this.placementOverlaps.logoType}
              >
                <InputLabel variant="standard" htmlFor="logoPlacement">
                  Logo placement
                </InputLabel>
                {this.renderPlacementSelect(
                  logoPlacement,
                  "logoPlacement",
                  handleChange,
                  !includeLogo
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
          </FormControlContainer>
          {this.props.enableAppStateInHash && (
            <FormControlContainer container item>
              <Grid item xs={6} sx={{ paddingRight: "10px" }}>
                <FormControl fullWidth={true}>
                  <InputLabel variant="standard" htmlFor="includeQrCode">
                    Include QR code
                  </InputLabel>
                  {this.renderIncludeSelect(
                    includeQrCode,
                    "includeQrCode",
                    handleChange
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  fullWidth={true}
                  error={this.placementOverlaps.qrCode}
                >
                  <InputLabel variant="standard" htmlFor="qrCodePlacement">
                    QR code placement
                  </InputLabel>
                  {this.renderPlacementSelect(
                    qrCodePlacement,
                    "qrCodePlacement",
                    handleChange,
                    !includeQrCode
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {showOverlapWarning && (
                  <FormHelperText error={true}>
                    The image will not be printed correctly. 
                    The placement choices overlap.
                  </FormHelperText>
                )}
              </Grid>
            </FormControlContainer>
          )}
          <Popover
            id="color-picker-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.hideColorPicker}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <ColorPicker
              inputProps={{
                id: "mapTextColor",
                name: "mapTextColor",
              }}
              color={mapTextColor}
              colors={this.mapTextAvailableColors}
              onChangeComplete={this.handleMapTextColorChangeComplete}
            />
          </Popover>
        </Root>
      </>
    );
  }
}

export default withSnackbar(AdvancedOptions);
