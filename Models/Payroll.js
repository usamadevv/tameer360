

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Payrolldata = new Schema({


    companyid: {
        type: String,

    }
    ,
    date: {
        type: String,

    }
    ,
    createdon: {
        type: String,

    }
    ,
    status: {
        type: String,

    },
    by: {
        type: String,

    },
    
    projects: [{

        projectid: {
            type: String
        },

        projectname: {
            type: String
        },
}],
data: [{

    Client: {
        type: String
    },

    Date: {
        type: String
    },
    Employee: {
        type: String
    },
    Hrs: {
        type: Number
    },
    OT_Pay_rate: {
        type: Number
    },

    Ot_Hrs: {
        type: Number
    },

    Payrate: {
        type: Number
    },

    Taxes: {
        type: String
    },

    cpr: {
        type: Number
    },

    cprapply: {
        type: String
    },
    deductions: {
        type: Number
    },

    days: {
        type: Number
    },distance: {
        type: Number
    },

    nc_4: {
        type: String
    },
    net: {
        type: Number
    },

    perdiem: {
        type: Number
    },perdiemel: {
        type: String
    },

    onperdiemel: {
        type: String
    },
    onperdiem: {
        type: Number
    },
    siteid: {
        type: String
    },
    skill: {
        type: String
    },
    total: {
        type: String
    },
    userid: {
        type: String
    },

}],


});






const Payroll = mongoose.model('Payrolldata', Payrolldata);
module.exports = Payroll

