import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 4050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

// initialize the routes
import users from "./routes/users.js";
app.use("/api/users", users);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
