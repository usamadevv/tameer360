// Importing important Invoices
const express = require('express');
const app = express();
const Invoiceroute = express.Router();
let Invoice = require('../Models/Invoice');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');

var nodemailer = require('nodemailer');
const Email = require('../Models/Email');




Invoiceroute.route('/saveinvoice').post(function (req, res)  {
    const invoiceHTML = req.body.html;
    const invoiceFilePath =  path.join(__dirname, 'invoices', `${req.body.key}.html`);

    fs.writeFile(invoiceFilePath, invoiceHTML, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save invoice' });
        } else {

            Email.findOne(
                { }, 
            
               
            
               function (error, result) {
                     if (error) {
                        res.send('error')
                     } else {
                        if(!result){
            
                            res.send('invalid')
                        }
                        else{
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: result.email,
                                    pass: result.pass
                                }
                            });
        
                          
                            
                          const mailOptions = {
                from: 'Password Reset', // sender address
                to: req.body.email, // list of receivers
                subject: `You recieved a report`, // Subject line
                html: `<a href='http://thumbffice.com/invoice/${req.body.key}'>View Report</a>`// plain text body
            };
                 
            transporter.sendMail(mailOptions, function (err, info) {
                if(err){
                    console.log(err)
                        res.status(200).json({'Siteuserd':'fail'});}
                else{
                    console.log(info);
                    
            res.status(200).json({'Siteuserd':'emailok'});}
            })
            res.json({ message: 'Invoice saved successfully' });
                            console.log(result)
            
                        }
                        
                     }
                 }
            
              
            )

           
        }
    });
});

Invoiceroute.route('/getinvoicex').post(function (req, res) {
    const htmlFilePath = path.join(__dirname, 'invoices', `${req.body.id}.html`);

    fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read HTML' });
        } else {
            console.log(htmlContent)
            res.send(htmlContent);
        }
    });
});

    

    
Invoiceroute.route('/update').post(function(req, res) {
    Invoice.findByIdAndUpdate(
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

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
    

    
});

Invoiceroute.route('/updateptime').post(function(req, res) {
    Invoice.findOneAndUpdate(
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

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
    

    
});

Invoiceroute.route('/updateitime').post(function(req, res) {
    Invoice.findOneAndUpdate(
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

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
    

    
});


Invoiceroute.route('/updatetime').post(function(req, res) {
    console.log(req)
    Invoice.findByIdAndUpdate(
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

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
    

    
});



Invoiceroute.route('/add').post(function(req, res) {

    let Invoices = new Invoice(req.body);
    Invoices.save()
        .then(Invoice => {
            res.status(200).json({'Invoice': 'Invoice added successfully'});
            
        })
        .catch(err => {
          console.log("erer")
        });
});


Invoiceroute.route('/getall').get(function(req, res) {

    Invoice.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
});




Invoiceroute.route('/find').post(function(req, res) {
    Invoice.find(
        { Invoice_id:req.body.Invoice_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Invoice':success});
                }
                
             }
         }
    
      
    )
    

    
});








module.exports = Invoiceroute;
