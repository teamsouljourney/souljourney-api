const { Server } = require("socket.io");
const Appointment = require("../models/appointment");

const activeUsers = new Map();
const activeAppointments = new Map();
const pendingIceCandidates = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "https://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const { userId, userModel } = socket.handshake.query;

    if (userId) {
      activeUsers.set(userId, { socketId: socket.id, userModel });

      socket.emit("connectionStatus", { connected: true });

      const userPendingCandidates = pendingIceCandidates.get(userId);
      if (userPendingCandidates) {
        userPendingCandidates.forEach((candidate) => {
          socket.emit("webrtc-signal", candidate);
        });
        pendingIceCandidates.delete(userId);
      }
    }

    // Handle call initiation
    socket.on("callUser", async ({ userToCall, from, appointmentId }) => {
      try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
          return socket.emit("callError", { message: "Appointment not found" });
        }

        const now = new Date();
        const startTime = new Date(appointment.startTime);
        const endTime = new Date(appointment.endTime);

        if (now < startTime || now > endTime) {
          return socket.emit("callError", {
            message: "Appointment is not active at this time",
          });
        }

        activeAppointments.set(appointmentId, {
          userId: appointment.userId.toString(),
          therapistId: appointment.therapistId.toString(),
          startTime,
          endTime,
        });

        const recipientSocketId = activeUsers.get(userToCall)?.socketId;
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("callUser", { from, appointmentId });
        } else {
          socket.emit("callError", { message: "User is not online" });
        }
      } catch (error) {
        console.error("Error in callUser:", error);
        socket.emit("callError", { message: "Failed to initiate call" });
      }
    });

    // Handle answering a call
    socket.on("answerCall", ({ appointmentId }) => {
      const appointment = activeAppointments.get(appointmentId);
      if (appointment) {
        const callerId =
          userId === appointment.therapistId
            ? appointment.userId
            : appointment.therapistId;
        const callerSocketId = activeUsers.get(callerId)?.socketId;
        if (callerSocketId) {
          io.to(callerSocketId).emit("callAccepted", { appointmentId });
        }
      }
    });

    // Handle WebRTC signaling
    socket.on("webrtc-signal", ({ appointmentId, signal, to }) => {
      const recipientSocketId = activeUsers.get(to)?.socketId;
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("webrtc-signal", {
          appointmentId,
          signal,
          from: userId,
        });
      } else {
        if (!pendingIceCandidates.has(to)) {
          pendingIceCandidates.set(to, []);
        }
        pendingIceCandidates
          .get(to)
          .push({ appointmentId, signal, from: userId });
      }
    });

    // Handle call termination
    socket.on("endCall", ({ appointmentId }) => {
      const appointment = activeAppointments.get(appointmentId);
      if (appointment) {
        const otherUserId =
          userId === appointment.therapistId
            ? appointment.userId
            : appointment.therapistId;
        const otherUserSocketId = activeUsers.get(otherUserId)?.socketId;
        if (otherUserSocketId) {
          io.to(otherUserSocketId).emit("callEnded", { appointmentId });
        }
        activeAppointments.delete(appointmentId);
      }
    });

    // Handle messaging
    socket.on("sendMessage", (messageData) => {
      const receiverSocketId = activeUsers.get(
        messageData.recieverId
      )?.socketId;
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", messageData);
      }
      socket.emit("messageSent", messageData);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      if (userId) {
        activeUsers.delete(userId);

        for (const [
          appointmentId,
          appointment,
        ] of activeAppointments.entries()) {
          if (
            appointment.userId === userId ||
            appointment.therapistId === userId
          ) {
            const otherUserId =
              userId === appointment.therapistId
                ? appointment.userId
                : appointment.therapistId;
            const otherUserSocketId = activeUsers.get(otherUserId)?.socketId;
            if (otherUserSocketId) {
              io.to(otherUserSocketId).emit("callEnded", { appointmentId });
            }
            activeAppointments.delete(appointmentId);
          }
        }
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
