import mongoose , {Document , Schema} from "mongoose";

interface IUser extends Document {
    username :string, 
    email :string , 
    createdAt : Date 
}

const userScehema = new mongoose.Schema<IUser>({
    username : {type : String , required : true , unique:true},
    email : {type : String , required : true , unique : true },
    createdAt : {type : Date , default: ()=> new Date() }
})

const User = mongoose.model<IUser>('User',userScehema);
export default User
export {IUser} // in case needed this later 

