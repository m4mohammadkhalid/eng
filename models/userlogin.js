const mongoose = require('mongoose');

const userlogin = new mongoose.Schema({
    name: {
      type:String,
      required:true
    }, 
    email:{
      type:String,
      required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
  });



exports.User = mongoose.model('User', userlogin);