import { Server, Socket } from "socket.io";

const io = new Server({
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.use((socket, next)=>{
    const username = socket.handshake.auth.username;
    if(!username){
        return next(new Error("invalid username"));
    }
    socket.data.username = username;
    next();
})

io.on("connection", (socket: Socket) => {
  socket.on("roomConnection", (room)=>{
    socket.join(room)
    socket.to(room).emit("chatStream", {
      username: socket.data.username
    })
  })
  
  socket.on("message", (message, room)=>{
      socket.to(room).emit("chatStream",{
      username: socket.data.username,
      message
  });
  })

  socket.on("drawing", (drawing, room) => {
      socket.to(room).emit("chatStream", {
            username: socket.data.username,
            drawing

      })
  })
});

io.listen(8000);
