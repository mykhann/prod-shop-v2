import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
  },
  address: {
    type:String

  },
  phoneNo:{
    type:String
  },
  token:{
    type:String
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},{timestamps:true});




export const User = mongoose.model('User', userSchema);
