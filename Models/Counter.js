

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Counter = new Schema({
   
   
    Counter: {
        type: Number,

    }
    
});






const Countercontrol = mongoose.model('Counter', Counter);
module.exports =Countercontrol
  
