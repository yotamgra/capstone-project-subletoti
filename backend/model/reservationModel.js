import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    ownerUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    guetUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    numberOfNights: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    guets: {
      type: {
        adults: { type: Number },
        children: { type: Number },
        infants: { type: Number },
        pets: { type: Number },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
