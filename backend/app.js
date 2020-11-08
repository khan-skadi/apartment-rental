var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./src/routes');

var app = express();

app.use(cors());
const password = 'p3n3gr1n4';
mongoose.connect(
  `mongodb+srv://adminUser:${password}@apartmentrental.s6biq.mongodb.net/ardb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: 'true',
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
mongoose.connection.on('error', (err) => {
  console.log('err', err);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  return res.end('Api working');
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
  // res.render('error');
  next(err);
});

module.exports = app;
