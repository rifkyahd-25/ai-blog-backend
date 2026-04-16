import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Tech", "Jobs", "Learning"], default: "Tech" },
    link: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
