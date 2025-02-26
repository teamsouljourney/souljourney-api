const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Gerekirse burayı frontend domaini ile değiştir
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New User connected:", socket.id);

    // Listen Message
    socket.on("message", (data) => {
      console.log("📩 New Message:", data);
      io.emit("message", data); // Send the incoming message to everyone
    });

    //When the user leaves
    socket.on("disconnect", () => {
      console.log("❌ User left:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
