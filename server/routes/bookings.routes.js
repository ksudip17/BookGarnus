import { Router } from "express";
import { createBooking, deleteBookingById, getAllBookings, getBookingById, updateBookingById } from "../controllers/bookings.controllers.js";

const bookingRouter = Router();

bookingRouter.post("/", createBooking);

bookingRouter.get("/", getAllBookings);

bookingRouter.get("/:id", getBookingById);

bookingRouter.put("/:id/edit", updateBookingById);

bookingRouter.delete("/:id", deleteBookingById);

export default bookingRouter;