// Importing important Projects
const express = require('express');
const app = express();
const Projectroute = express.Router();
let Project = require('../Models/Project');
var nodemailer = require('nodemailer');



Projectroute.route('/update').post(function(req, res) {
    Project.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            Projectname:req.body.Projectname,
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

                    res.status(200).json({'Project':success});
                }
                
             }
         }
    
      
    )
    

    
});

Projectroute.route('/add').post(function(req, res) {

    let Projects = new Project(req.body);
    Projects.save()
        .then(Project => {
            res.status(200).json({'Project': 'Project added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Projectroute.route('/getall').get(function(req, res) {

    Project.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Project':success});
                }
                
             }
         }
    
      
    )
});


Projectroute.route('/find').post(function(req, res) {
    Project.find(
        { Project_id:req.body.Project_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Project':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Projectroute;
