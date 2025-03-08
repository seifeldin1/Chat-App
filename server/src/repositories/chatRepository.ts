import mongoose, { Types } from 'mongoose';
import Message, { IMessage } from '../models/messageModel';
import Conversation, { IConversation } from '../models/conversationModel';

class ChatRepository {
    // Save a new message and update conversation
    async saveMessage(sender: string, receiver: string, message: string): Promise<IMessage> {
        const senderId = new Types.ObjectId(sender);
        const receiverId = new Types.ObjectId(receiver);

        // Find an existing conversation
        let conversation = await Conversation.findOne({
            $or: [
                { firstUser: senderId, secondUser: receiverId },
                { firstUser: receiverId, secondUser: senderId },
            ],
        });

        if (!conversation) {
            conversation = new Conversation({
                firstUser: senderId,
                secondUser: receiverId,
                lastMessage: null, // Initially, no messages
            });
            await conversation.save();
        }

        // Create new message linked to the conversation
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            receiver: receiverId,
            message,
        });

        await newMessage.save(); // Ensuring consistency

        // Update conversation with the last message
        conversation.lastMessage = new Types.ObjectId(newMessage._id.toString())
        conversation.lastUpdatedAt = new Date();
        await conversation.save();

        return newMessage;
    }

    // Retrieve messages of a conversation
    async getMessages(conversationId: string): Promise<IMessage[]> {
        return await Message.find({ conversationId: new Types.ObjectId(conversationId) })
                            .sort({ timestamp: 1 });
    }
}

export default new ChatRepository();
