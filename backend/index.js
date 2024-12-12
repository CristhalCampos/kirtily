import { config } from "dotenv"; // import dotenv
config({ path: "./config/.env" }); // config dotenv
import express, { json } from "express"; // import express
import mongoose from "mongoose"; // import mongoose
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors"; // import cors
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
import { initializeSocket } from "./socket/socket.js";
const app = express(); // create the server using express
const port = process.env.PORT; // create a port
app.use(json()); // middleware to parse json
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000, http://localhost:5173/"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000, http://localhost:5173/"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

// use mongoose to connect to mongoDB
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect(process.env.DATABASE);
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

// start the server
initializeSocket(io);
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});