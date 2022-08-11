import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = new mongoose.model('user',userSchema);
export default ({User});