# React-Bidding-System

## React-express-websocket based Bidding system

This single Page application is a combination of React App and an API server written in Express.

WebSockets api socket.io is used to update the bid history and bidding time in real time.

React App is created using 'create-react-app', it automates the build of the app and the environment will have everything to build a modern React app.

# Running Application
Install node and npm globally.
## Running API Server
Open command prompt or git bash navigate to project folder.

    cd React-Bidding-System
First grab the dependencies with npm:

    npm install
   
Then run the app:

    npm start

## Running React App
Navigate to client folder inside the project.

     cd buy-my-cow/client
     
First grab the dependencies with npm:

    npm install
 
Then run the app: 

    npm start
  
and navigate to http://localhost:3000/

Note: make sure to start API server before React App.

## Web Sockets API socket.io
Bid Time starts when server starts and bid duration is hard coded in server to 60 min (const bidDuration in server.js).
A socket connection is established between client and server when client page loads. The below function notifies server when a client is connected.

        io.on('connection', function(socket) {console.log('a user connected')})
        
 ### Updating bidding time left in real time using sockets 
        
 When a client is connected it emits 'getTime' to server.
 Server listens for 'getTime' and emits remianingTime.
 
        io.on('connection', function(socket){
            console.log('a user connected');

            socket.on('getTime', function(msg){
                    io.emit('remainingTime',(bidDuration-process.hrtime(startTime)[0]));
                });           
        });
        
  ### Updating bid history on all the clients in real time 
  
  When ever a post request for bid history(end point to save the bid) triggers server socket emits 'updatedBid to all clients'.
  
        io.emit('updateBid', {updatedBidObj});	
        
  ## Data
  
 JSON files are used as dataLayer instead of a Database just for implementation easiness. In real Time a database is more efficient than a file system . livestock_details.json and bid_history.json are files used to read and write necessary data.
 

 
 
  
  
  
        
   
 
 
     
        




