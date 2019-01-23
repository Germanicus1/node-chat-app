const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public')
const {generateMessage} = require('./utils/message');

console.log(publicPath);

const port = process.env.PORT || 3000; // works for Heroku and locally
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Event listener for messages
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  // socket.broadcast.emit from admin that new user joined.
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the chat'));

  // socket.emit from admin text: Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome new user!'));
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});