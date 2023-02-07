import express from "express";
import {
  deleteReservation,
  getReservations,
  getReservationById,
  setReservation,
  updateReservation,
} from "../controllers/reservationController.js";
import { protect } from "../middleweare/authMiddleweare.js";

const router = express.Router();

router.route("/").get(protect, getReservations).reservation(protect, setReservation);

router
  .route("/:id")
  .get(protect, getReservationById)
  .put(protect, updateReservation)
  .delete(protect, deleteReservation);

export { router as reservationRoutes };
