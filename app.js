//Handler for environment variables saved in .env files
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var sessions = require('express-session');
var SessionStorage = require('connect-mongo');
var mongoose = require('mongoose');

//Routers
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var accountRouter = require('./routes/account');
var composeRouter = require('./routes/compose');
var savedmenuRouter = require('./routes/savedmenu');

//Initializing Express
var app = express();

//Database connection
const connP = mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(m => m.connection.getClient());

//Session middleware
app.use(sessions({
  secret: "guestSecret",
  saveUninitialized: false,
  //cookie: {secure: true},
  resave: false,
  store : SessionStorage.create({clientPromise: connP})
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/account', accountRouter);
app.use('/compose', composeRouter);
app.use('/savedmenu', savedmenuRouter);

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
