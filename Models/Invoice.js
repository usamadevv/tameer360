

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let invoicemodel = new Schema({


    clientname: {
        type: String,

    },
    
    clientid: {
        type: String,

    },
    
    sitename: {
        type: String,

    },
    no: {
        type: String,

    },
address: {
        type: String,

    },
    
    markup: {
        type: String,

    },
    status:{
        type:String
    },


    latlang: {
        type: String,
        
    }
    ,
    bank:{
        type:String
    },

    perdiemamt:{

        type: String
    },

    onperdiemamt:{

        type: String
    },
    task: [{
        name: {
            type: String
        },
        description: {
            type: String
        },

    }],
    user: [{
        name: {
            type: String
        },
        userid: {
            type: String
        },
        payrate: {
            type: String
        },
        otpayrate: {
            type: String
        },
        skill: {
            type: String
        },
        empno: {
            type: String
        },
        latlang: {
            type: String
        },

        taxes: {
            type: String,
        },
        nc: {
            type: String
        },
        perdiem:{

            type: String
        },

        onperdiem:{

            type: String
        },

        distance:{

            type: String
        },

        food:{

            type: String
        },

    }],




});






const Invoice = mongoose.model('invoicemodel', invoicemodel);
module.exports = Invoice

