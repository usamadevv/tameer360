

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
   
    title: {
        type: String,
        
    }
    ,
    
    last: {
        type: String
    }
    ,
    tasks:[{
        type:String,
    }],
    teams:[{
        type:String
    }]
    ,
    
    progress:{
        type:String
    }
    ,
    assigndate:{
        type:String
    }
    ,
    
    status: {
        type: String
    },

},{
    timestamps:true
});






const project = mongoose.model('Project', Project);
module.exports =project
  
