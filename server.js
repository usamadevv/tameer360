


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT =  process.env.PORT || 4001;
const path=require("path");

require('dotenv').config();

const http = require('http');
const {Server} = require('socket.io');


  
app.use(bodyParser.json({limit: '35mb'}));

    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '35mb',
        parameterLimit: 50000,
      }),
    );
const Userroute = require('./Routes/Users.route');
const Attroute = require('./Routes/Att.route');
const Projectroute = require('./Routes/Project.route');
const Leaveroute = require('./Routes/Leave.route');
const Noteroute = require('./Routes/Notes.route');
const Siteroute = require('./Routes/Siteuser.route');
const Jobsiteroute = require('./Routes/Site.route');
const Clientroute = require('./Routes/Client.route');
const Payrollroute = require('./Routes/Payroll.route');
const Skillsroute = require('./Routes/Skills.route');
const Siteattroute = require('./Routes/Siteatt.route');
const Notiroute = require('./Routes/Noti.route');
const Adminroute = require('./Routes/Admin.route');
const Supervisorroute = require('./Routes/Supervisor.route');
const Invoiceroute = require('./Routes/Invoice.route');
const Formroute = require('./Routes/Formdata');

const Taskroute = require('./Routes/Task.route');
const Emailroute = require('./Routes/Email.route');
const Timesheetroute = require('./Routes/Timesheet');
__dirname=path.resolve()
app.use(express.static(path.join(__dirname,'./myapp/build')))
app.use(cors({origin: '*'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
    'mongodb+srv://Usama:myxxx@cluster0.zhkxjsf.mongodb.net/?retryWrites=true&w=majority'
    , { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', async function() {
    console.log("MongoDB database connection established successfully");

    
});





app.use('/api/user', Userroute);
app.use('/api/att', Attroute);
app.use('/api/project', Projectroute);
app.use('/api/leave', Leaveroute);
app.use('/api/note', Noteroute);
app.use('/api/siteuser', Siteroute);
app.use('/api/jobsite', Jobsiteroute);
app.use('/api/client',   Clientroute  );
app.use('/api/skills',   Skillsroute  );
app.use('/api/siteatt',   Siteattroute  );
app.use('/api/noti',  Notiroute  );
app.use('/api/admin',Adminroute  );
app.use('/api/super',Supervisorroute  );
app.use('/api/invoice',Invoiceroute  );
app.use('/api/data',Formroute  );
app.use('/api/payroll',Payrollroute  );
app.use('/api/task',Taskroute  );
app.use('/api/email',Emailroute  );

app.use('/api/timesheet',Timesheetroute  );


const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });
const userRooms = {};

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
var activeConnections = [];
io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  io.to(socket.id).emit('message', socket.id);

  socket.on('login', (userid) => {
    
  activeConnections.push({
    userid:userid.userid,
    id:userid.socketid,
  })
    console.log(`User ${userid} logged in`);
    console.log(activeConnections)
});
socket.on('newmessage', ({activeid,msg,from}) => {
    console.log(activeid)
    console.log(activeConnections)

  var tempconn=activeConnections.find(val=>val.userid===activeid)
if(tempconn){
  io.to(tempconn.id).emit('newmessage',{activeid,msg,from})
}
else{

}
   
});
socket.on('notify', ({to}) => {
  console.log(to)
  console.log(activeConnections)

var tempconn=activeConnections.find(val=>val.userid===to)
if(tempconn){
io.to(tempconn.id).emit('notify',{to})
}
else{

}
 
});
socket.on('disconnect', () => {
 const ft= activeConnections.filter(val=>val.id!==socket.id)
 activeConnections=ft
  console.log('User disconnected');
  console.log(activeConnections)
});
  /*socket.on("room:join", (data) => {
    
    const { email, room,sender } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);

    io.emit("room:callto", data);
  });
  
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("end:call", ({ email }) => {
    io.emit("end:call", { email:email });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });*/

});


app.get('*',(req,res)=>{
    res.sendFile( path.resolve(__dirname,'./myapp','build','index.html'))

})

server.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
