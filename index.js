const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chatRoute = require("./routes/chatRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const googleRoute = require("./routes/google-auth");
dotenv.config();
// const cors = require("cors");

const session = require("express-session");

// const cookieParser = require("cookie-parser");
const app = express();

const passport = require("passport");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/auth/google", googleRoute);
app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/message", messageRoute);

app.use("/api/post", postRoute);

app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to server of Talkology");
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Backend runnig on port ${process.env.PORT}`);
});

//Socket //

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000/",
  },
});

io.on("connection", (socket) => {
  console.log("Connect to socket", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join room", (room) => {
    socket.join(room);
    // console.log("User joined room",room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (messageRecieved) => {
    var chat = messageRecieved.chat;
    if (!chat.users) return console.log("Users are undefined");
    chat.users.forEach((user) => {
      if (user._id == messageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", messageRecieved);
    });
  });

  socket.on("new message delete", (message) => {
    var chat = message.chat;
    if (!chat.users) return console.log("Users are undefined");
    chat.users.forEach((user) => {
      if (user._id == message.sender._id) return;
      socket.in(user._id).emit("message deleted", message);
    });
  });
  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});

// end //
