import { config } from "dotenv"; // import dotenv
config({ path: "./config/.env" }); // config dotenv
import express, { json } from "express"; // import express
import mongoose from "mongoose"; // import mongoose
import cookieParser from "cookie-parser"; // Import cookie-parser
import { Server } from "socket.io"; // Import socket.io
import { initializeSocket } from "./socket/socket.js"; // Import socket
import { createServer } from "node:http"; // Import Node.js http server
import cors from "cors"; // import cors

// Import routes
import routerUsers from "./routes/users.routes.js";
import routerPublications from "./routes/publications.routes.js";
import routerComments from "./routes/comments.routes.js";
import routerSearch from "./routes/search.routes.js";
import routerNotifications from "./routes/notifications.routes.js";
import routerFeed from "./routes/feed.routes.js";
import routerAdmin from "./routes/admin.routes.js";
import routerAdminReports from "./routes/admin_reports.routes.js";
import routerAdminUsers from "./routes/admin_users.routes.js";
import routerAdminPublications from "./routes/admin_publications.routes.js";
import routerAdminComments from "./routes/admin_comments.routes.js";
import routerAdminTransactions from "./routes/admin_transactions.routes.js";
import routerMessages from "./routes/messages.routes.js";

const app = express(); // create the express app
const port = process.env.PORT; // create a port

app.use(json()); // middleware to parse json
app.use(cookieParser()); // middleware to parse cookies
app.use(
  cors({
    origin: [`http://localhost:${process.env.PORT_FRONT}`],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
); // middleware to enable CORS

// Create HTTP and Socket.io servers
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${process.env.PORT_FRONT}`],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

// MongoDB Connection
connectDB().catch((err) => console.log("Error connecting to MongoDB:", err));
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// routes
app.use("/", routerUsers);
app.use("/publications", routerPublications);
app.use("/publications/comments", routerComments);
app.use("/search", routerSearch);
app.use("/notifications", routerNotifications);
app.use("/feed", routerFeed);
app.use("/admin", routerAdmin);
app.use("/admin/reports", routerAdminReports);
app.use("/admin/users", routerAdminUsers);
app.use("/admin/publications", routerAdminPublications);
app.use("/admin/comments", routerAdminComments);
app.use("/admin/transacciones", routerAdminTransactions);
app.use("/messages", routerMessages);

// Initialize Socket.io
initializeSocket(io);

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});