const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3001;
io.on('connection', (socket) => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('Usuário desconectado!', socket.id);
  });

  socket.on('set_username', (name) => {
    socket.data.name = name;
  });

  socket.on('message', (text) => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.name,
    });
  });
});

server.listen(PORT, () => console.log('Server running...'));
