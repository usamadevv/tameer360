

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
   
   
    note: {
        type: String,
        
    }
    ,
    
    recieverid:{
        type:String,
    },
    senderid:{
        type:String,
    },
    reciever:{
        type:String,
    },
    sender:{
        type:String
    }
    ,
    time:{
        type:String
    },
    date:{
        type:String
    },
    seen: {
        type: String
    },

    hidepart: {
        type: Array
    },
    
});






const Notemodel = mongoose.model('Note', Note);
module.exports =Notemodel
  
