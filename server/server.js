// server.ts
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server,{
  cors:{
    origin:"*",
    methods: ["GET","POST"]
  }
});
const { v4: uuidV4 } = require('uuid');
const { data } = require('autoprefixer');
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Redirect to a random room ID
app.get('/', (req, res) => {
  const roomId = uuidV4(); // Generate a random room ID
  res.redirect(`/${roomId}`);
});

// Render the room with the specified ID
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  socket.emit('me',socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId); // Join the room

    // Broadcast to everyone in the room except the current socket
    socket.to(roomId).emit('user-connected', userId);

    // Handle disconnection
    socket.on('disconnect', () => {
     socket.broadcast.emit('callendend')
    });
  });
  socket.on("answercall",(data)=>{
    io.to(data.to).emit("Callaccepted",data.userId)
  })
});

// Start the server
server.listen(3003, () => {
  console.log('Server is running on port 3000');
});
