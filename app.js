const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const xss = require('xss');
const routes = require('./routes');
const moment = require('moment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Gefum viewum aðgang að moment library
app.locals.moment = moment;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Síðan fannst ekki');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('Síðan fannst ekki 2');
});

app.listen(PORT);

console.log(`Express started on port ${PORT}`);

module.exports = app;
