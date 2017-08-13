

const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port);
const http = require('http').Server(app);
const io = require('socket.io').listen(server);
const bidDuration = 3600;
const startTime = process.hrtime();


var COW_DETAILS_FILE = path.join(__dirname, 'livestock_details.json');
var BID_HISTORY_FILE = path.join(__dirname, 'bid_history.json');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('getTime', function(msg){
			io.emit('remainingTime',(bidDuration-process.hrtime(startTime)[0]));
		});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Put all API endpoints under '/api'
app.get('/api/details', (req, res) => {
 
	  fs.readFile(COW_DETAILS_FILE, function(err, data) {
	    if (err) {
	      console.error(err);
	      process.exit(1);
	    }	    
	    res.setHeader('Cache-Control', 'no-cache');
	    //Return them as json
	    res.json(JSON.parse(data));
	  });
});

app.get('/api/bidhistory', (req, res) => {
	fs.readFile(BID_HISTORY_FILE, function(err, data) {
	    if (err) {
	      console.error(err);
	      process.exit(1);
	    }	   
	    
	    res.setHeader('Cache-Control', 'no-cache');
	    //Return them as json
	    res.json(JSON.parse(data));
	  });
});


app.post('/api/bidhistory', (req, res) => {	 
	 fs.writeFile(BID_HISTORY_FILE, JSON.stringify(req.body), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      io.emit('updateBid', req.body);	    
      res.setHeader('Cache-Control', 'no-cache');
      res.json(req.body);
    });
});



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// const port = process.env.PORT || 5000;
// app.listen(port);

console.log(`BuyMYCow Server listening on ${port}`);