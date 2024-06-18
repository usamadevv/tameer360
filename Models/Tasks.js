

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskmodel = new Schema({


    name: {
        type: String,

    },
    status: {
        type: String,

    },
    description:{
        type:Number,
    },
    clientid:{
        type:String,
    },
    clientname:{
        type:String,
    },
    
  

});






const Tasks = mongoose.model('taskmodel', taskmodel);
module.exports = Tasks

