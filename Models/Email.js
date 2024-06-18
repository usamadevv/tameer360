

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Emailpass = new Schema({
   
   
    email: {
        type: String,

    },
    pass: {
        type: String,

    },
  
    
});




Emailpass.statics.updateOrCreate = async function (email, pass) {
    let doc = await this.findOne();
    if (!doc) {
        // If no document exists, create one
        return this.create({ email, pass });
    } else {
        // If a document exists, update it
        doc.email = email;
        doc.pass = pass;
        return doc.save();
    }
};

const Email = mongoose.model('Emailpass', Emailpass);
module.exports =Email
  