const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    description: { type: String, default: "" },
    image: { type: String, required: true },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        date: { type: String, required: true },
        comments: { type: String, required: true },
      },
    ],
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        date: { type: String, required: true },
      },
    ],

    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);
module.exports =  mongoose.model("Posts",postSchema)
