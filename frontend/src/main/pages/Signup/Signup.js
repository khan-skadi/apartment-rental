import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { requestFailed, requestSuccess } from "../../../helper/request";
import * as actions from "../../../store/actions";
import { SIGNUP } from "../../../store/actionTypes";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();
  const { status } = useSelector((state) => state.auth);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(actions.clearAuthStatus());
    };
  }, []);

  useEffect(() => {
    if (status === requestFailed(SIGNUP)) {
      setSnackOpen(true);
    } else if (status === requestSuccess(SIGNUP)) {
      setSnackOpen(true);
    }
  }, [status]);

  const onSubmit = (data) => {
    dispatch(actions.signup(data));
  };

  const snackBarhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackOpen}
          autoHideDuration={3000}
          onClose={snackBarhandleClose}
        >
          <Alert variant="filled" severity="error">
            The email you want to signup is already in the datbase!
          </Alert>
        </Snackbar>
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
