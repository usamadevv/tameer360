

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sueprvisor = new Schema({
    contacts:[{
        userid:{
            type:String,
      
        }, 
        msg:{
            type:String,
         
        }, 
        unseen:{
            type:Number,
         
        },  usertype:{
            type:String,
        
        },timestamp: {
            type: Date,
            default: Date.now, // Set to the current date and time by default
        }
    
       }],
   
    name: {
        type: String,
        
    }
    ,
    notification:{
        type:String,
     
    }, 
   
    imgurl: {
        type: String,
        
    }
    ,

    siteid:{
        type:String,
    },
    sitename:{
        type:String
    }
    ,
    phone: {
        type: String
    },
    
    address: {
        type: String
    },
    status: {
        type: String
    },
    
    pass: {
        type: String
    },

    email: {
        type: String
    },
    
});






const Super = mongoose.model('Sueprvisor', Sueprvisor);
module.exports =Super
  
