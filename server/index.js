const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const chatRoute = require("./routes/chatRoute")
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/commentRoute")
const cookieParser = require('cookie-parser')
const app = express();


const cors = require('cors')


dotenv.config();

app.use(express.json());

app.use(cookieParser())

app.use(cors({
      origin:["http://localhost:3000"],
      credentials:true
}));

app.use("/api/auth",authRoute);

app.use("/api/user",userRoute);

app.use("/api/chat",chatRoute);

app.use("/api/message",messageRoute);

app.use("/api/post",postRoute)

app.use("/api/comment",commentRoute)

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})



const server = app.listen(process.env.PORT || 3001,()=>{
      console.log(`Backend runnig on port ${process.env.PORT}`);
})



//Socket //

const io = require('socket.io')(server,{
      pingTimeout:60000,
      cors:{
            origin:"http://localhost:3000"
      }
});

io.on("connection",(socket) =>{
      console.log("Connect to socket",socket.id);

      socket.on("setup",(userData) =>{
            socket.join(userData._id);
            socket.emit("Connected to room",userData.username);
      })
})


// end //

//suggestion for different people to follower new people
// Story option

// Home page with post of our follwers and ourself

// Exlore page post of all users who's account is public

// Frontend changes in conversation part
//  and in getConversation name part