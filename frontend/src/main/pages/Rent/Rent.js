import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ApartmentsTable from "../../components/ApartmentsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  map: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Rent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ApartmentsTable />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Map className={classes.map} /> */}
        </Grid>
      </Grid>
    </div>
  );
}
