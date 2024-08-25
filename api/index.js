import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Server is runing on port ${port}`));
