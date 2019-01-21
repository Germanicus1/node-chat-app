let socket = io();
socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'carmen',
    text: 'Hola! Esto es un test.'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
});