// Importing important Skillsdatas
const express = require('express');
const app = express();
const Skillsroute = express.Router();
let Skillsdata = require('../Models/Skills');
var nodemailer = require('nodemailer');
const authenticate = require('../middleWare.js/Authenticate');



Skillsroute.route('/update').post(function(req, res) {
    Skillsdata.findByIdAndUpdate(
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

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});

Skillsroute.route('/updateptime').post(function(req, res) {
    Skillsdata.findOneAndUpdate(
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

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});

Skillsroute.route('/updateitime').post(function(req, res) {
    Skillsdata.findOneAndUpdate(
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

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});


Skillsroute.route('/updatetime').post(function(req, res) {
    console.log(req)
    Skillsdata.findByIdAndUpdate(
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

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});

Skillsroute.route('/delete').post(authenticate, function(req, res) {
    console.log(req.body)
    Skillsdata.findByIdAndDelete(
        { _id:req.body.id}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdatas':success});
                }
                
             }
         }
    
      
    )
    

    
});
Skillsroute.route('/add').post(authenticate, function(req, res) {

    let Skillsdatas = new Skillsdata(req.body);
    Skillsdatas.save()
        .then(Skillsdata => {
            res.status(200).json({'Skillsdata': 'Skillsdata added successfully'});
            
        })
        .catch(err => {
          console.log("erer")
        });
});


Skillsroute.route('/getall').get(authenticate, function(req, res) {

    Skillsdata.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
});
Skillsroute.route('/getallview').get(authenticate, function(req, res) {

    Skillsdata.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
});




Skillsroute.route('/find').post(function(req, res) {
    Skillsdata.find(
        { Skillsdata_id:req.body.Skillsdata_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});

Skillsroute.route('/finduserdata').post(function(req, res) {
    Skillsdata.find(
        { userid:req.body.userid}).sort({createdAt: -1}).exec(
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});


Skillsroute.route('/findcSkills').post(function(req, res) {
    Skillsdata.find(
        { date:req.body.date},
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});

Skillsroute.route('/findcSkillsuser').post(function(req, res) {
    Skillsdata.find(
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

                    res.status(200).json({'Skillsdata':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Skillsroute;
