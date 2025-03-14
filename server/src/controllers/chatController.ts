import { Server, Socket } from 'socket.io';
import ChatService from '../services/chatServices';

const chatController = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User with socket id of ${socket.id} is connected`);

        // Join conversation
        socket.on('joinConversation', ({ conversationId }) => {
            socket.join(conversationId);
        });

        // Send message to a specific conversation
        socket.on('sendMessage', async ({ conversationId, sender, receiver, message }) => {
            const newMessage = await ChatService.sendMessage(sender, receiver, message);
            io.to(conversationId).emit('receiveMessage', newMessage);
        });

        // Get messages for a conversation
        socket.on('getMessages', async ({ conversationId }) => {
            const messages = await ChatService.getMessages(conversationId);
            io.to(conversationId).emit('messageList', messages);
        });

        // Typing event
        socket.on('typing', ({ conversationId, senderId }) => {
            socket.to(conversationId).emit('typing', senderId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('leaveConversation', ({ conversationId }) => {
            socket.leave(conversationId);
        });
        
    });
};

export default chatController;
