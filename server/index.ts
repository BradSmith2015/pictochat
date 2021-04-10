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
  socket.broadcast.emit("chatStream", {
      username: socket.data.username
  })
  socket.on("message", (message)=>{
      socket.broadcast.emit("chatStream",{
      username: socket.data.username,
      message
  });
  })
});

io.listen(8000);
