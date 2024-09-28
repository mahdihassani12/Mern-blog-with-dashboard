import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';
import fileUpload from "express-fileupload";

dotenv.config();
connectDB();

const port = process.env.PORT || 4050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// initialize the routes
import users from "./routes/users.js";
import tags from "./routes/tags.js";
import categories from "./routes/categories.js";
import posts from "./routes/posts.js"

app.use("/api/users", users);
app.use("/api/tags", tags);
app.use("/api/categories", categories);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
