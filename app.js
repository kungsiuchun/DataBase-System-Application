var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');
const db = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const listingRouter = require('./routes/listings');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  express: app,
  autoescape: true
});
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/listings', listingRouter);
app.use('/', indexRouter);
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

module.exports = app;

// app.get('/', (req, res) => {
//   db.any(`SELECT * FROM customer ORDER BY customerid DESC`)
//       .then(data => res.render('index', {
//         customer: data,
//         qCount: data.length
//       }))
//       .catch(() => createError(500));
// });


app.use((req, res, next) => next(createError(500)));

app.listen(3000, () => console.log('Server running on port 3000'))




