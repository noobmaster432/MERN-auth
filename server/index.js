import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// POST /api/users -Register a user 
// POST /api/users/auth -Authenticate a user and get token
// POST /api/users/logout -Logout user and clear cookie
// GET /api/users/profile -get user profile
// PUT /api/users/profile -update profile