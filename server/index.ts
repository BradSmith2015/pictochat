import { Server, Socket } from "socket.io";

const io = new Server({
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket: Socket) => {
  console.log("User connected!")
  socket.on("message", (mes)=>{
      console.log(mes)
      socket.broadcast.emit("chatMessage",mes);
  })
});

io.listen(8000);
