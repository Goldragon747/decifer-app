var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:\\Users\\MBrannen\\Desktop\\decifer-app\\decifer-backend\\uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
require('dotenv').config();
app.set('view engine', 'jade')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/api/textdetect',upload.single('avatar'),(req,res)=>{
  console.log("file!",req.file)
  const client = new vision.ImageAnnotatorClient();
  client
    .textDetection(req.file.destination +"//" + req.file.filename)
    .then(results => {
      const labels = results[0].textAnnotations;
      res.send(labels)
      console.log('Labels:',results[0]);
      labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  console.log('post sent to /api/textdetect')
  
});
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
app.listen(3003,()=>{
  console.log("listening on port 3003")
})
module.exports = app;
