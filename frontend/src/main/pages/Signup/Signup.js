import React from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import * as actions from "../../../store/actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log("data-----", data);
    dispatch(actions.signup(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={TextField}
                control={control}
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                rules={{ required: "First Name field is required" }}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <ErrorMessage
                errors={errors}
                as={<Typography color="error"></Typography>}
                name="first_name"
              ></ErrorMessage>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={TextField}
                control={control}
                autoComplete="lname"
                variant="outlined"
                rules={{ required: "Last Name field is required" }}
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
              />
              <ErrorMessage
                errors={errors}
                as={<Typography color="error"></Typography>}
                name="last_name"
              ></ErrorMessage>
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                autoComplete="email"
                variant="outlined"
                rules={{ required: "Email field is required" }}
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <ErrorMessage
                errors={errors}
                as={<Typography color="error"></Typography>}
                name="email"
              ></ErrorMessage>
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                rules={{ required: "Password field is required" }}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ErrorMessage
                errors={errors}
                as={<Typography color="error"></Typography>}
                name="password"
              ></ErrorMessage>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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
  );
}
