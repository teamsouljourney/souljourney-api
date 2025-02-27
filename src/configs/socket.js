const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New User connected:", socket.id);

    // Listen Message
    socket.on("message", (data) => {
      console.log("📩 New Message:", data);
      io.emit("message", data);
    });

    //When the user leaves
    socket.on("disconnect", () => {
      console.log("❌ User left:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
