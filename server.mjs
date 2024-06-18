import http from 'http';
import express from 'express';
import { dirname } from 'path';
import path from 'path';
import { Server } from 'socket.io';

// Calculate the directory name using the current file's path
const directory_name = dirname("F:/full stack prod/Chat app/server.mjs")
console.log(directory_name)

// Create an instance of the Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);



// Use 'path.join' to get an absolute path to the 'public' directory
const static_serve = path.join(directory_name, "/public");
console.log(static_serve)

// Serve static files (like CSS, images, etc.) from the 'public' directory
app.use(express.static(static_serve))

// Set up a route to serve 'index.html' when a user accesses the root URL '/'
app.get("/", (req, res) => {
    res.sendFile(path.join(directory_name, 'index.html'));
});

// Create a WebSocket server using the HTTP server
const io = new Server(server);

// Define behavior when a client connects to the WebSocket server
io.on("connection", (socket) => {
    // Listen for 'message' events from clients and broadcast them to all other clients
    socket.on('connection', (msg) => {
        socket.broadcast.emit('connection', msg);
        console.log(msg);
    });
    console.log("Connected....");
});

// Start the server and listen for incoming requests on port 3000
const PORT = 8000;
// const HOST = "192.168.29.223";

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
