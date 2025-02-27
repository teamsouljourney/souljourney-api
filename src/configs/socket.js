const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Track online users
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("🔵 New user connected:", socket.id);

    // Get user info from query parameters
    const { userId, userModel } = socket.handshake.query;

    if (userId) {
      // Add user to online users
      onlineUsers.set(userId, { socketId: socket.id, userModel });
      console.log(`👤 User ${userId} (${userModel}) is now online`);
    }

    // Handle sending messages
    socket.on("sendMessage", (messageData) => {
      console.log("📩 New message received:", messageData);

      // Get receiver's socket ID
      const receiverSocketId = onlineUsers.get(
        messageData.recieverId
      )?.socketId;

      // Emit to receiver if online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", messageData);
      }

      // Also emit back to sender to confirm message was sent
      socket.emit("messageSent", messageData);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      // Find and remove the disconnected user
      for (const [userId, userData] of onlineUsers.entries()) {
        if (userData.socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`❌ User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
