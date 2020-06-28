import React, { useEffect } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";

import * as actions from "../../../store/actions";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
];
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
}));

export default function AddApartment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();

  useEffect(() => {
    dispatch(actions.getRealtors());
  }, []);

  const realtors = useSelector((state) => {
    const { realtorsInfo } = state.user;
    let realtors = realtorsInfo ? realtorsInfo.users : [];
    return realtors;
  });

  const onSubmit = (data) => {
    // dispatch(actions.signup(data));
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
                      rules={{ required: "Name field is required" }}
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
                    <Controller
                      as={
                        <Autocomplete
                          freeSolo
                          id="free-solo-2-demo"
                          disableClearable
                          options={realtors.map(
                            (option) =>
                              `${option.firstName} ${option.lastName}`
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search input"
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                            />
                          )}
                        />
                      }
                      control={control}
                      autoComplete="realtor"
                      name="realtor"
                      variant="outlined"
                      rules={{ required: "Realtor field is required" }}
                      fullWidth
                      id="realtor"
                      label="Realtor"
                      autoFocus
                    />
                    <ErrorMessage
                      errors={errors}
                      as={<Typography color="error"></Typography>}
                      name="realtor"
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
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Map className={classes.map} /> */}
        </Grid>
      </Grid>
    </div>
  );
}
