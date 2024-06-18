// Importing important Payrolls
const express = require('express');
const app = express();
const Payrollroute = express.Router();
let Payroll = require('../Models/Payroll');
var nodemailer = require('nodemailer');
const authenticate = require('../middleWare.js/Authenticate');



Payrollroute.route('/update2').post(function(req, res) {
    console.log(req.body.weekno)
    Payroll.findOneAndUpdate(
        { _id:req.body._id,'invoicedata.weekno': req.body.weekno, // Specify the condition to match the element within the array
        'invoicedata.year': req.body.year}, 

        {
            
            $set:{
            
                "invoicedata.$.date":req.body.date,
                "invoicedata.$.no":req.body.no,
                "invoicedata.$.due":req.body.due,
                "invoicedata.$.total":req.body.total,
                "invoicedata.$.paid":req.body.paid,
                "invoicedata.$.balance":req.body.balance,
                "invoicedata.$.invoicedetails":req.body.data,  
                "invoicedata.$.status":req.body.status,  
                "invoicedata.$.pdapplied":req.body.perdiemapplied,  
                "invoicedata.$.weekno":req.body.weekno,
                "invoicedata.$.year":req.body.year,
                "invoicedata.$.filename":req.body.filename,
            
        } 
    

        },
       function (error, success) {
             if (error) {
                console.log(error)
             } else {
                if(!success){
console.log('Invoice added')
                    Payroll.findOneAndUpdate(
                        { _id:req.body._id}, 
                
                        {$push:{
                            invoicedata:{
                            
                                date:req.body.date,
                                no:req.body.no,
                                due:req.body.due,
                                total:req.body.total,
                                paid:req.body.paid,
                                balance:req.body.balance,
                                invoicedetails:req.body.data,  
                                status:req.body.status,  
                                pdapplied:req.body.perdiemapplied,  
                                reporttype:req.body.reporttype,  
                                weekno:req.body.weekno,
                                year:req.body.year,
                                filename:req.body.filename
                            }   
                        } 
                
                        },
                    
                       function (error2, success2) {
                             if (error2) {
                                res.send('error2')
                             } else {
                                if(!success2){
                
                                    res.send('invalid')
                                }
                                else{
                
                                    res.status(200).json({'Payroll':success2});
                                }
                                
                             }
                         }
                    
                      
                    )







                    
                }
                else{
                    console.log('Invoice updated')
                    res.status(200).json({'Payroll':'updated'});
                }
                
             }
         }
    
      
    )
  
    

    
});

Payrollroute.route('/update').post(function(req, res) {
    console.log(req.body)
    Payroll.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            invoicedata:{
            
                date:req.body.date,
                no:req.body.no,
                due:req.body.due,
                total:req.body.total,
                paid:req.body.paid,
                balance:req.body.balance,
                invoicedetails:req.body.data,  
                status:req.body.status,  
                pdapplied:req.body.perdiemapplied,  
                reporttype:req.body.reporttype,  
                weekno:req.body.weekno,
                year:req.body.year,
                filename:req.body.filename,

                by:req.body.by,
                created:req.body.created,

            }   
        } 

        },
    
       function (error2, success2) {
             if (error2) {
                res.send('error2')
             } else {
                if(!success2){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success2});
                }
                
             }
         }
    
      
    )

  
    

    
});

Payrollroute.route('/updatedata').post(function(req, res) {
    console.log(req.body)
    Payroll.findOneAndUpdate(
        { _id:req.body._id}, 

       
       {
        
        username:req.body.username,
        address:req.body.address,
        number:req.body.number,
        terms:req.body.terms,
        markup:req.body.markup,
        status:req.body.status,

        depts:req.body.depts,

        weekend:req.body.weekend,        
       }
        ,
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/updatestatus').post(authenticate, function(req, res) {
    console.log(req.body)
    Payroll.findOneAndUpdate(
        { _id:req.body._id}, 

       
       {
        
       status:req.body.status       
       }
        ,
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/updatefunds').post(function(req, res) {
    Payroll.findOneAndUpdate(
        { _id:req.body.id,'invoicedata._id':req.body.subid}, 

        

            { $set: { 
                
                "invoicedata.$.paid": req.body.paid,
                "invoicedata.$.balance": req.body.balance,
                "invoicedata.$.total": req.body.total,
                "invoicedata.$.status": req.body.status,
            
            } }

            
        ,
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/add').post(authenticate, function(req, res) {

    let Payrolls = new Payroll(req.body);
    Payrolls.save()
        .then(Payroll => {
            res.status(200).json({'Payroll': 'Payroll added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Payrollroute.route('/getall').get(authenticate, function(req, res) {

    Payroll.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
});
Payrollroute.route('/inactive').get(function(req, res) {

    Payroll.find(
        { status:'Inactive'}, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
});

Payrollroute.route('/active').get(function(req, res) {

    Payroll.find(
        { status:'Active'}, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
});


Payrollroute.route('/find').post(function(req, res) {
    console.log(req.body)
    Payroll.find(
        { _id:req.body.Payroll_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/findbyid').post(function(req, res) {
    Payroll.find(
        { _id:req.body.Payroll_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});


Payrollroute.route('/findbyname').post(function(req, res) {
    Payroll.find(
        { username:req.body.name}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/findbyemail').post(function(req, res) {
    Payroll.find(
        { email:req.body.email}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});

Payrollroute.route('/delete').post(function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Payroll.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});


Payrollroute.route('/deletedata').post(function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Payroll.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Payroll':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Payrollroute;
