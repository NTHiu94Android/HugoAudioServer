var createError = require('http-errors');

var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var albumRouter = require('./routes/album');
var productRouter = require('./routes/product');
var playlistRouter = require('./routes/playlist');
var playlistProductRouter = require('./routes/playlistProduct');
var usersRouter = require('./routes/users');

//CUSTOME
const dotenv = require('dotenv')
dotenv.config();

var app = express();

//Connect db from config/db
const db = require('./config/db');
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/album', albumRouter);
app.use('/product', productRouter);
app.use('/playlist', playlistRouter);
app.use('/playlistProduct', playlistProductRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
