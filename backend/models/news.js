import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  source: {
    id: String,
    name: String
  },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("News", newsSchema);
