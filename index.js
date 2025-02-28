const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors'); // CORS paketini dahil edin

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 8000;

// CORS'u etkinleştir
app.use(cors());

// Statik dosyaları sunun
app.use(express.static(__dirname));

const offers = [];
const connectedSockets = [];

io.on('connection', (socket) => {
    console.log("New client connected: ", socket.id);

    const userName = socket.handshake.auth?.userName;
    const password = socket.handshake.auth?.password;

    if (!userName || password !== "x") {
        console.log("Unauthorized user disconnected.");
        socket.disconnect(true);
        return;
    }

    connectedSockets.push({ socketId: socket.id, userName });

    if (offers.length) {
        socket.emit('availableOffers', offers);
    }

    socket.on('newOffer', (newOffer) => {
        const offerObj = {
            offererUserName: userName,
            offer: newOffer,
            offerIceCandidates: [],
            answererUserName: null,
            answer: null,
            answererIceCandidates: []
        };
        offers.push(offerObj);
        socket.broadcast.emit('newOfferAwaiting', offers.slice(-1));
    });

    socket.on('newAnswer', (offerObj, ackFunction) => {
        const offerToUpdate = offers.find(o => o.offererUserName === offerObj.offererUserName);
        if (!offerToUpdate) {
            console.log("No matching offer found");
            return;
        }
        
        offerToUpdate.answer = offerObj.answer;
        offerToUpdate.answererUserName = userName;
        
        const socketToAnswer = connectedSockets.find(s => s.userName === offerObj.offererUserName);
        if (socketToAnswer) {
            socket.to(socketToAnswer.socketId).emit('answerResponse', offerToUpdate);
            ackFunction(offerToUpdate.offerIceCandidates);
        }
    });

    socket.on('sendIceCandidateToSignalingServer', (iceCandidateObj) => {
        const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;
        let offerInOffers;
        let socketToSendTo;
        
        if (didIOffer) {
            offerInOffers = offers.find(o => o.offererUserName === iceUserName);
            if (offerInOffers) {
                offerInOffers.offerIceCandidates.push(iceCandidate);
                if (offerInOffers.answererUserName) {
                    socketToSendTo = connectedSockets.find(s => s.userName === offerInOffers.answererUserName);
                }
            }
        } else {
            offerInOffers = offers.find(o => o.answererUserName === iceUserName);
            if (offerInOffers) {
                socketToSendTo = connectedSockets.find(s => s.userName === offerInOffers.offererUserName);
            }
        }
        
        if (socketToSendTo) {
            socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        const index = connectedSockets.findIndex(s => s.socketId === socket.id);
        if (index !== -1) connectedSockets.splice(index, 1);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
