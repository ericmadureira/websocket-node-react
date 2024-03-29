import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3434")

const App = () => {
  const [messageInput, setMessageInput] = useState('')
  const [receivedMessages, setReceivedMessages] = useState([])

  const sendMessage = (event) => {
    event.preventDefault()
    socket.emit('send_message', { message: messageInput })
    setMessageInput('')
  }

  useEffect(() => {
    // Receive message EVENT
    socket.on('receive_message', (data) => {
      // Update list of received messages
      setReceivedMessages([...receivedMessages, data])
    })
  }, [receivedMessages])

  return (
    <div>
      <h1>Socket.io Chat</h1>

      <ul id="messages">
        {receivedMessages.map(message => <li key={message.timestamp}>{message.content}</li>)}
      </ul>

      <form id="form" action="">
        <input id='input' autoComplete="off" value={messageInput} onChange={(event) => setMessageInput(event.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  )
}

export default App
