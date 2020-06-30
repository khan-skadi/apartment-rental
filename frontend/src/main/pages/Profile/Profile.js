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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { requestFailed, requestSuccess } from "../../../helper/request";
import { UPDATE_ME } from "../../../store/actionTypes";

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
    margin: theme.spacing(1),
    minWidth: "100%",
    margin: "0px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { me, error, status } = useSelector((state) => state.auth);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorLog, setConfirmPasswordErrorLog] = useState(null);
  const { handleSubmit, control, errors, setValue, register } = useForm();
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (me) {
      const { firstName, lastName, email } = me;
      setValue("first_name", firstName);
      setValue("last_name", lastName);
      setValue("email", email);
    }

    return () => {
      dispatch(actions.clearAuthStatus());
    };
  }, []);

  useEffect(() => {
    if (status === requestFailed(UPDATE_ME)) {
      setSnackOpen(true);
    } else if (status === requestSuccess(UPDATE_ME)) {
      setSnackOpen(true);
    }
  }, [status]);

  const onSubmit = (data) => {
    console.log("data", data);
    const { first_name, last_name, email, password, repassword } = data;
    if (password !== repassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorLog("Password should match");
    } else {
      setConfirmPasswordError(false);
      dispatch(
        actions.updateMe({
          _id: me._id,
          first_name,
          last_name,
          email,
          password,
        })
      );
    }
  };

  const snackBarhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackOpen}
                autoHideDuration={3000}
                onClose={snackBarhandleClose}
              >
                {error ? (
                  <Alert variant="filled" severity="error">
                    The email you want to change is already in the datbase!
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="success">
                    Your profile is successfully updated!
                  </Alert>
                )}
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
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      disabled={false}
                      inputRef={register}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="repassword"
                      label="Confirm Password"
                      type="password"
                      id="repassword"
                      disabled={false}
                      inputRef={register}
                      error={confirmPasswordError}
                      helperText={
                        confirmPasswordError && confirmPasswordErrorLog
                      }
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
                  Edit Profile
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
