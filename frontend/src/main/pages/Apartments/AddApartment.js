import React, { useEffect, useState } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import Geocode from "react-geocode";

import ApartmentMap from "../../components/ApartmentMap";
import * as actions from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
    margin: "0px",
  },
}));

export default function AddApartment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors, setValue } = useForm();
  const [realtorId, setRealtorId] = useState("null");
  const [lat, setLat] = useState(41.608635);
  const [lng, setLng] = useState(21.745275);
  const [center, setCenter] = useState({ lat, lng });
  const [rentable, setRentable] = useState(true);

  useEffect(() => {
    dispatch(actions.getRealtors());
    setValue("lat", lat);
    setValue("lng", lng);
    setCenter({ lat, lng });
  }, [lat, lng]);

  const realtors = useSelector((state) => {
    const { realtorsInfo } = state.user;
    let realtors = realtorsInfo ? realtorsInfo.users : [];
    return realtors;
  });

  const onSubmit = (data) => {
    Geocode.setApiKey(process.env.REACT_APP_MAP_KEY);
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromLatLng(data.lat, data.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        dispatch(
          actions.addApartment({
            ...data,
            realtor: realtorId,
            location: address,
            rentable,
          })
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleLatChange = ([event]) => {
    let latitude = parseFloat(event.target.value);
    if (latitude <= 90 && latitude >= -90) {
      setLat(latitude);
    }
  };

  const handleLngChange = ([event]) => {
    let longitude = parseFloat(event.target.value);
    if (longitude <= 180 && longitude >= -180) {
      setLng(longitude);
    }
  };

  const handleRealtorChange = (event, values) => {
    values && setRealtorId(values._id);
  };

  const handleSearchBoxChange = (lat, lng) => {
    if (lat) {
      setValue("lat", lat);
      setValue("lng", lng);
      setCenter({ lat, lng });
    }
  };

  const hanldeRentableChange = (event) => {
    setRentable(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Apartment
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      as={TextField}
                      control={control}
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      rules={{
                        required: "Name field is required",
                      }}
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      as={TextField}
                      control={control}
                      name="lat"
                      variant="outlined"
                      fullWidth
                      label="Latitude"
                      placeholder="Between -90 and 90"
                      type="number"
                      rules={{
                        required: "Latitude field is required",
                        min: {
                          value: -90,
                          message: "Latitude should be bigger than -90",
                        },
                        max: {
                          value: 90,
                          message: "Latitude should be smaller than 90",
                        },
                      }}
                      id="lat"
                      onChange={handleLatChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="lat"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      as={TextField}
                      control={control}
                      name="lng"
                      variant="outlined"
                      placeholder="Between -180 and 180"
                      type="number"
                      rules={{
                        required: "Longitude field is required",
                        min: {
                          value: -90,
                          message: "Longitude should be bigger than -180",
                        },
                        max: {
                          value: 90,
                          message: "Longitude should be smaller than 180",
                        },
                      }}
                      fullWidth
                      id="lng"
                      label="Longitude"
                      onChange={handleLngChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="lng"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      as={TextField}
                      control={control}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      rules={{ required: "Description field is required" }}
                      fullWidth
                      id="description"
                      label="Description"
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      control={control}
                      autoComplete="floor_size"
                      name="floor_size"
                      variant="outlined"
                      rules={{ required: "Floor Size field is required" }}
                      fullWidth
                      id="floor_size"
                      label="Floor Size"
                      type="Number"
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="floor_size"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      control={control}
                      autoComplete="rooms"
                      name="rooms"
                      variant="outlined"
                      rules={{ required: "Rooms field is required" }}
                      fullWidth
                      id="rooms"
                      label="Rooms"
                      type="Number"
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="rooms"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      as={TextField}
                      control={control}
                      autoComplete="price"
                      name="price"
                      variant="outlined"
                      rules={{ required: "Price field is required" }}
                      fullWidth
                      id="price"
                      label="Price"
                      type="Number"
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={rentable}
                        onChange={hanldeRentableChange}
                        label="Rentable Status"
                      >
                        <MenuItem value={true}>Rentable</MenuItem>
                        <MenuItem value={false}>Already Rent</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={realtors && realtors}
                      getOptionLabel={(option) =>
                        `${option.firstName} ${option.lastName}`
                      }
                      onChange={handleRealtorChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Realtor"
                          required
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Apartment
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApartmentMap
            center={center}
            placeholder="Please find a location to add an Apartment"
            searchBoxChange={handleSearchBoxChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
