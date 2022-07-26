const PORT = process.env.PORT || 5000

const io = require('socket.io')({
  cors: {
    origin: "*",
    methods: ["GET", "POST","PATCH", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["my-custom-header"],
  }
})

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log("working")
  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

io.listen(PORT);