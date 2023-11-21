import React from "react";
import {
  Tooltip,
  Grid,
  Switch,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Select,
  Chip,
  MenuItem,
  Input,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ChipsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
}));

class SearchSettings extends React.PureComponent {
  state = {
    showSearchSourcesFilter: this.props.searchSources.length > 0 ? true : false,
  };

  localUpdateSearchOptions = (name, value) => {
    const { searchOptions } = this.props;
    // Send the new values up to the Search component's state
    this.props.updateSearchOptions({ ...searchOptions, [name]: value });
  };

  render() {
    const { searchOptions, searchSources, searchModel } = this.props;
    return (
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <FormControl component="fieldset">
            <FormLabel component="legend">Algemene zoekinstellingen</FormLabel>
            <FormGroup>
              <Tooltip
                disableInteractive
                title="Schakel dit in om te selecteren in welke gegevensbronnen
                de zoekopdracht wordt uitgevoerd. Als de schuifregelaar in de
                uit-positie staat, wordt er gezocht in alle beschikbare
                zoekbronnen."
              >
                <FormControlLabel
                  label="Beperk zoekbronnen"
                  control={
                    <Switch
                      checked={this.state.showSearchSourcesFilter}
                      onChange={(e) => {
                        // Pull out the new value
                        const showSearchSourcesFilter = e.target.checked;

                        // Set state to reflect in Switch's UI
                        this.setState({
                          showSearchSourcesFilter,
                        });

                        // Now, if user has turned off this setting, ensure
                        // that we also clean all search sources
                        if (showSearchSourcesFilter === false)
                          this.props.setSearchSources([]);
                      }}
                      color="primary"
                    />
                  }
                />
              </Tooltip>
              {this.state.showSearchSourcesFilter && (
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Select
                      fullWidth
                      labelId="demo-mutiple-chip-label"
                      multiple
                      value={searchSources}
                      onChange={(event) =>
                        this.props.setSearchSources(event.target.value)
                      }
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <ChipsWrapper>
                          {selected.map((option) => (
                            <Chip
                              key={option.id}
                              label={option.caption}
                              sx={{ margin: 0.25 }}
                            />
                          ))}
                        </ChipsWrapper>
                      )}
                    >
                      {searchModel
                        .getSources()
                        .sort((a, b) => a.caption.localeCompare(b.caption))
                        .map((source) => (
                          <MenuItem key={source.id} value={source}>
                            {source.caption}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </Grid>
              )}
            </FormGroup>
            <FormGroup>
              <Tooltip
                title="Indien actief zal het zoeken plaatsvinden in lagen die
                  zijn ingesteld om door de systeembeheerder te worden doorzocht
                  en die zichtbaar zijn."
              >
                <FormControlLabel
                  label="Alleen in zichtbare lagen zoeken"
                  control={
                    <Switch
                      checked={searchOptions.searchInVisibleLayers}
                      onChange={() => {
                        this.localUpdateSearchOptions(
                          "searchInVisibleLayers",
                          !searchOptions.searchInVisibleLayers
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </Tooltip>
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Instellingen voor tekst zoeken
            </FormLabel>
            <FormGroup>
              <Tooltip
                disableInteractive
                title="Indien actief zal een zoekopdracht naar 'weg' ook hits
                opleveren als bijvoorbeeld 'snelweg'."
              >
                <FormControlLabel
                  label="Wildcard voor"
                  control={
                    <Switch
                      checked={searchOptions.wildcardAtStart}
                      onChange={() =>
                        this.localUpdateSearchOptions(
                          "wildcardAtStart",
                          !searchOptions.wildcardAtStart
                        )
                      }
                      color="primary"
                    />
                  }
                />
              </Tooltip>
              <Tooltip
                disableInteractive
                title="Indien aktief zal een zoekopdracht naar 'weg' ook hits
                opleveren als bijvoorbeeld 'wegen'. "
              >
                <FormControlLabel
                  label="Wildcard na"
                  control={
                    <Switch
                      checked={searchOptions.wildcardAtEnd}
                      onChange={() =>
                        this.localUpdateSearchOptions(
                          "wildcardAtEnd",
                          !searchOptions.wildcardAtEnd
                        )
                      }
                      color="primary"
                    />
                  }
                />
              </Tooltip>
              <Tooltip
                disableInteractive
                title="Schakel uit om hoofdlettergevoelig te zoeken. Indien
                actief zal een zoekopdracht naar 'a' geen resultaten opleveren
                voor 'A'. "
              >
                <FormControlLabel
                  label="Hoofdlettergevoeligheid"
                  control={
                    <Switch
                      checked={searchOptions.matchCase}
                      onChange={() =>
                        this.localUpdateSearchOptions(
                          "matchCase",
                          !searchOptions.matchCase
                        )
                      }
                      color="primary"
                    />
                  }
                />
              </Tooltip>
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Ruimtelijke zoekinstellingen
            </FormLabel>
            <FormGroup>
              <Tooltip
                disableInteractive
                title="Indien actief zal het gehele object (bijvoorbeeld een
                pand) binnen het zoekgebied moeten passen om in het resultaat te
                  worden opgenomen. Indien inactief, is het voldoende dat
                  slechts een klein deel van het object binnen het zoekgebied
                  past of dit raakt."
              >
                <FormControlLabel
                  label="Vereisen dat het hele object binnen het zoekgebied past"
                  control={
                    <Switch
                      checked={searchOptions.activeSpatialFilter === "within"}
                      onChange={() =>
                        this.localUpdateSearchOptions(
                          "activeSpatialFilter",
                          searchOptions.activeSpatialFilter === "intersects"
                            ? "within"
                            : "intersects"
                        )
                      }
                      color="primary"
                    />
                  }
                />
              </Tooltip>
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <FormControl component="fieldset">
            <FormLabel component="legend">Visning av resultat</FormLabel>
            <FormGroup>
              <Tooltip
                disableInteractive
                title="Indien actief verschijnt er een label op de kaart naast
                het geselecteerde zoekresultaat"
              >
                <FormControlLabel
                  label="Toon tekstlabel op de kaart"
                  control={
                    <Switch
                      checked={searchOptions.enableLabelOnHighlight}
                      onChange={() =>
                        this.localUpdateSearchOptions(
                          "enableLabelOnHighlight",
                          !searchOptions.enableLabelOnHighlight
                        )
                      }
                      color="primary"
                    />
                  }
                />
              </Tooltip>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default SearchSettings;
