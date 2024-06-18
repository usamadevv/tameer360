

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Skills = new Schema({
   
   
    name: {
        type: String,
        
    }
    ,
 
    
});






const Skillsd = mongoose.model('Skills', Skills);
module.exports =Skillsd
  
