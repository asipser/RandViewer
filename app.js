var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
setInterval(function(){
	num_balls = Math.floor(Math.random()*80+10);
	vx = []; // x velocity
	vy = []; // y velocity
	x = [];	 // x position
	y= [];	 // y position
	for(i=0;i<num_balls;i++){
		x.push(Math.random()*50 + 700); // x position of one mini circle 
		y.push(Math.random()*50 + 350); // y position of one mini circle
		vx.push(Math.random() -.5);			// x velocity of one mini circle 
		vy.push(Math.random() - .5);		// y velocity of one mini circle 
	}
	color = "#000000".replace(/0/g,function(){return (Math.floor(Math.random()*16)).toString(16);}); // generates random 6-digit hexcode

	io.emit('rand', {'color':color,'num_balls':num_balls,'x':x,'y':y,'vx':vx,'vy':vy});
},4000);

app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});