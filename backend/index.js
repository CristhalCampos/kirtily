import express, { json } from "express"; // import express
import mongoose, { connect } from "mongoose"; // import mongoose
import routerUsers from "./routes/users.routes.js"; // import users routes
import routerAdminUsers from "./routes/admin_users.routes.js"; // import admin users routes
const app = express(); // create the server using express
const port = 3001; // create a port
app.use(json()); // middleware to parse json

// use mongoose to connect to mongoDB
connectDB().catch(err => console.log(err));
async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/kirtily");
}

// routes
app.use("/users", routerUsers); // use users routes
app.use("/admin/users", routerAdminUsers); // use admin users routes

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});