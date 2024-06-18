// Importing important Taskss
const express = require('express');
const app = express();
const Taskroute = express.Router();
let Tasks = require('../Models/Tasks');
var nodemailer = require('nodemailer');
const authenticate = require('../middleWare.js/Authenticate');


Taskroute.route('/updatesite').post(function(req, res) {
    Tasks.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            clientname: req.body.clientname,
            clientid: req.body.clientid,

            weekend: req.body.weekend,
            radius: req.body.radius,
            sitename: req.body.sitename,
            no: req.body.no,
            address: req.body.address,
            markup: req.body.markup,
            status: req.body.status,
            latlang: req.body.latlang,
            perdiemamt: req.body.perdiemamt,
            onperdiemamt: req.body.onperdiemamt,
            user: req.body.user,
            task:req.body.task

            
           
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});
Taskroute.route('/adduser').post(function(req, res) {
    console.log(req.body)
    Tasks.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            
            user: req.body.user,
        

            
           
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});


Taskroute.route('/updatepayratetype').post(function(req, res) {
    console.log(req.body)
    Tasks.findOneAndUpdate(
        { _id:req.body.id, 'user.userid': req.body.userid },

        { $set: { 'user.$.payratetype': req.body.payratetype } },
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});

Taskroute.route('/update').post(function(req, res) {
    Tasks.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            Tasksname:req.body.Tasksname,
            fullname:req.body.fullname,



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});

Taskroute.route('/add').post(authenticate, function(req, res) {

    let Taskss = new Tasks(req.body);
    Taskss.save()
        .then(Tasks => {
            res.status(200).json({'Tasks': 'Tasks added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Taskroute.route('/adduser').post(function(req, res) {
    Tasks.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            user:{
            
                name:req.body.name,
                userid:req.body.userid,
                payrate:req.body.payrate,
                otpayrate:req.body.otpayrate,
                paid:req.body.paid,
                skill:req.body.skill,
                empno:req.body.empno,  
                taxes:req.body.taxes,  
                nc:req.body.nc,  
            }   
        } 

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});
Taskroute.route('/getall').get(authenticate, function(req, res) {

    Tasks.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
});


Taskroute.route('/findbyclient').post(function(req, res) {
    Tasks.find(
        { clientid:req.body.clientid}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    console.log(req.body)
console.log(success)
                    res.status(200).json({'Tasks':success});

                }
                
             }
         }
    
      
    )
    

    
});


Taskroute.route('/findbycompany').post(function(req, res) {
    Tasks.find(
        { clientid:req.body.clientid}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});



Taskroute.route('/findTasksbyuser').post(function(req, res) {
    Tasks.find(
        {
            user:  { 
                $elemMatch: { userid: req.body.userio } 
             }
        }, 
     
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});


Taskroute.route('/findbyname').post(function(req, res) {
    Tasks.find(
        { clientname:req.body.cname}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});




Taskroute.route('/delete').post(authenticate, function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Tasks.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Tasks':success});
                }
                
             }
         }
    
      
    )
    

    
});








module.exports = Taskroute;
