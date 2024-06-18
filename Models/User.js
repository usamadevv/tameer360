

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Usermod = new Schema({
   
   
    username: {
        type: String,
        
    }
    ,
    chkintime:{
        type:String,
    },
    chkouttime:{
        type:String
    }
    ,
    email: {
        type: String
    },
    
    password: {
        type: String
    },
    status: {
        type: String
    },
    
});






const Userdata = mongoose.model('Usermod', Usermod);
module.exports =Userdata
  
