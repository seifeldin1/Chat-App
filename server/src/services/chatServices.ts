import ChatRepository from '../repositories/chatRepository';
import { IMessage } from '../models/messageModel';

class ChatService{
    async sendMessage(sender: string, receiver: string, message: string): Promise<IMessage> {
        return await ChatRepository.saveMessage(sender, receiver, message);
    }

    async getMessages(conversationId: string): Promise<IMessage[]> {
        return await ChatRepository.getMessages(conversationId);
    }
}

export default new ChatService()