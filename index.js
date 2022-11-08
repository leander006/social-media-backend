const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const chatRoute = require("./routes/chatRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");

const cors = require("cors");
const cookieSession = require("cookie-session");

const cookieParser = require("cookie-parser");
const app = express();

const passport = require("passport");

dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());
app.use(
  cookieSession({ name: "session", keys: ["leander"], maxAge: 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/message", messageRoute);

app.use("/api/post", postRoute);

app.use("/api/comment", commentRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

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
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // console.log("Connect to socket",socket.id);

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
