import asyncHandler from "express-async-handler";
import Reservation from "../model/reservationModel.js";

//@desc    Get reservations
//@route   GET /reservations
//@access  Private
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find();
  res.status(200).send(reservations);
});

//@desc    Set reservation
//@route   POST /reservations
//@access  Private
const setReservation = asyncHandler(async (req, res) => {
  const {
    ownerUser,
    guetUser,
    startDate,
    endDate,
    numberOfNights,
    totalPrice,
    guets,
  } = req.body.reservation;

  // if (!header || !price || !location) {
  //   res.status(400);
  //   throw new Error("Reservation header, price and location are required");
  // }
  const reservation = await Reservation.create({
    guetUser: req.user.id,
    ownerUser,
    startDate,
    endDate,
    numberOfNights,
    totalPrice,
    guets,
  });
  res.status(200).json(reservation);
});

//@desc    Get reservation by id
//@route   PUT /reservations/:id
//@access  Private
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(400);
    throw new Error("Reservation not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the reservation user
  if (reservation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(reservation);
});

//@desc    Update reservation
//@route   PUT /reservations/:id
//@access  Private
const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(400);
    throw new Error("Reservation not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the reservation user
  if (reservation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedReservation);
});

//@desc    Delete reservation
//@route   DELETE /reservations/:id
//@access  Private
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(400);
    throw new Error("Reservation not found");
  }
  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the loggedin user matches the reservation user
  if (reservation.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await reservation.remove();
  res.status(200).json({ id: req.params.id });
});

export {
  getReservations,
  setReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
