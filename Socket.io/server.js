import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log("MIDDLEWARE: Token received ->", token);

  if (token === "study123") {
    console.log("MIDDLEWARE: User authorized");
    next();
  } else {
    console.log("MIDDLEWARE: User blocked");
    next(new Error("Unauthorized"));
  }
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

io.on("connection", (socket) => {
  console.log("\n=== NEW CONNECTION ===");
  console.log("SOCKET ID:", socket.id);

  socket.join("study-room");                          // Join room
  console.log("ROOM JOINED: study-room by", socket.id);

  socket.emit("system", "Welcome to study room");    // Private msg
  console.log("PRIVATE EMIT: Welcome sent to", socket.id);

  socket.broadcast.to("study-room").emit("system","A new user joined the room");   // Broadcast 
  console.log("BROADCAST: Notified others about new user");

  socket.on("chat", (msg) => {
    console.log("CHAT RECEIVED from", socket.id, "->", msg);
    io.to("study-room").emit("chat", msg);
    console.log("CHAT BROADCAST to room");
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECT:", socket.id);
    io.to("study-room").emit("system", "A user left the room");
    console.log("BROADCAST: User left message sent");
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

