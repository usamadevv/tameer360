

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Formdatas = new Schema({
   
   name:{
    type:String
   },

 ssn:{
    type:String
   },
   dob:{
    type:String
   },
   address:{
    type:String
   },
   city:{
    type:String
   },
   zip:{
    type:String
   },
   email:{
    type:String
   },
   phone:{
    type:String
   },
   uscitizen:{
    type:String
   },
   authorised:{
    type:String
   },
   mb:{
    type:String
   },
   convicted:{
    type:String
   },
   holder:{
    type:String
   },
   bank:{
    type:String
   }, city:{
    type:String
   },
   state:{
    type:String
   },
   routing:{
    type:String
   },
   account:{
    type:String
   }, type:{
    type:String
   },
   whistory: [{
    employer: {
        type: String
    },
    address: {
        type: String
    },  employer: {
        type: String
    },
    phone: {
        type: String
    },  from: {
        type: String
    },
    to: {
        type: String
    }, start: {
        type: String
    },
    last: {
        type: String
    }, job: {
        type: String
    },
    reason: {
        type: String
    },

}],
   



});






const Formdat = mongoose.model('Formdata', Formdatas);
module.exports =Formdat
  
