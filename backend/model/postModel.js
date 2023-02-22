import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    header: {
      type: String,
      required: [true, "Please add header"],
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    location: {
      type: String,
      required: [true, "Please add location"],
    },
    description: {
      type: String,
    },
    imagesGallery: {
      type: [String],
    },
    disabledDates: {
      type: [String],
    },
    disabledRanges: {
      type: [{ startDate: { type: String }, endDate: { type: String } }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
