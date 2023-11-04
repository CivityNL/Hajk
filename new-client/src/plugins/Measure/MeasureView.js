import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { withSnackbar } from "notistack";
import { Typography } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

class MeasureView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.model = props.model;
    this.app = props.app;
    this.localObserver = props.localObserver;
    this.state = {
      shape: this.model.getType(),
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
    this.model.setType(event.target.value);
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Bij het tekenen van afstanden en oppervlaktes is het mogelijk de
            Shift-toets ingedrukt te houden. Vervolgens kunt u de lijn/het
            gebied uit de vrije hand tekenen.
            <br />
            <br />
            Om een meting te beëindigen, dubbelklikt u op het laatste punt of
            gebruikt u de Esc-toets.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="measure-native-helper">
              Type meting
            </InputLabel>
            <NativeSelect
              value={this.state.shape}
              onChange={this.handleChange("shape")}
              input={<Input name="shape" id="measure-native-helper" />}
            >
              <option value="Point">Punt</option>
              <option value="LineString">Afstand</option>
              <option value="Circle">Cirkel</option>
              <option value="Polygon">Oppervlakte</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={this.model.clear}
          >
            Metingen wissen
          </StyledButton>
        </Grid>
      </Grid>
    );
  }
}

export default withSnackbar(MeasureView);
