var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./api/routes');

app.set('port',3000);
app.use(function(req,res,next){
	console.log(req.method, req.url);
	next();
});
/*STATIC REQUESTS*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/api',express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended : false}));

app.use('/api',routes);
//app.use('/api',routes);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// var server = app.listen(app.get('port'),function(){
// 	var port = server.address().port;
// 	console.log('Magic is on ' + port );
// });

module.exports = app;
