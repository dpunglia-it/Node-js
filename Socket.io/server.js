import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";

const app = express();
const server = createServer(app);
const io = new Server(server);

const redis = createClient();
await redis.connect();
console.log("Redis connected");

// await redis.del("study-room:messages");
 
// Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log("Middleware : Token received ->", token);

  if (token === "study123") {
    console.log("Middleware : User authorized");
    next();
  } else {
    console.log("Middleware : User blocked");
    next(new Error("Unauthorized"));
  }
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

io.on("connection", async (socket) => {
  console.log("--NEW CONNECTION");
  console.log("Socket ID:", socket.id);

  socket.join("study-room");                          // Join room
  console.log("Room Joined: study-room by", socket.id);

  // saving old msg
  const oldMessages = await redis.lRange("study-room:messages", 0, -1);
  // Send history only to this new user
  oldMessages.forEach(msg => { socket.emit("chat", msg)});


  socket.emit("system", "Welcome to study room");    // Private msg
  console.log("Private emit : Welcome sent to", socket.id);

  socket.broadcast.to("study-room").emit("system","A new user joined the room");   // Broadcast 
  console.log("Broadcast : Notified others about new user");

  socket.on("chat", async  (msg) => {
    console.log("Chat recieved from", socket.id, "->", msg);

    // saving new msg
     await redis.rPush("study-room:messages", msg);
     // Keep only last 50 messages
     await redis.lTrim("study-room:messages", -50, -1);

     await redis.expire("study-room:messages", 30);

    io.to("study-room").emit("chat", msg);
    console.log("Chat broadcast to room");
  });

  socket.on("disconnect", () => {
    console.log("Disconnect :", socket.id);
    io.to("study-room").emit("system", "A user left the room");
    console.log("Broadcast : User left message sent");
  });
});

const admin = io.of("/admin");

admin.on("connection", (socket) => {
  console.log("--ADMIN CONNECTED:", socket.id);
  socket.on("admin-chat", async (msg) => {
     const adminMsg = "[ADMIN] " + msg;

    // Saving admin msg
    await redis.rPush("study-room:messages", adminMsg);
    // Keep only last 50 messages
    await redis.lTrim("study-room:messages", -50, -1);
    await redis.expire("study-room:messages", 30);
    io.to("study-room").emit("chat", "[ADMIN] " + msg);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

