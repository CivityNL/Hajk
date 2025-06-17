import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Chip,
  Input,
  MenuItem,
  Select,
  Typography,
  Stack,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { hfetch } from "utils/FetchWrapper";

function VectorFilter({ layer }) {
  const [filterAttribute, setFilterAttribute] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterComparer, setFilterComparer] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [layerProperties, setLayerProperties] = useState([]);

  /**
   * Prepare entries for dropdown, will contain possible values for filterAttribute.
   */
  const loadFeatureInfo = useCallback(() => {
    const { url, featureType } = layer.getProperties();
    hfetch(
      url +
        `?service=WFS&request=describeFeatureType&outputFormat=application/json&typename=${featureType}`
    ).then((response) => {
      response.json().then((featureInfo) => {
        const featureTypeInfo = featureInfo.featureTypes.find(
          (type) => type.typeName === featureType
        );
        if (featureTypeInfo && Array.isArray(featureTypeInfo.properties)) {
          const layerProperties = featureTypeInfo.properties
            .filter((property) => property.type !== "gml:Geometry")
            .map((property) => property.name);
          setLayerProperties(layerProperties);
        }
      });
    });
  }, [layer, setLayerProperties]);

  /**
   * Load filter options from layer and set state.
   */
  useEffect(() => {
    setFilterAttribute(layer.get("filterAttribute") || "");
    setFilterValue(layer.get("filterValue") || "");
    setFilterComparer(layer.get("filterComparer") || "");
    if (
      layer.get("filterAttribute") &&
      layer.get("filterComparer") &&
      layer.get("filterValue")
    ) {
      setCurrentFilter(
        `${layer.get("filterAttribute")} ${translateComparer(
          layer.get("filterComparer")
        )} ${layer.get("filterValue")}`
      );
    } else {
      setCurrentFilter("");
    }
    loadFeatureInfo();
  }, [layer, loadFeatureInfo]);

  /**
   * Translates the comparer to a more human readable format
   **/
  const translateComparer = (comparer) => {
    switch (comparer) {
      case "gt":
        return ">";
      case "lt":
        return "<";
      case "eq":
        return "=";
      case "not":
        return "≠";
      default:
        return comparer;
    }
  };

  /**
   * Handles change of filter options
   */
  const handleChange = (e, type) => {
    switch (type) {
      case "attribute":
        setFilterAttribute(e.target.value);
        break;
      case "comparer":
        setFilterComparer(e.target.value);
        break;
      case "value":
        setFilterValue(e.target.value);
        break;
      default:
        break;
    }
  };

  /**
   * Reads filter options from state, applies them on layer and refreshes the source.
   */
  const setFilter = () => {
    layer.set("filterAttribute", filterAttribute);
    layer.set("filterComparer", filterComparer);
    layer.set("filterValue", filterValue);

    setCurrentFilter(
      `${filterAttribute} ${translateComparer(filterComparer)} ${filterValue}`
    );

    layer.getSource().refresh();
  };

  /**
   * Resets the UI to no filter and reloads the source
   */
  const resetFilter = () => {
    // Reset the UI
    setCurrentFilter("");
    setFilterAttribute("");
    setFilterComparer("");
    setFilterValue("");

    // Reset filter options on layer
    layer.set("filterAttribute", "");
    layer.set("filterComparer", "");
    layer.set("filterValue", "");

    // Refresh source
    layer.getSource().refresh();
  };

  /**
   * Enables the activate button if both attribute and comparer are set.
   */
  const enableActivateButton = () => {
    if (filterAttribute !== "" && filterComparer !== "") {
      return true;
    }
    return false;
  };

  return (
    <>
      {currentFilter ? (
        <Chip
          label={currentFilter}
          variant="outlined"
          size="large"
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
          onDelete={() => setCurrentFilter("")}
          deleteIcon={<EditOutlinedIcon />}
        />
      ) : (
        <>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              sx={{ flexGrow: 1, flexBasis: "25%" }}
              variant="subtitle2"
            >
              Attribute
            </Typography>
            <Select
              value={filterAttribute}
              onChange={(e) => handleChange(e, "attribute")}
              placeholder="Select attributes"
              size="small"
              displayEmpty
              fullWidth
              inputProps={{
                name: "filterAttribute",
                placeholder: "Select the attribute",
                id: "attribute",
              }}
            >
              <MenuItem key={-1} value={""}>
                Select attributes
              </MenuItem>
              {layerProperties.map((property, i) => {
                return (
                  <MenuItem key={i} value={property}>
                    {property}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1 }}>
            <Typography
              sx={{ flexGrow: 1, flexBasis: "25%" }}
              variant="subtitle2"
            >
              Operator
            </Typography>
            <Select
              value={filterComparer}
              onChange={(e) => handleChange(e, "comparer")}
              displayEmpty
              size="small"
              fullWidth
              inputProps={{
                name: "filterComparer",
                id: "comparer",
              }}
            >
              <MenuItem value={""}>Select operator</MenuItem>
              <MenuItem value="gt">Greater than</MenuItem>
              <MenuItem value="lt">Less than</MenuItem>
              <MenuItem value="eq">Equal to</MenuItem>
              <MenuItem value="not">Not equal to</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 1 }}>
            <Typography
              sx={{ flexGrow: 1, flexBasis: "25%" }}
              variant="subtitle2"
            >
              Value
            </Typography>
            <Input
              value={filterValue}
              onChange={(e) => handleChange(e, "value")}
              placeholder="Filter value"
              fullWidth
              size="small"
              inputProps={{
                name: "filterValue",
                "aria-label": "Value",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            sx={{ pt: 2 }}
          >
            <Button onClick={resetFilter}>Återställ</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={setFilter}
              disabled={!enableActivateButton()}
            >
              Activate
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}

export default VectorFilter;
