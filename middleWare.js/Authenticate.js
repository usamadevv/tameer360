// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const conditions = [
  
 '/api/admin/add',
 '/api/admin/update',
 '/api/admin/getall',
 '/api/admin/deletedata',
 '/api/admin/addchat',
 '/api/admin/viewed',
 '/api/admin/adduser',

 '/api/email/getall',
 '/api/email/add',
 '/api/email/updatetime',

 '/api/att/time',
 '/api/timesheet/getall',
 '/api/timesheet/add',

 '/api/siteatt/findbydate',
 '/api/siteatt/findbydateandproject',
 '/api/siteatt/fromto',

 '/api/client/active',
 '/api/client/add',
 '/api/client/inactive',
 '/api/client/updatedata',
 '/api/client/getall',
 '/api/client/updatefund',
 '/api/client/add', 
 '/api/client/deletedata',
 '/api/client/udpate',
 '/api/client/findbyid',
 '/api/client/sendinvoice',
 '/api/client/findbyid',

 '/api/siteuser/find',
 '/api/siteuser/active',
 '/api/siteuser/update',
 '/api/siteuser/add',
 '/api/siteuser/delete',
 '/api/siteuser/deletedata',
 '/api/siteuser/updatetravel',
 '/api/siteuser/updatetravelmiles',
 '/api/siteuser/originalphoto',
 '/api/siteuser/updatebulk',
 '/api/siteuser/updateuserhours',
 '/api/siteuser/adduserhours',
 '/api/siteuser/updatecpr',
 '/api/siteuser/getdistance',
 '/api/siteuser/travel',
 '/api/siteuser/updatesite',
 '/api/siteuser/findimg',
 '/api/siteuser/getall',
 '/api/siteuser/addchat',
 '/api/siteuser/adduser',


 '/api/siteatt/findbydate',

 '/api/skills/getall',
 '/api/skills/add',
 '/api/skills/delete',


 '/api/note/getall',
 '/api/note/add',
 '/api/note/delete',
 '/api/note/find',
 
 '/api/jobsite/getall',
 '/api/jobsite/updatesite',
 '/api/jobsite/add',
 '/api/jobsite/updatepayratetype',
 '/api/jobsite/delete',
 '/api/jobsite/adduser',


 '/api/payroll/add',
 '/api/payroll/getall',
 '/api/payroll/updatestatus',

 '/api/task/add',
 '/api/task/getall',
 '/api/task/delete',


 '/api/leave/getall',
 '/api/leave/add',
 '/api/leave/updatestatus',



];
function authenticate(req, res, next) {
    var endPoint= req.originalUrl
    console.log(req.originalUrl)
    const token = req.header('Authorization');
    console.log(token)

    if (!token) {

        if(endPoint==='/api/admin/getuser'&&req.body.email.length>100||endPoint==='/api/admin/login2'&&req.body.email.length>100){
           
                try {
                    var t=process.env.JWT_SECRET

            console.log(req.originalUrl)
             const decoded = jwt.verify(req.body.email, t);
                req.body.email = decoded.user.email;
                console.log('Verified and email updated')
                console.log(req.body.email)
                next();
                  
                 
                } catch (error) {
                    console.log(error)
                    
                    res.status(401).json({ Admin:'error' })
               
                }
          


        }
        else{
            next();
        }
     
    }
else{
    try {
        var t=process.env.JWT_SECRET

        console.log(req.originalUrl)
         const decoded = jwt.verify(token, t);
        if(conditions.includes(endPoint)){
            console.log('Verified')
            next();
        }
        else{
            console.log(decoded)
            req.body.email = decoded.user.email;
            console.log('Verified and email updated')
            next();
        }
      
      
     
    } catch (error) {
        console.log(error)
        next();
       // res.status(401).json({ message: 'Invalid token' });
    }
}
    
}

module.exports = authenticate;