import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    favourites:[
    {
        type:mongoose.Types.ObjectId,
        ref:'podcastModel'
    }
    ]
},{timestamps:true}
)

export default mongoose.model('userModel',userSchema);