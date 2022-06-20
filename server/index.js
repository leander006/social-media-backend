const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {protect} = require('./middleware/authMiddleware')
const chatRoute = require("./routes/chatRoute")
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
// const conversationRoute = require('./routes/conversation');
// const messageRoute = require('./routes/message');

const app = express();

const cors = require('cors')

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute) ;

app.use("/api/user",userRoute) ;
app.use("/api/chat",chatRoute)
// app.use("/api/offer",OfferRoute)

// app.use("/api/enroll",enrollmentRoute)

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})
app.listen(process.env.PORT || 3001,()=>{
      console.log(`Backend runnig on port ${process.env.PORT}`);
})