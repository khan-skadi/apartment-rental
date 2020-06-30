import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as actions from "../../store/actions";

const headCells = [
  {
    id: "firstName",
    align: "left",
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    align: "left",
    disablePadding: false,
    label: "Role",
  },
  {
    id: "actions",
    align: "center",
    disablePadding: false,
    label: "Action",
  },
];

function UsersTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={idx}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "actions" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UsersTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
    paddingTop: "20px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  add: {
    marginTop: "25px",
  },
  addLink: {
    textDecoration: "none",
    color: "#3f51b5",
  },
}));

const UsersTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Manage Users
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <NavLink to="/user/add" className={classes.addLink}>
            <MenuItem className={classes.add}>
              <IconButton color="inherit">
                <AddCircleIcon />
              </IconButton>
              <p>Add User</p>
            </MenuItem>
          </NavLink>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    margin: "auto",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  actions: {
    // width: "10%",
  },
  actionButtons: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
  cancel: {
    margin: theme.spacing(3, 2, 2),
  },
}));

export default function UsersTable() {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userDeleteId, setUserDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.getUsers({
        order,
        orderBy,
        rowsPerPage,
        page,
      })
    );
  }, [order, orderBy, page, rowsPerPage]);

  const { usersInfo } = useSelector((state) => state.user);
  const { users, totalCount } = usersInfo;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEdit = (row) => {
    dispatch(actions.saveEditUser(row));
    history.push(`/user/${row._id}`);
  };

  const handleDelete = () => {
    dispatch(actions.deleteUser({ id: userDeleteId }));
    setPage(0);
    setOrder("desc");
    setOrderBy("created");
    setRowsPerPage(5);
    setOpenDelete(false);
  };

  const showDeleteDiaglog = (id) => {
    setUserDeleteId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UsersTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <UsersTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {users &&
                users.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {`${row.firstName} ${row.lastName}`}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="center" className={classes.actions}>
                        <Button
                          className={classes.actionButtons}
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>

                        <Button
                          className={classes.actionButtons}
                          variant="outlined"
                          color="secondary"
                          onClick={() => showDeleteDiaglog(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            variant="contained"
            color="default"
            className={classes.cancel}
          >
            No
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            autoFocus
            className={classes.submit}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
