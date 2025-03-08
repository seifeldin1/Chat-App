import mongoose , {Document, Schema, Types} from "mongoose"

interface IMessage extends Document {
    conversationId : Types.ObjectId 
    sender : Types.ObjectId 
    receiver : Types.ObjectId 
    message : string 
    timestamp: Date
}

const messageSchema = new mongoose.Schema<IMessage>({
    conversationId: {type: Schema.Types.ObjectId, ref: 'Conversation'},
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: Schema.Types.ObjectId, ref: 'User'},
    message: {type: String},
    timestamp: {type: Date , default: ()=> new Date() }
})

const Message = mongoose.model<IMessage>('Message', messageSchema)
export default Message
export {IMessage}