const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const {protect} = require('./middleware/authMiddleware')

// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/user');
// const conversationRoute = require('./routes/conversation');
// const messageRoute = require('./routes/message');

const app = express();

const cors = require('cors')

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})
app.listen(process.env.PORT || 3001,()=>{
      console.log(`Backend runnig on port ${process.env.PORT}`);
})