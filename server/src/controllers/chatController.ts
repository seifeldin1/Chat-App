import { Server, Socket } from 'socket.io';
import ChatService from '../services/chatServices';

const chatController = (io:Server)=>{
    io.on('connection' , (socket : Socket)=>{

        console.log(`User with socket id of ${socket.id} is connected`)

        //send message
        socket.on('sendMessage' , async({sender , receiver , message})=>{
            const newMessage = await ChatService.sendMessage(sender , receiver , message)
            io.emit('receiveMessage' , newMessage)
        })

        //get messages 
        socket.on('getMessages' , async({conversationId})=>{
            const messages = await ChatService.getMessages(conversationId)
            io.emit('messageList' , messages)
        })

        socket.on('disconnect' , ()=>{
            console.log('User disconnected')
        })
    })
}


export default chatController;
