import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db.js";
connectDB();

const port = process.env.PORT || 4050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize the routes
import users from "./routes/users.js";
app.use("/api/users", users);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
