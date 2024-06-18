// Importing important Siteatts
const express = require('express');
const app = express();
const Siteattroute = express.Router();
let Siteatt = require('../Models/siteatt');
var nodemailer = require('nodemailer');
const date = require('date-and-time');
const SiteUserd = require('../Models/Siteuser');
const authenticate = require('../middleWare.js/Authenticate');



Siteattroute.route('/update').post(function(req, res) {
    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updatetask').post(function(req, res) {
    const siteAttId = req.body._id;

    // First, update the tasks with end:'-'
    Siteatt.updateOne(
        { _id: siteAttId, 'tasks.end': '-' },
        { 
            
            
            $set: { 
                
                
                'tasks.$.end': req.body.end,
                task:req.body.task
            
            } },
        function (error, updateResult) {
            if (error) {
                console.error(error);
                res.send('error');
            } else {
                // Second, push the new object
                Siteatt.findByIdAndUpdate(
                    siteAttId,
                    {
                        $push: {
                            tasks: {
                    taskno:req.body.taskno,
                    start:req.body.start,
                    end:'-',
                    task:req.body.task
                }
                        }
                    },
                    { new: true },
                    function (error, success) {
                        if (error) {
                            console.error(error);
                            res.send('error');
                        } else {
                            if (!success) {
                                
                            console.error('invalied');
                                res.send('invalid');
                            } else {
                                console.error('invalieds');
                                res.status(200).json({ 'Siteatt': success });
                            }
                        }
                    }
                );
            }
        }
    );
});


Siteattroute.route('/updateptime').post(function(req, res) {
    Siteatt.findOneAndUpdate(
        { userid:req.body.user_id,
            date:req.body.date
            }, 
        {
            
            $inc:{
                workingtime:1}



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updateitime').post(function(req, res) {
    Siteatt.findOneAndUpdate(
        { userid:req.body.user_id,
        date:req.body.date
        }, 

        {
            
            $inc:{
                Idletime:1}



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/updatetime').post(authenticate, function(req, res) {

    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,
workinghours:req.body.wh


        },
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updatetimelat').post(function(req, res) {

    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,
workinghours:req.body.wh,
wages:req.body.wages


        },
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/add').post(function(req, res) {

    let Siteatts = new Siteatt(req.body);

    Siteatts.save()
        .then(Siteatt => {

            
              SiteUserd.findOneAndUpdate(
        { _id:req.body.userid},
        {supersite:req.body.projectid,

        } ,
    
       function (error2, success2) {
             if (error2) {
                res.send('error')
             } else {
                if(!success2){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt': 'Siteatt added successfully'});
                
                }
                
             }
         }
    
      
    )

            
            
        })
        .catch(err => {
            console.log(err)
          console.log("erer")


        });
});


Siteattroute.route('/getall').get( authenticate, function(req, res) {

    Siteatt.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
});




Siteattroute.route('/find').post(function(req, res) {
    Siteatt.find(
        { Siteatt_id:req.body.Siteatt_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydateandname').post(function(req, res) {
    Siteatt.find(
        { date:req.body.date,
        userid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydateandchk').post(function(req, res) {
    console.log(req)
    Siteatt.find(
        { date:req.body.date,
        userid:req.body.id,
        chkouttime:req.body.chkouttime
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydate').post( authenticate, function(req, res) {
    console.log(req)
    Siteatt.find(
        { date:req.body.date,
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteattroute.route('/findbydateandleave').post(function(req, res) {
    console.log(req.body.date+'k')
    Siteatt.find(
        { date:req.body.date,
            status:'Leave'
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    console.log(success)

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/findbydateandproject').post( authenticate, function(req, res) {
    console.log(req.body.date)
    Siteatt.find(
        { date:req.body.date,
        projectid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbyname').post(function(req, res) {
    Siteatt.find(
        { 
        userid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbynameandproject').post(function(req, res) {
    Siteatt.find(
        { 
        userid:req.body.id,
        projectid:req.body.pid,
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/finduserdata').post(function(req, res) {
    Siteatt.find(
        { userid:req.body.userid}).sort({createdAt: -1}).exec(
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/findcatt').post(function(req, res) {
    Siteatt.find(
        { date:req.body.date},
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/time').get(function(req, res) {
    var datec=new Date()
    var ustime=datec.toLocaleString("en-US", {timeZone: "America/New_York"})
    res.status(200).json({'Date':ustime});
    

    
});

Siteattroute.route('/findbyproject').post(function(req, res) {
    console.log(req.body.date)
    Siteatt.find(
        { 
        projectid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteattroute.route('/fromto').post( authenticate, function(req, res) {
    console.log(req.body)
    const fromDate = new Date(req.body.from);
    const toDate = new Date(req.body.to);
    const selectedJobsites = req.body.selectedjobsites || [];
    const projectIds = selectedJobsites.map(site => site._id);

    Siteatt.find(
        { 
            createdAt: {
                $gte: fromDate,
                $lte: toDate,
              },
              projectid: {
                $in: projectIds,
              },
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteattroute.route('/findbycrew').post(function(req, res) {
    console.log(req.body)
  
    const selectedusers = req.body.id || [];
    const projectIds = selectedusers.map(site => site._id);

    Siteatt.find(
        { 
            
              userid: {
                $in: projectIds,
              },
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteattroute.route('/findcattuser').post(function(req, res) {
    Siteatt.find(
        { date:req.body.date,
        userid:req.body.userid,
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Siteattroute;
