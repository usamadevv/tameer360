

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Leave = new Schema({
   
   
    leave: {
        type: String,
        
    }
    ,
    leavetype: {
        type: String,
        
    }
    ,
    username:{
        type:String,
    },
    date:{
        type:String
    },
    to:{
        type:String,
    },
    status: {
        type: String
    },
    sender:{
        type:String
    }
    ,
    remarks:{
        type:String
    }
    ,
    rec:{
        type:String
    },
    recid:{
        type:String
    }
    
});






const Leavemodel = mongoose.model('Leave', Leave);
module.exports =Leavemodel
  
