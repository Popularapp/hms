var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session');
var passport = require('passport');

//routes
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var patientRouter = require('./routes/patient');
var doctorRouter = require('./routes/doctor');

var app = express();

// app.listen('3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.locals.errors = null;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))

app.use(expressValidator({
  errorFormater: function(param,msg,value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
    }
    return{
        param : formParam,
        msg : msg,
        value: value
    };
},
customValidators: {
    isImage: function (value, filename) {
        var extension = (path.extname(filename)).toLowerCase();
        switch(extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case '.png':
                return '.png';
            case '.pdf':
                return '.pdf';
            case '':
                return '.jpg';
            default: 
                return false;
        }
    }
}
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
  
app.use('/', indexRouter);
app.use('/admin/', adminRouter);
app.use('/patient/', patientRouter);
app.use('/doctor/', doctorRouter);

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
