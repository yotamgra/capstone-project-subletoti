import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Please add header"],
    },
    price: {
      type: String,
      required: [true, "Please add price"],
    },
    location: {
      type: String,
      required: [true, "Please add location"],
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
