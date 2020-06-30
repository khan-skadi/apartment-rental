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
import { requestFailed } from "../../../helper/request";
import { UPDATE_USER } from "../../../store/actionTypes";

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

export default function EditUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const { handleSubmit, control, errors, setValue } = useForm();
  const [role, setRole] = useState("client");
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (status === requestFailed(UPDATE_USER)) {
      setSnackOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (user) {
      const { firstName, lastName, email, role } = user;
      setValue("first_name", firstName);
      setValue("last_name", lastName);
      setValue("email", email);
      setRole(role);
    }
  }, []);

  const onSubmit = (data) => {
    const { _id } = user;
    dispatch(
      actions.updateUser({
        ...data,
        _id,
        role,
      })
    );
  };

  const hanldeRoleChange = (event) => {
    setRole(event.target.value);
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
                Edit User
              </Typography>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackOpen}
                autoHideDuration={3000}
                onClose={snackBarhandleClose}
              >
                <Alert variant="filled" severity="error">
                  The email you're adding is already in the datbase.
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
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={role}
                        onChange={hanldeRoleChange}
                        label="Role"
                      >
                        <MenuItem value={"client"}>Client</MenuItem>
                        <MenuItem value={"realtor"}>Realtor</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Edit User
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
