const Mongoose=require('mongoose')

const userSchema=Mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    verifyOtp:{
        type:String,
        default:'',
    },
    verifyOtpExpirAt:{
        type:Number,
        default:0,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    resetotp:{
        type:String,
        default:'',
    },
    resetOtpExpireAt:{
        type:Number,
        default:0,
    },
  
})

const User=Mongoose.model("User" ,userSchema);

module.exports=User ;