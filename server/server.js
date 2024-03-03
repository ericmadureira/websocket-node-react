const express = require('express')
const { createServer } = require('node:http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
});

app.get('/', (req, res) => {
  res.send('hello from node server')
})

// Connection EVENT
io.on('connection', (socket) => {
  console.log(`[${new Date().toLocaleString()}] - A user has connected: ${socket.id}`)

  // Message EVENT
  socket.on('send_message', (data) => {
    console.log(`[${new Date().toLocaleString()}] - Received message: ${data.message}`)
  })

  // Disconnection EVENT
  socket.on('disconnect', () => {
    console.log(`[${new Date().toLocaleString()}] - A user has disconnected: ${socket.id}`)
  });
})

httpServer.listen(3434, () => {
  console.log('Server running at http://localhost:3434')
})
