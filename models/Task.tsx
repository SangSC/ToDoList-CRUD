import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    // id: {
    //   type: Number,
    //   required: true,
    // },
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    is_completed: {
      type: Boolean,
      required: true,
    },
    // created_at: {
    //   type: String,
    //   required: true,
    // },
    // updated_at: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose?.models?.Task || mongoose.model("Task", TaskSchema);
