import io from 'socket.io-client'

const socket = io.connect("http://localhost:3434")

function App() {
  function sendMessage(e) {
    e.preventDefault()
    const input = document.getElementById('input')
    socket.emit('chat message', input.value)
    input.value = ''
  }

  return (
    <div>
      <h1>Socket.io Chat</h1>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  )
}

export default App
