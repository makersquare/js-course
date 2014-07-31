var express = require('express');
var app     = express();
var server  = app.listen(3000);
var io      = require('socket.io')(server);

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});