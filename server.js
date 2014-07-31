var express = require('express');
var app     = express();
var server  = app.listen(3000);
var io      = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		console.log('Aww..');
	});
	socket.on('chat', function(message) {
		console.log(message);
		io.emit('chat', message);
	});
});

app.get('/', function(req, res) {
	res.render('index');
});