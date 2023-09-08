const express = require("express");
const mongoose = require("mongoose");

const chatRoute = require("./routes/chatRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const googleRoute = require("./routes/google-auth");
const notifcationRoute = require("./routes/notificationRoute");
const likeRoute = require("./routes/likeRoute");
const { passportAuth } = require("./config/jwt");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { MONGO_URI, PORT, SESSION } = require("./config/serverConfig");
const session = require("express-session");

// const cookieParser = require("cookie-parser");
const app = express();
const httpServer = createServer(app);
const passport = require("passport");
const onlineUsers = new Set();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    origin: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportAuth(passport);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authRoute);
app.use("/api/auth/google", googleRoute);
app.use("/api/user", userRoute);
app.use("/api/like", likeRoute);
app.use("/api/chat", chatRoute);
app.use("/api/notification", notifcationRoute);
app.use("/api/message", messageRoute);

app.use("/api/post", postRoute);

app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to server of Talkology");
});

httpServer.listen(PORT, async () => {
  console.log(`Backend runnig on port ${PORT}`);
});
//Socket //

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  onlineUsers.add(socket.id);

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

  socket.on("send_message", (messageRecieved) => {
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

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    onlineUsers.delete(socket.id);
  });
});

// end //
