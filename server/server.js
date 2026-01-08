import cors from "cors";
import express from "express";
import { NODE_ENV, PORT } from "./config/env.js";
import connectToDatabase from "./database/monodb.js";
import cookieParser from "cookie-parser";
import Bookings from "./models/bookings.model.js";
import bookingRouter from "./routes/bookings.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";



const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bookings", bookingRouter);

app.use(errorMiddleware)


let bookings = [];



app.listen(PORT, async() => {
    console.log(`Server is Listening on http://localhost:${PORT}`);
    await connectToDatabase();
});