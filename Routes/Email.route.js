// Importing important Nots
const express = require('express');
const app = express();
const Emailroute = express.Router();
let Not = require('../Models/Not');
let Email = require('../Models/Email');
var nodemailer = require('nodemailer');
const date = require('date-and-time');
const authenticate = require('../middleWare.js/Authenticate');


Emailroute.route('/update').post(function(req, res) {
    Email.findByIdAndUpdate(
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

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Emailroute.route('/add').post(async function(req, res) {
    console.log(req.body);

    try {
        // Delete all existing documents
        await Email.deleteMany({});

        // Create a new document
        let newEmail = new Email(req.body);
        await newEmail.save();

        res.status(200).json({ 'Email': 'Email added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': 'An error occurred while adding the email' });
    }
});

Emailroute.route('/getall').get( authenticate, function(req, res) {

    Email.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
});






Emailroute.route('/find').post(function(req, res) {
    Not.find(
        { email:req.body.email}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});












module.exports = Emailroute;
