

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Attendence = new Schema({
   
    username: {
        type: String,
        
    }
    ,
    
    userid: {
        type: String
    }
    ,
    chkintime:{
        type:String,
    },
    chkouttime:{
        type:String
    }
    ,
    
    totaltime:{
        type:String
    }
    ,
    currentapp:{
        type:String
    }
    ,
    date:{
        
        type:String,
    },
    day:{
        
        type:String,
    },
    workingtime:{
        type:Number
    }
    ,
    
    Idletime:{
        type:Number
    }
    ,
    
    late:{
        type:String
    }
    ,
    
    status: {
        type: String
    },

},{
    timestamps:true
});






const Attdata = mongoose.model('Attendence', Attendence);
module.exports =Attdata
  
