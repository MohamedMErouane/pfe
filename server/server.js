// server.ts
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Redirect to a random room ID
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

// Render the room with the specified ID
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId); // Join the room

    // Broadcast to everyone in the room except the current socket
    socket.to(roomId).emit('user-connected', userId);

    // Handle disconnection
    socket.on('disconnect', () => {
      // Broadcast to everyone in the room except the current socket
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
