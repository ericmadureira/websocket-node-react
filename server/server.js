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

io.on('connection', (socket) => {
  console.log(`${new Date().toLocaleString()} - A user has connected: ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`${new Date().toLocaleString()} - A user has disconnected: ${socket.id}`)
  });
})

httpServer.listen(3434, () => {
  console.log('Server running at http://localhost:3434')
})
