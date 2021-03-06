import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

import * as actions from '../../store/actions';

function createData(name, location, decription, floor_size, price, realtor) {
  return { name, location, decription, floor_size, price, realtor };
}

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  { id: 'location', numeric: true, disablePadding: false, label: 'Location' },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description'
  },
  {
    id: 'floorSize',
    align: 'right',
    disablePadding: false,
    label: 'Floor Size'
  },
  {
    id: 'pricePerMonth',
    align: 'right',
    disablePadding: false,
    label: 'Price per month'
  },
  {
    id: 'rooms',
    align: 'right',
    disablePadding: false,
    label: 'Rooms'
  },
  {
    id: 'realtor',
    align: 'left',
    disablePadding: false,
    label: 'Realtor'
  }
];

function ApartmentsTableHead(props) {
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
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ApartmentsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },
  title: {
    flex: '1 1 100%',
    paddingTop: '20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ApartmentsTableToolbar = (props) => {
  const dispatch = useDispatch();
  const classes = useToolbarStyles();
  const [priceValue, setPriceValue] = React.useState([1, 10000]);
  const [floorSizeValue, setFloorSizeValue] = React.useState([1, 10000]);
  const [roomsValue, setRoomsValue] = React.useState([1, 10]);

  const { pageInfo } = props;

  // handle Price Change
  const handlePriceChange = (event, newValue) => {
    setPriceValue(newValue);
  };
  const handlePriceUp = (event, newValue) => {
    setPriceValue(newValue);
    dispatch(
      actions.setApartmentsFilter({ priceValue, floorSizeValue, roomsValue })
    );
    dispatch(actions.getApartments(pageInfo));
    dispatch(actions.getTotalApartments());
  };

  // handle Floor Size Change
  const handleFloorSizeChange = (event, newValue) => {
    setFloorSizeValue(newValue);
  };
  const handleFloorSizeUp = (event, newValue) => {
    setFloorSizeValue(newValue);
    dispatch(
      actions.setApartmentsFilter({ priceValue, floorSizeValue, roomsValue })
    );
    dispatch(actions.getApartments(pageInfo));
    dispatch(actions.getTotalApartments());
  };

  // handle Rooms Number Change
  const handleRoomsChange = (event, newValue) => {
    setRoomsValue(newValue);
  };
  const handleRoomsUp = (event, newValue) => {
    setRoomsValue(newValue);
    dispatch(
      actions.setApartmentsFilter({ priceValue, floorSizeValue, roomsValue })
    );
    dispatch(actions.getApartments(pageInfo));
    dispatch(actions.getTotalApartments());
  };

  return (
    <Toolbar className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Find Apartments
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Price
          </Typography>
          <Slider
            value={priceValue}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceUp}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={10000}
            min={1}
            step={1000}
            marks={true}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Rooms
          </Typography>
          <Slider
            value={roomsValue}
            onChange={handleRoomsChange}
            onChangeCommitted={handleRoomsUp}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={10}
            min={1}
            step={1}
            marks={true}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Floor Size
          </Typography>
          <Slider
            value={floorSizeValue}
            onChange={handleFloorSizeChange}
            onChangeCommitted={handleFloorSizeUp}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={10000}
            min={1}
            step={1000}
            marks={true}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

export default function ApartmentsTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('created');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();
  useEffect(() => {
    const priceValue = [1, 10000];
    const floorSizeValue = [1, 10000];
    const roomsValue = [1, 10];
    dispatch(
      actions.setApartmentsFilter({ priceValue, floorSizeValue, roomsValue })
    );
    dispatch(actions.getApartments({ order, orderBy, rowsPerPage, page }));
  }, [order, orderBy, page, rowsPerPage]);

  const { apartmentsInfo } = useSelector((state) => state.apartment);
  const { apartments, totalCount } = apartmentsInfo;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ApartmentsTableToolbar
          pageInfo={{ order, orderBy, rowsPerPage, page }}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <ApartmentsTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {apartments &&
                apartments.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">
                        {row.floorSize && row.floorSize.$numberDecimal}
                      </TableCell>
                      <TableCell align="right">
                        {row.pricePerMonth && row.pricePerMonth.$numberDecimal}
                      </TableCell>
                      <TableCell align="right">{row.rooms}</TableCell>
                      <TableCell align="left">
                        {row.realtor &&
                          `${row.realtor.firstName} ${row.realtor.lastName}`}
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
    </div>
  );
}
