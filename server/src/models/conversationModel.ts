import mongoose, { Document, Schema, Types } from "mongoose";

interface IConversation extends Document {
    firstUser: Types.ObjectId;
    secondUser: Types.ObjectId;
    lastMessage: Types.ObjectId;
    createdAt: Date;
    lastUpdatedAt: Date;
}

const conversationSchema = new Schema<IConversation>({
    firstUser: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    secondUser: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    createdAt: { type: Date, default: () => new Date() },
    lastUpdatedAt: { type: Date, default: () => new Date() },
});

const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);
export default Conversation;
export { IConversation };
