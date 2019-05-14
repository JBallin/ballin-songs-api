const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const tokenRouter = require('./routes/token');
const searchRouter = require('./routes/search');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* istanbul ignore next */
if (!process.env.NODE_ENV) app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:3000' }));

app.use('/', indexRouter);
app.use('/token', tokenRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // set locals, only providing error in development
  res.locals.message = err.message;
  /* istanbul ignore next */
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  /* istanbul ignore next */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
