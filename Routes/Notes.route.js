// Importing important Notess
const express = require('express');
const app = express();
const Noteroute = express.Router();
let Notes = require('../Models/Notes');
var nodemailer = require('nodemailer');
const authenticate = require('../middleWare.js/Authenticate');



Noteroute.route('/update').post(function(req, res) {
    Notes.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            Notesname:req.body.Notesname,
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

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});


Noteroute.route('/hidefrom').post(function(req, res) {
    console.log(req.body)
    Notes.updateMany(
        { _id:{ $in: req.body.id }}, 
        {
            $push: {
                hidepart:  req.body.from
            }
        },
        { new: true },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    console.log(success)

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});
Noteroute.route('/hideallfrom').post(function(req, res) {


    console.log(req.body)


    Notes.updateMany(
        {$or:[ {senderid:{ $in: req.body.ids },
            recieverid:req.body.from},
            {senderid:req.body.from ,
              recieverid:{ $in: req.body.ids }}]}, 
        {
            $push: {
                hidepart:  req.body.from
            }
        },
        { new: true },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    console.log(success)

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});


Noteroute.route('/delete').post(authenticate, function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Notes.findByIdAndDelete(
        { _id:req.body._id}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});
Noteroute.route('/updatestatus').post(function(req, res) {
    Notes.findByIdAndUpdate(
        { _id:req.body.id},


        {
            status:req.body.status



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});

Noteroute.route('/add').post(authenticate, function(req, res) {
console.log(req.body)
    let Notess = new Notes(req.body);
    Notess.save()
        .then(Notes => {
            res.status(200).json({'Notes': 'Notes added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Noteroute.route('/getall').get(authenticate, function(req, res) {

    Notes.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
});

Noteroute.route('/find').post(function(req, res) {
  console.log(req.body)
Notes.find(
    {$or:[ {senderid:req.body.senderid ,
      recieverid:req.body.recieverid},
      {senderid:req.body.recieverid ,
        recieverid:req.body.senderid}]}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    console.log(success)

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});


Noteroute.route('/finduserdata').post(function(req, res) {
    Notes.find(
        { reciever:req.body.reciever}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});

Noteroute.route('/finduserdatabyid').post(function(req, res) {
    Notes.find(
        { recieverid:req.body.recieverid}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Notes':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Noteroute;
