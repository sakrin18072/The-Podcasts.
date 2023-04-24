import mongoose from "mongoose";

const episodeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    episode:{
        type:String,
        required:true
    }
})
export default mongoose.model('episodeModel',episodeSchema);