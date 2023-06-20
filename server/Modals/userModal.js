import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},
{ timestamps : true } 
);

const userModal = mongoose.model("Users", userSchema);
export default userModal;
