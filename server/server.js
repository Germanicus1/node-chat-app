const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000; // works for Heroku and locally
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  })

  socket.emit('newMessage', {
    from: 'Max',
    text: 'Hej,detta är ett test',
    createdAt: 123
  });
  

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});