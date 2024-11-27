import { config } from "dotenv"; // import dotenv
config({ path: "./config/.env" }); // config dotenv
import express, { json } from "express"; // import express
import mongoose from "mongoose"; // import mongoose
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors"; // import cors
import routerUsers from "./routes/users.routes.js";
import routerPublications from "./routes/publications.routes.js";
import routerComments from "./routes/comments.routes.js";
import routerSearch from "./routes/search.routes.js";
import routerAdmin from "./routes/admin.routes.js";
import routerAdminUsers from "./routes/admin_users.routes.js";
import routerAdminPublications from "./routes/admin_publications.routes.js";
import routerAdminComments from "./routes/admin_comments.routes.js";
import routerAdminTransactions from "./routes/admin_transactions.routes.js";
const app = express(); // create the server using express
const port = process.env.PORT; // create a port
app.use(json()); // middleware to parse json
//const server = createServer(app);
//const io = Server(server);

// use mongoose to connect to mongoDB
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect(process.env.DATABASE);
}

//io.on("connection", (socket) => {
//  console.log("a user has connected!");
//  socket.on("disconnect", () => {
//    console.log("a user has disconnected!");
//  })
//});

// Cors
//corsOptions = {
//  origin: ["http://localhost:3000"],
//  methods: ["GET", "POST", "PATCH", "DELETE"],
//  optionsSucessStatus: 200
//}
//app.use(cors(corsOptions));

// routes
app.use("/users", routerUsers);
app.use("/publications", routerPublications);
app.use("/publicaions/comments", routerComments);
app.use("/search", routerSearch);
app.use("/admin", routerAdmin);
app.use("/admin/users", routerAdminUsers);
app.use("/admin/publications", routerAdminPublications);
app.use("/admin/comments", routerAdminComments);
app.use("/admin/transacciones", routerAdminTransactions);

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//server.listen(port, () => {
//  console.log(`Server running on http://localhost:${port}`);
//});