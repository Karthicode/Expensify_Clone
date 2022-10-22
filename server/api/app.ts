import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

/* Creating an Express application using express() function 
which is a top-level function exported by the express module. */
const app = express();

/* using mongoose's default method to connect to the database */
mongoose.connect("mongodb://localhost:27017/expensify");

/* Setting up Express middlewares that 
execute during the lifecycle of a request to the Express server. */
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true, origin: "http://localhost:9000" }));
// {credentials: true, origin: 'http://localhost:3001'}

//check for all available routes and redirect to the relavant route.
routes(app);

//exporting the app variable which holds the express() function
export default app;
