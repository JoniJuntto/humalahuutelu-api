"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    }
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
