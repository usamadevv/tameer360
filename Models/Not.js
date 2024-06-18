

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Noti = new Schema({
   
   
    message: {
        type: String,
        
    }
    ,
    time:{
        type:String,
    },
    idp:{
        type:String
    },
    
type:{
        type:String
    }
    
});






const Not = mongoose.model('Noti', Noti);
module.exports =Not
  
