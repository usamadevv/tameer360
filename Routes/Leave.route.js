// Importing important Leaves
const express = require('express');
const app = express();
const Leaveroute = express.Router();
let Leave = require('../Models/Leave');
var nodemailer = require('nodemailer');
let Siteatt = require('../Models/siteatt');
let Siteuserd = require('../Models/Siteuser');
const authenticate = require('../middleWare.js/Authenticate');
const Email = require('../Models/Email');



Leaveroute.route('/update').post(function(req, res) {
    Leave.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            Leavename:req.body.Leavename,
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

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
    

    
});

Leaveroute.route('/updatestatus').post(authenticate, function(req, res) {
    function getDatesInRange(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const datesArray = [];
      
        // Iterate through the dates and add them to the array
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
          const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
          datesArray.push(formattedDate);
        }
      
        return datesArray;
      }
      
   
      const result = getDatesInRange(req.body.id.date, req.body.id.to?req.body.id.to:req.body.id.to);
   
     



    Leave.findByIdAndUpdate(
        { _id:req.body.id._id},


        {
            status:req.body.status,
            remarks:req.body.status==='Declined'?`Declined by ${req.body.user}`:`Approved by ${req.body.user}`



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
if(req.body.status==='Approved'){
    console.log(result);
    const savePromises = result.map(datea => {
        const Attdate = { date: datea,time:'00:00:00',chkouttime:'00:00:00',user:req.body.id.username,
        duration:`${req.body.id.date} - ${req.body.id.to}`,
    userid:req.body.id.sender,empno:'',projectid:'-',projectname:'-',workinghours:'-',late:'-',status:'Leave',tasks:[],
    }; // Use spread operator to copy req.body and update the date
        const Siteat = new Siteatt(Attdate);
        return Siteat.save();
    });
 // Wait for all Promises to resolve
Promise.all(savePromises)
.then(() => {
res.status(200).json({ 'Leave': 'Leaves added successfully' });
})
.catch(err => {
console.error(err);
res.status(500).json({ 'error': 'Internal Server Error' });
});
}
else{

    res.status(200).json({'Leave':success});
}
                   

                }
                
             }
         }
    
      
    )
    

    
});

Leaveroute.route('/add').post(authenticate, function(req, res) {

    let Leaves = new Leave(req.body);
    Leaves.save()
        .then(Leave => {


            Siteuserd.findByIdAndUpdate(
                { _id:req.body.recid}, 
        
                {
                    notification:'true',
                  
                  
                },
            
               function (error, success2) {
                     if (error) {
                        res.send('error')
                     } else {
                        if(!success2){
        
                            res.send('invalid')
                        }
                        else{


                            Email.findOne(
                                { }, 
                            
                               
                            
                               function (errorx, result) {
                                     if (errorx) {
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
                                                from: `${req.body.username} requested for leave`, // sender address
                                                to: req.body.email, // list of receivers
                                                subject: `New leave request from ${req.body.username} `, // Subject line
                                                html: `<h4>Approve or decline request from the app</h4>
                                                <br />
                                                <p>Duration:  ${req.body.date}  -   ${req.body.to}</p>
                                                `// plain text body
                                            };
                                                 
                                            transporter.sendMail(mailOptions, function (err, info) {
                                                if(err){
                                                    console.log(err)
                                                        res.status(200).json({'Siteuserd':'fail'});}
                                                else{
                                                    console.log(info);
                                                    
                                            res.status(200).json({'Siteuserd':'emailok'});}
                                            })
                            
                                            res.status(200).json({'Leave': 'Leave added successfully'});
                                            console.log(result)
                            
                                        }
                                        
                                     }
                                 }
                            
                              
                            )


                           
                        }
                        
                     }
                 }
            
              
            )
        
        })
        .catch(err => {
          console.log("erer")
        });
});


Leaveroute.route('/getall').get(authenticate, function(req, res) {

    Leave.find(
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


Leaveroute.route('/super').post(function(req, res) {
    Leave.find(
        { recid:req.body.recid}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                    
                    Siteuserd.findByIdAndUpdate(
                        { _id:req.body.recid}, 
                
                        {
                            notification:'false',
                          
                          
                        },
                    
                       function (error, success2) {
                             if (error) {
                                res.send('error')
                             } else {
                                if(!success2){
                
                                    res.send('invalid')
                                }
                                else{
                                    console.log(success)
                                  
                    res.status(200).json({'Leave':success});
                                }
                                
                             }
                         }
                    
                      
                    )
                

                }
                
             }
         }
    
      
    )
    

    
});



Leaveroute.route('/finduserdata').post(function(req, res) {
    Leave.find(
        { sender:req.body.sender}, 
    
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











module.exports = Leaveroute;
