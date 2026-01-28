import mongoose from "mongoose"

const { Schema } = mongoose

const feedbackSchema = new Schema(
  {
    visitiorId: { type: Schema.Types.ObjectId, ref: "Visitor", required: true },
    name: { type: String, required: true },
    email: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true },
)
export default mongoose.model("Feedback", feedbackSchema)
