import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./Routes/products.routes.js";
import jwt from "jsonwebtoken";

// creating a new server
const app = new express();

// To allow the browser to fetch from different ports
app.use(cors());

// to parse the responses
app.use(express.json());

// to start the server
app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
})

// connecting to the database
mongoose.connect("mongodb://localhost:27017/ShoppyGlobe",{

});


// to use the connection
const db = mongoose.connection;


// Checking if the connection is successful or not
db.on("open", ()=>{
    console.log("connection successful");
});

db.on("error", ()=>{
    console.log("Connection failed");
});


// calling the routes function
routes(app);
