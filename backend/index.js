import { config } from "dotenv"; // import dotenv
config({ path: "./config/.env" }); // config dotenv
import express, { json } from "express"; // import express
import mongoose from "mongoose"; // import mongoose
import cors from "cors"; // import cors
import routerUsers from "./routes/users.routes.js"; // import users routes
import routerAdminUsers from "./routes/admin_users.routes.js"; // import admin users routes
const app = express(); // create the server using express
const port = process.env.PORT; // create a port
app.use(json()); // middleware to parse json

// use mongoose to connect to mongoDB
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect(process.env.DATABASE);
}

// Cors
corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  optionsSucessStatus: 200
}
app.use(cors(corsOptions));

// routes
app.use("/users", routerUsers); // use users routes
app.use("/admin/users", routerAdminUsers); // use admin users routes

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});