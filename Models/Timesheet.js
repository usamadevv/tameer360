

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Timesheetdata = new Schema({


    companyid: {
        type: String,

    }
    ,
    filename: {
        type: String,

    }
    ,
    clientname: {
        type: String,

    }
    ,
    Weekend: {
        type: String,

    }
    ,
    createdon: {
        type: String,

    },
   
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
Data: [{

    clientid: {
        type: String
    },
    clientname: {
        type: String
    },

    Weekend: {
        type: String
    },
  
      
        hrs: [{
            date: {
                type: String
            },
        time:{
            type: Array
        },
        
        }
        ],
    


    userid: {
        type: String
    },


    username: {
        type: String
    },
    total: {
        type: String
    },


    days: {
        type: Number
    },

}],


});






const Timesheet = mongoose.model('Timesheetdata', Timesheetdata);
module.exports = Timesheet

