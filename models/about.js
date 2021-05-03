const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true
    }, 
    description:{
      type:String,
      required:true
    }
    
  });



exports.About = mongoose.model('About', blogSchema);