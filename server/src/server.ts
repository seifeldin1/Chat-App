import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database';
import chatController from './controllers/chatController';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "*", // Allow any origin to connect (for testing purposes)
    },
});

app.use(express.json());

app.use("/api/users", userRoutes);
connectDB();

// Initialize chat controller with Socket.io instance
chatController(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});
