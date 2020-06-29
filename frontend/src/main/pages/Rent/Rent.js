import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ApartmentsTable from "../../components/ApartmentsTable";
import ApartmentsListmap from "../../components/ApartmentsListmap";
import * as actions from "../../../store/actions";

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
  const [lat, setLat] = useState(41.608635);
  const [lng, setLng] = useState(21.745275);
  const [center, setCenter] = useState({ lat, lng });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getTotalApartments());
  }, []);

  const handleSearchBoxChange = (lat, lng) => {
    if (lat) {
      setCenter({ lat, lng });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ApartmentsTable />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ApartmentsListmap
            center={center}
            placeholder="Find Location"
            searchBoxChange={handleSearchBoxChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
